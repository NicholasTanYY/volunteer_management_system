import React, { useState } from 'react';
import UserNavigationbar from '../../components/UserNavigationBarComponent';
import CalendarComponent from '../../components/CalendarComponent';
import BlogComponent from '../../components/BlogComponent';

const UserHomePage: React.FC = () => {

  return (
    <div>
      <UserNavigationbar />
      <h1>Hello Abby!</h1>
      <p>This is the main content area for the user's home page.</p>
      <h3>My Events</h3>
      <CalendarComponent />
      <BlogComponent />
      <h3>Notifications</h3>
    </div>
  );
};

export default UserHomePage;
