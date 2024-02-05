import React from 'react';
import { EventInfo } from '../utilities/EventInfoInterface';

interface EventRendererProps {
    event: EventInfo;
    onClick: (event: EventInfo) => void;
}

const EventRendererComponent: React.FC<EventRendererProps> = ({ event, onClick }) => {
    return (
        <div style={{ border: '1px solid black', margin: '10px', padding: '10px' }} onClick={() => onClick(event)} >
            <h2>{event.activity}</h2>
            <p>{event.description}</p>
        </div>
    );
};

export default EventRendererComponent;
