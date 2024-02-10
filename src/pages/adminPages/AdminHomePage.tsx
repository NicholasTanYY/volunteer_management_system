import React, { useEffect, useState } from 'react';
import AdminNavigationbar from '../../components/AdminNavigationBarComponent';
import GenCertsComponent from '../../components/certificateComponents/GenCertsComponent';
import { useAppSelector } from '../../redux/hooks';
import AdminCalendarComponent from '../../components/AdminCalendarComponent';
import AdminNotificationComponent from '../../components/AdminNotificationComponent';

const AdminHomePage: React.FC = () => {
  const username = useAppSelector(state => state.username.value);
  return (
    <div style={{background:"radial-gradient(#ffd8c5, #ffffff)"}}>
      <AdminNavigationbar />
      <h2 style={{ color: '#af2918' }}>Hello {username}!</h2>
      <div className="d-flex justify-content-evenly">
          <AdminCalendarComponent />
          <AdminNotificationComponent />
          <GenCertsComponent />
      </div>
    </div>
  );
};

export default AdminHomePage;
