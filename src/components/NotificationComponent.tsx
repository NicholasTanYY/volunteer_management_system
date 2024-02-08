
import React, { useEffect, useState } from 'react';
import UserNavigationbar from '../components/UserNavigationBarComponent';
import sampleNotification from '../utilities/samples/SampleNotifications.json'
import NotificationRendererComponent from './NotificationRendererComponent';
import { NotificationInfo } from '../utilities/NotificationInfoInterface';

const NotificationComponent: React.FC = () => {
    const [notifications, setNotifications] = useState<NotificationInfo[]>([]);

    useEffect(() => {
        setNotifications(sampleNotification.notificationsList);
    }, []);

    return (
        <div>
            <h2>Notifications</h2>
            {notifications.map(event => (
                <NotificationRendererComponent notification={event} />
            ))}
        </div>
    );
};

export default NotificationComponent;
