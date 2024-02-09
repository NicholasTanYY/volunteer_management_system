import React from 'react';
import AdminNavigationbar from '../../components/AdminNavigationBarComponent';
import CalendarComponent from '../../components/CalendarComponent';
import NotificationComponent from '../../components/NotificationComponent';
import GenCertsComponent from '../../components/GenCertsComponent';

const AdminHomePage: React.FC = () => {
  return (
    <div>
      <AdminNavigationbar />
      <h1>Hello Admin!</h1>
      <h3>My Events</h3>
      <div className="d-flex justify-content-evenly">
        <div>
          <div className="shadow rounded p-2">
            <CalendarComponent />
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
