import React from 'react';
import { EventInfo } from '../utilities/EventInfoInterface';
import { Button } from 'react-bootstrap';
import login from '../images/loginImage.jpeg';
import axios from 'axios';
import { useAppSelector } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';

interface UserEventRendererProps {
    event: EventInfo;
}

const UserEventRendererComponent: React.FC<UserEventRendererProps> = ({ event }) => {
    const navigate = useNavigate();
    const username = useAppSelector(state => state.username.value);

    const handleSignupEvent = async() => {
        const response = await axios.post(`${process.env.REACT_APP_REQUEST_LINK}/user/signupEvent`, {username: username, eventName: event.name});
        if (response.data.message !== "Successfully signed up for event :>") {
            console.log(response.data);
            return;
        }
        navigate('/userHome');
    }

    return (
        <div className="card rounded-3 bg-light" style={{ width: '600px', height: '300px' }}>
            <div className="row g-0 overflow-auto ">
                <div className="col-md-4 position-relative">
                    <span className="badge bg-danger position-absolute top-0 start-0">{event.date}</span>
                    <img src={login} alt="Event" className="img-fluid rounded-start" style={{ objectFit: 'cover', height: '100%' }} />
                </div>
                <div className="overflow-auto col-md-8 d-flex flex-column justify-content-between">
                    <div className="p-3">
                        {event.category.map((category: any, index: any) => (
                            <span className="badge bg-light text-dark me-2 mb-2" key={index}>{category}</span>
                        ))}
                        <h5 className="card-title">{event.name}</h5>
                        <p className="card-text">@ {event.location}</p>
                        <p className="card-text">{event.startTime} - {event.endTime}</p>
                        <p className="card-text">{event.description}</p>
                    </div>
                    <div className="p-3">
                        <button className="btn btn-outline-dark" onClick={handleSignupEvent}>Sign up</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserEventRendererComponent;
