import React from 'react';
import { NotificationInfo } from '../utilities/NotificationInfoInterface';

interface NotificationRendererProps {
    notification: NotificationInfo;
}

const NotificationRendererComponent: React.FC<NotificationRendererProps> = ({ notification: event }) => {
    return (
        <div style={{ border: '1px solid black', margin: '10px', padding: '10px' }} >
            <h2>{event.title}</h2>
            <p>{event.description}</p>
        </div>
    );
};

export default NotificationRendererComponent;
