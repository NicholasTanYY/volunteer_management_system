import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import UserNavigationbar from '../../components/UserNavigationBarComponent';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useAppSelector } from '../../redux/hooks';
import axios from 'axios';
import { BlogInfo } from '../../utilities/BlogInfoInterface';
import BlogRendererComponent from '../../components/BlogRendererComponent';
import NavButton from '../../components/NavButtonComponent';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const UserBlogsPage: React.FC = () => {
    const username = useAppSelector(state => state.username.value);
    const [isDone, setIsDone] = useState(false);
    const [isDone2, setIsDone2] = useState(false);
    const [mappedEvents, setMappedEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState<{value: string, label: string}>({ value: '', label: '' });
    const [blogs, setBlogs] = useState<BlogInfo[]>([]);
    const [blogInfo, setBlogInfo] = useState({
        name: '',
        datePosted: '',
        timePosted: '',
        eventName: '',
        createdBy: username,
        description: '',
    });

    const getEvent = async () => {
        const response = await axios.post(`${process.env.REACT_APP_REQUEST_LINK}/user/getEvent`, {username:username});
        const response2 = await axios.get(`${process.env.REACT_APP_REQUEST_LINK}/user/getBlogs`);
        const events = response.data == null ? [] :response.data;
        setMappedEvents(events.map((event: string) => {
            return { value: event, label: event };
        }));
        setBlogs(response2.data);
        setIsDone(true);
    }
    useEffect(() => {
        getEvent();
    }, [])

    const navigate = useNavigate();

    const submitPostReq = async () => {
        const response = await axios.post(`${process.env.REACT_APP_REQUEST_LINK}/user/createBlogPost`, blogInfo);
        if (response.data.message != "Blog post created!") {
            console.log(response.data);
            return;
        }
        navigate('/userHome');
    }
    useEffect(() => {
        if (isDone2 == true ){
            submitPostReq();
        }
    }, [isDone2])
    const handleBlogSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const now = new Date();
        const datePosted = now.toLocaleDateString();
        const timePosted = now.toLocaleTimeString();
        const updatedBlogInfo = { ...blogInfo, datePosted: datePosted, timePosted: timePosted, createdBy: username, eventName: selectedEvent?.label };
        setBlogInfo(updatedBlogInfo);
        setIsDone2(true);
        // await submitPostReq();
    };

    const handleBlogChange = (event: ChangeEvent<HTMLInputElement>) => {
        setBlogInfo({ ...blogInfo, [event.target.name]: event.target.value });
    }

    const handleEventChange = (selectedOption: any) => {
        setSelectedEvent(selectedOption);
    }

    const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setBlogInfo({ ...blogInfo, description: event.target.value });
    }

    return (
        !isDone
            ? <div></div>
            :
        <div style={{background:"radial-gradient(#ffd8c5, #ffffff)"}}>
            <UserNavigationbar />
            <h2 style={{ color: '#af2918' }}>Blogs</h2>
            <div className="vh-100 d-flex justify-content-around">
                <div className="h-75 w-50 d-flex flex-column overflow-auto align-items-center">
                    {blogs.map((blog, idx) =>
                        <BlogRendererComponent key={idx} blog={blog} onClick={() => {}} />
                    )}
                </div>
                <form onSubmit={handleBlogSubmit} className="h-75 d-flex flex-column w-50 border bg-light rounded-3 p-4">
                    <label>
                        <h5>Name:</h5>
                        <input type="text" className="form-control" name="name" value={blogInfo.name} onChange={handleBlogChange} />
                    </label>
                    <label>
                        <h5>Choose Event:</h5>
                        <Select
                            value={selectedEvent}
                            onChange={handleEventChange}
                            options={mappedEvents}
                            isMulti={false} // Allow multiple selections
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                    </label>
                    <label>
                        <h5>Tell us about your experience!</h5>
                        <textarea
                            className="form-control"
                            name="description"
                            value={blogInfo.description}
                            onChange={handleDescriptionChange}
                            rows={7} // Set the initial size of the textarea
                        />
                    </label>
                    <button className="btn btn-dark" type="submit">Submit Blog</button>
                </form>
            </div>
        </div>
    );
};

export default UserBlogsPage;
