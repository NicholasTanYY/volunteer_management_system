import React, { useState, useEffect } from 'react';
import UserNavigationbar from '../../components/UserNavigationBarComponent';
import CalendarComponent from '../../components/CalendarComponent';
import BlogComponent from '../../components/BlogComponent';
import NotificationComponent from '../../components/NotificationComponent';
import { useAppSelector } from '../../redux/hooks';
import axios from 'axios';

const UserHomePage: React.FC = () => {
  const username = useAppSelector(state => state.username.value);

  return (
    <div>
      <UserNavigationbar />
      <h1>Hello {username}!</h1>
      <h3>My Events</h3>
      <div className="d-flex justify-content-evenly">
        <div>
          <div className="shadow rounded p-2">
            <CalendarComponent />
          </div>
          <BlogComponent />
        </div>
        <NotificationComponent />
      </div>
    </div>
  );
};

export default UserHomePage;
