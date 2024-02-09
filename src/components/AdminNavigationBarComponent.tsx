import React from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import bigAtHeartLogo from '../images/bigAtHeartLogo.jpeg';
import pfpLogo from '../images/pfp.jpeg';

const AdminNavigationbar: React.FC = () => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/adminHome">
        <img src={bigAtHeartLogo} alt="Image" style={{ width: 50, height: 40 }} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/adminHome">Home</Nav.Link>
          <Nav.Link as={Link} to="/adminEvents">Events</Nav.Link>
          <Nav.Link as={Link} to="/adminReports">Reports</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Nav className="ms-auto">
        <Dropdown>
          <Dropdown.Toggle as={Nav.Link}>
            <img src={pfpLogo} alt="Image" style={{ width: 30, height: 30 }} />
          </Dropdown.Toggle>

            <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </Navbar>
  );
};

export default AdminNavigationbar;
