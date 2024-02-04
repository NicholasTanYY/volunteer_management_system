import React from 'react';
import UserNavigationbar from '../../components/UserNavigationBar';
import AdminNavigationbar from '../../components/AdminNavigationBar';

const AdminHomePage: React.FC = () => {
  return (
    <div>
      <AdminNavigationbar/>
      <h1>Dashboard</h1>
    </div>
  );
};

export default AdminHomePage;
