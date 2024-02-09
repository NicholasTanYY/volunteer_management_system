import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import bigAtHeartLogo from '../images/bigAtHeartLogo.jpeg';
import pfpLogo from '../images/pfp.jpeg';

const UserNavigationbar: React.FC = () => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="flex-row flex-nowrap">
      <Navbar.Brand as={Link} to="/userHome">
        <img src={bigAtHeartLogo} alt="Image" style={{ width: 50, height: 40 }} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/userHome">Home</Nav.Link>
          <Nav.Link as={Link} to="/userEvents">Events</Nav.Link>
          <Nav.Link as={Link} to="/userBlogs">Blogs</Nav.Link>
          <Nav.Link as={Link} to="/userContactUs">Contact Us</Nav.Link>
          <Nav.Link as={Link} to="/userProfile">
            <img src={pfpLogo} alt="Image" style={{ width: 30, height: 30 }} />
          </Nav.Link>
          <Nav.Link as={Link} to="/">Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default UserNavigationbar;
