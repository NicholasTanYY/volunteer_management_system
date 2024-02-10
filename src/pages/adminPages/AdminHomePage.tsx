import React, { useEffect, useState } from 'react';
import AdminNavigationbar from '../../components/AdminNavigationBarComponent';
// requestCerts
import NotificationComponent from '../../components/NotificationComponent';
import GenCertsComponent from '../../components/GenCertsComponent';
//=======
import { useAppSelector } from '../../redux/hooks';
import AdminCalendarComponent from '../../components/AdminCalendarComponent';
// main

const AdminHomePage: React.FC = () => {
  const username = useAppSelector(state => state.username.value);
  return (
    <div>
      <AdminNavigationbar />
      <h1>Hello Admin!</h1>
      <h3>My Events</h3>
      <div className="d-flex justify-content-evenly">
        <div>
          <div className="shadow rounded p-2">
            <AdminCalendarComponent />
          </div>
        </div>
        <div className="d-flex justify-content-evenly">
          <div className="shadow rounded p-2">
            <NotificationComponent />
          </div>
          <div className="shadow rounded p-2">
            <GenCertsComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
