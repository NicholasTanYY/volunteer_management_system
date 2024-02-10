import React, { useState, useEffect } from 'react';
import UserNavigationbar from '../../components/UserNavigationBarComponent';
import CalendarComponent from '../../components/CalendarComponent';
import BlogComponent from '../../components/BlogComponent';
import NotificationComponent from '../../components/NotificationComponent';
import { useAppSelector } from '../../redux/hooks';

const UserHomePage: React.FC = () => {
  const username = useAppSelector(state => state.username.value);

  return (
    <div style={{background:"radial-gradient(#ffd8c5, #ffffff)"}}>
      <UserNavigationbar />
      <h2 style={{ color: '#af2918' }}>Hello {username}!</h2>
      <div className="d-flex justify-content-evenly">
        <div className="w-50 d-flex flex-column align-items-center">
          <CalendarComponent />
          <BlogComponent />
        </div>
        <div className="w-50 d-flex justify-content-center align-items-start">
          <NotificationComponent />
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;
