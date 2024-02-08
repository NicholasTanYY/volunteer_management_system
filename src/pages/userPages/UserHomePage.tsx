import React, { useState } from 'react';
import UserNavigationbar from '../../components/UserNavigationBarComponent';
import CalendarComponent from '../../components/CalendarComponent';

const UserHomePage: React.FC = () => {

  return (
    <div>
      <UserNavigationbar />
      <h1>Hello Abby!</h1>
      <p>This is the main content area for the user's home page.</p>
      <CalendarComponent />
    </div>
  );
};

export default UserHomePage;
