import React from 'react';
import { EventInfo } from '../utilities/EventInfoInterface';
import { Button } from 'react-bootstrap';
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
        <div className="shadow rounded m-4 w-25 h-25 p-2">
            {event.category.map((category:any, index:any) => (
                <span className="badge bg-dark mx-2" key={index}>{category}</span>
            ))}
            <h3>{event.name}</h3>
            <p>{event.date}</p>
            <p>{event.startTime} - {event.endTime}</p>
            <p>{event.description}</p>
            <div className="d-flex justify-content-end">
                <Button onClick={handleSignupEvent}>Sign up</Button>
            </div>
        </div>
    );
};

export default UserEventRendererComponent;
