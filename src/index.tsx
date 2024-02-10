import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import StartScreen from './pages/StartScreen';
import UserHomePage from './pages/userPages/UserHomePage';
import UserProfilePage from './pages/userPages/UserProfilePage';
import UserEventsPage from './pages/userPages/UserEventsPage';
import AdminHomePage from './pages/adminPages/AdminHomePage';
import AdminEventsPage from './pages/adminPages/AdminEventsPage';
import AdminReportsPage from './pages/adminPages/AdminReportsPage';
import UserLoginPage from './pages/userPages/UserLoginPage';
import AdminLoginPage from './pages/adminPages/AdminLoginPage';
import UserRegisterPage from './pages/userPages/UserRegisterPage';
import UserBlogsPage from './pages/userPages/UserBlogsPage';
import UserRecordsPage from './pages/userPages/UserRecordsPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<StartScreen />} />
          <Route path="/userLogin" element={<UserLoginPage />} />
          <Route path="/userRegister" element={<UserRegisterPage />} />
          <Route path="/userHome" element={<UserHomePage />} />
          <Route path="/userProfile" element={<UserProfilePage />} />
          <Route path="/userBlogs" element={<UserBlogsPage />} />
          <Route path="/userEvents" element={<UserEventsPage />} />
          <Route path="/userRecords" element={<UserRecordsPage />} />
          <Route path="/adminLogin" element={<AdminLoginPage />} />
          <Route path="/adminHome" element={<AdminHomePage />} />
          <Route path="/adminEvents" element={<AdminEventsPage />} />
          <Route path="/adminReports" element={<AdminReportsPage />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
