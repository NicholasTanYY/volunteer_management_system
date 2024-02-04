import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

// Placeholder component for demonstration
const AboutPage: React.FC = () => (
  <div>
    <h2>About Page</h2>
    <p>This is a placeholder for the About page.</p>
  </div>
);

const UserHomePage: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            {/* Add more navigation links here */}
          </ul>
        </nav>

        {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/" element={<HomePageContent />} />
          <Route path="/about" element={<AboutPage />} />
          {/* Define more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

const HomePageContent: React.FC = () => (
  <div>
    <h1>Welcome to the User Home Page!</h1>
    <p>This is the main content area for the user's home page.</p>
  </div>
);

export default UserHomePage;
