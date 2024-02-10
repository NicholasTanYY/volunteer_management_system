import React from 'react';
import { EventInfo } from '../utilities/EventInfoInterface';
import login from '../images/loginImage.jpeg';
import '../styles/EventCard.css';

interface EventRendererProps {
    event: EventInfo;
    onClick: (event: EventInfo) => void;
}

const EventRendererComponent: React.FC<EventRendererProps> = ({ event, onClick }) => {
    return (
        <div className='event-card'>
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
                    <button className="btn btn-outline-dark btn-lg take-attendance-btn" onClick={() => onClick(event)}>Take Attendance</button>
                </div>
            </div>
        </div>
    );
};


export default EventRendererComponent;
