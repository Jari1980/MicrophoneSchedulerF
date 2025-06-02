import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <>
        <Navbar expand="sm" bg="dark" data-bs-theme="dark" sticky="top">
        <Navbar.Brand as={Link} to="/home" style={{marginLeft:"20px"}}>Microphone Scheduler</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto" style={{marginRight:"20px"}}>
              <Nav.Link as={Link} to="/item1" disabled>item1</Nav.Link>
              <Nav.Link as={Link} to="/item2" disabled>item2</Nav.Link>
              <Nav.Link as={Link} to="/item.." disabled>item..</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        </>
    );
};

export default NavBar;