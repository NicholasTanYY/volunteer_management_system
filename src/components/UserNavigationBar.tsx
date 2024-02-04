import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserNavigationbar: React.FC = () => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/userHome">
        VOLUNASIA
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/userHome">Home</Nav.Link>
          <Nav.Link as={Link} to="/userProfile">Profile</Nav.Link>
          <Nav.Link as={Link} to="/userEvents">Events</Nav.Link>
          <Nav.Link as={Link} to="/userContactUs">Contact Us</Nav.Link>
          <Nav.Link as={Link} to="/">Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default UserNavigationbar;
