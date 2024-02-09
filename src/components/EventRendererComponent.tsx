import React from 'react';
import { EventInfo } from '../utilities/EventInfoInterface';

interface EventRendererProps {
    event: EventInfo;
    onClick: (event: EventInfo) => void;
}

const EventRendererComponent: React.FC<EventRendererProps> = ({ event, onClick }) => {
    return (
        <div className="shadow rounded m-4 w-25 h-25" onClick={() => onClick(event)} >
            <h3>{event.name}</h3>
            <h5>{event.date}</h5>
            <p>{event.startTime} - {event.endTime}</p>
            {event.category.map((category:any, index:any) => (
                <span className="badge bg-dark mx-2" key={index}>{category}</span>
            ))}
            <p>{event.description}</p>
        </div>
    );
};

export default EventRendererComponent;
