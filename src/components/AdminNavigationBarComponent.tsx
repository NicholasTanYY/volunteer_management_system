import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminNavigationbar: React.FC = () => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/adminHome">
        VOLUNASIA admin
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/adminHome">Home</Nav.Link>
          <Nav.Link as={Link} to="/adminEvents">New event</Nav.Link>
          <Nav.Link as={Link} to="/adminReports">Reports</Nav.Link>
          <Nav.Link as={Link} to="/">Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AdminNavigationbar;
