import React from 'react';
import UserNavigationbar from '../../components/UserNavigationBar';
import AdminNavigationbar from '../../components/AdminNavigationBar';

const AdminReportsPage: React.FC = () => {
  return (
    <div>
      <AdminNavigationbar/>
      <h1>Generate Report</h1>
    </div>
  );
};

export default AdminReportsPage;
