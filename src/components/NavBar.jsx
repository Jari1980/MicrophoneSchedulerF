import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const [cookies, setCookie] = useCookies(["jwtToken", "userName", "userRole"]);
    const navigate = useNavigate();
    function logout(){
        setCookie("jwtToken", "", {path: "/"})
        setCookie("userName", "", {path: "/"})
        setCookie("userRole", "", {path: "/"})
        navigate("/")
    }

    return (
        <>
        <Navbar expand="sm" bg="dark" data-bs-theme="dark" sticky="top">
        <Navbar.Brand as={Link} to="/home" style={{marginLeft:"20px"}}>Microphone Scheduler</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto" style={{marginRight:"20px"}}>
              {cookies.userName == "" || cookies.userName == null ? <Nav.Link as={Link} to="/register">Register</Nav.Link> : ""}
              {cookies.userName == "" || cookies.userName == null ? <Nav.Link as={Link} to="/login">Login</Nav.Link> : <Button onClick={() => logout()}>{cookies.userName} SignOut</Button>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        </>
    );
};

export default NavBar;