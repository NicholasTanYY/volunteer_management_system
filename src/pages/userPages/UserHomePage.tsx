import React, { useState } from 'react';
import UserNavigationbar from '../../components/UserNavigationBarComponent';
import CalendarComponent from '../../components/CalendarComponent';
import BlogComponent from '../../components/BlogComponent';
import NotificationComponent from '../../components/NotificationComponent';

const UserHomePage: React.FC = () => {

  return (
    <div>
      <UserNavigationbar />
      <h1>Hello Abby!</h1>
      <h3>My Events</h3>
      <CalendarComponent />
      <BlogComponent />
      <NotificationComponent />
    </div>
  );
};

export default UserHomePage;
