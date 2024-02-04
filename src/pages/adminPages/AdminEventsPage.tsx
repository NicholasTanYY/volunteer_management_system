import React from 'react';
import UserNavigationbar from '../../components/UserNavigationBar';
import AdminNavigationbar from '../../components/AdminNavigationBar';

const AdminEventsPage: React.FC = () => {
  return (
    <div>
      <AdminNavigationbar/>
      <h1>Add new event</h1>
    </div>
  );
};

export default AdminEventsPage;
