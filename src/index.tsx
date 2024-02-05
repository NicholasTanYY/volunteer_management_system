import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartScreen from './pages/StartScreen';
import UserHomePage from './pages/userPages/UserHomePage';
import UserProfilePage from './pages/userPages/UserProfilePage';
import UserEventsPage from './pages/userPages/UserEventsPage';
import UserContactUsPage from './pages/userPages/UserContactUsPage';
import AdminHomePage from './pages/adminPages/AdminHomePage';
import AdminEventsPage from './pages/adminPages/AdminEventsPage';
import AdminReportsPage from './pages/adminPages/AdminReportsPage';
import UserLoginPage from './pages/userPages/UserLoginPage';
import AdminLoginPage from './pages/adminPages/AdminLoginPage';
import UserRegisterPage from './pages/userPages/UserRegisterPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
          <Route path="/" element={<StartScreen />} />
          <Route path="/userLogin" element={<UserLoginPage />} />
          <Route path="/userRegister" element={<UserRegisterPage />} />
          <Route path="/userHome" element={<UserHomePage />} />
          <Route path="/userProfile" element={<UserProfilePage />} />
          <Route path="/userEvents" element={<UserEventsPage />} />
          <Route path="/userContactUs" element={<UserContactUsPage />} />
          <Route path="/adminLogin" element={<AdminLoginPage />} />
          {/* <Route path="/adminRegister" element={<AdminRegisterPage />} /> */}
          <Route path="/adminHome" element={<AdminHomePage />} />
          <Route path="/adminEvents" element={<AdminEventsPage />} />
          <Route path="/adminReports" element={<AdminReportsPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
