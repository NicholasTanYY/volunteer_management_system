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
        <div className="vw-25 shadow rounded">
            <div>
                <img src={login} alt="Event" className="event-image" />
            </div>
            <div className="event-details">
                <div>
                    <div className="date-badge">
                        <span>{event.date}</span>
                    </div>
                    <div className="category-badges">
                        {event.category.map((category: any, index: any) => (
                            <span className="badge rounded-pill bg-light text-dark" key={index} style={{ margin: '2px' }}>{category}</span>
                        ))}
                    </div>
                    <h3 className="event-name">{event.name}</h3>
                    <p className="mb-2">@{event.location}</p>
                    <h5>{event.startTime} - {event.endTime}</h5>
                    <p>{event.description}</p>
                </div>
                <div>
                    <button className="btn btn-outline-dark btn-lg take-attendance-btn" onClick={handleSignupEvent}>Sign up</button>
                </div>
            </div>
        </div>
    );
};

export default UserEventRendererComponent;
