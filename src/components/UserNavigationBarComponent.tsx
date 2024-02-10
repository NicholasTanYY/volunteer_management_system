import React from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import bigAtHeartLogo from '../images/bigAtHeartLogo.jpeg';
import pfpLogo from '../images/pfp.jpeg';

const UserNavigationbar: React.FC = () => {
  return (
    <Navbar expand="lg" bg="light" variant="dark" className="border-bottom">
      <Navbar.Brand as={Link} to="/userHome">
        <img src={bigAtHeartLogo} alt="Image" style={{ width: 50, height: 40 }} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link className="text-dark" as={Link} to="/userHome">Home</Nav.Link>
          <Nav.Link className="text-dark" as={Link} to="/userEvents">Events</Nav.Link>
          <Nav.Link className="text-dark" as={Link} to="/userBlogs">Blogs</Nav.Link>
          <Nav.Link className="text-dark" as={Link} to="/userContactUs">Contact Us</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Nav className="ms-auto">
        <Dropdown>
          <Dropdown.Toggle as={Nav.Link}>
            <img src={pfpLogo} alt="Image" style={{ width: 30, height: 30 }} />
          </Dropdown.Toggle>

            <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/userProfile">Profile</Dropdown.Item>
            <Dropdown.Item as={Link} to="/">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </Navbar>
  );
};

export default UserNavigationbar;
