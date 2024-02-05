import React from 'react';
import UserNavigationbar from '../../components/UserNavigationBarComponent';

const UserHomePage: React.FC = () => {
  return (
    <div>
      <UserNavigationbar/>
      <h1>Dashboard</h1>
      <p>This is the main content area for the user's home page.</p>
    </div>
  );
};

export default UserHomePage;
