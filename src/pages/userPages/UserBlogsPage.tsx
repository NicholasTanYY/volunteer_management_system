import React, { useState, ChangeEvent, FormEvent } from 'react';
import UserNavigationbar from '../../components/UserNavigationBarComponent';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import AllEvents from '../../utilities/AllEvents';

const UserBlogsPage: React.FC = () => {

    const [blogInfo, setBlogInfo] = useState({
        id: 0,
        name: '',
        datePosted: '',
        timePosted: '',
        eventName: null,
        description: '',
    });

    const navigate = useNavigate();

    const handleBlogSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    
        // Get the current date and time
        const now = new Date();
        const datePosted = now.toLocaleDateString();
        const timePosted = now.toLocaleTimeString();
    
        // Create a new blog post
        const newBlogPost = {
            id: blogInfo.id, // Set the id to the current length of the blog list
            name: blogInfo.name,
            datePosted: datePosted,
            timePosted: timePosted,
            eventName: blogInfo.eventName,
            description: blogInfo.description
        };
    
        console.log(newBlogPost); // TODO: database logic here
    
        setBlogInfo({ id: blogInfo.id + 1, name: '', datePosted: '', timePosted: '', eventName: null, description: '' });

        alert('Blog submitted successfully!');
        navigate('/userHome');
    };

    const handleBlogChange = (event: ChangeEvent<HTMLInputElement>) => {
        setBlogInfo({ ...blogInfo, [event.target.name]: event.target.value });
    }

    const handleEventChange = (selectedOption: any) => {
        setBlogInfo({ ...blogInfo, eventName: selectedOption });
    }

    const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setBlogInfo({ ...blogInfo, description: event.target.value });
    }

    return (
        <div>
            <UserNavigationbar />
            <h1>Blogs</h1>
            <Container>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <form onSubmit={handleBlogSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <label>
                            <h5>Name:</h5>
                            <input type="text" className="form-control" name="name" value={blogInfo.name} onChange={handleBlogChange} />
                        </label>
                        <label>
                            <h5>Choose Event:</h5>
                            <Select
                                value={blogInfo.eventName}
                                onChange={handleEventChange}
                                options={AllEvents}
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
                        <button type="submit">Submit Blog</button>
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default UserBlogsPage;
