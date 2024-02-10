import React, { useEffect, useState } from 'react';
import AdminNavigationbar from '../../components/AdminNavigationBarComponent';
import GenCertsComponent from '../../components/certificateComponents/GenCertsComponent';
import { useAppSelector } from '../../redux/hooks';
import AdminCalendarComponent from '../../components/AdminCalendarComponent';
import AdminNotificationComponent from '../../components/AdminNotificationComponent';

const AdminHomePage: React.FC = () => {
  const username = useAppSelector(state => state.username.value);
  return (
    <div>
      <AdminNavigationbar />
      <h1>Hello {username}!</h1>
      <h3>My Events</h3>
      <div className="d-flex justify-content-evenly">
          <AdminCalendarComponent />
          <AdminNotificationComponent />
          <GenCertsComponent />
      </div>
    </div>
  );
};

export default AdminHomePage;
