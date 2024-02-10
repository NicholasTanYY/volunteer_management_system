import React from 'react';
import { EventInfo } from '../utilities/EventInfoInterface';

interface NotificationRendererProps {
    event: EventInfo;
}

const NotificationRendererComponent: React.FC<NotificationRendererProps> = ({ event }) => {
    return (
        <div className="border p-4 m-4 shadow rounded">
            <h5 className="mb-3">Reminder for {event.name}</h5>
            <p className="mb-2">@{event.location}</p>
            <p className="mb-2">Date: {event.date}</p>
            <p className="mb-2">Time: {event.startTime} - {event.endTime}</p>
            <p className="mb-0">{event.description}</p>
        </div>
    );

};

export default NotificationRendererComponent;
