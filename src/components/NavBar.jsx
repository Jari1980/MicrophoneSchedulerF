import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from './context';

const NavBar = () => {
    const [cookies, setCookie] = useCookies(["jwtToken", "userName", "userRole"]);
    const navigate = useNavigate();
    const {dark, setDark} = useGlobalContext();
    const {bgColor, setBgColor} = useGlobalContext();
    const {bgColorDashboard, setBgColorDashboard} = useGlobalContext();
    const {dashboardText, setDashboardText} = useGlobalContext();
    const {footerRowClass, setFooterRowClass} = useGlobalContext();
    const {footerLinkText, setFooterLinkText} = useGlobalContext();

    function logout(){
        setCookie("jwtToken", "", {path: "/"})
        setCookie("userName", "", {path: "/"})
        setCookie("userRole", "", {path: "/"})
        navigate("/")
    }

    function handleClick(){
    if(dark === "dark"){
      setDark("light")
      setBgColor("linear-gradient(120deg,rgb(117, 143, 231), rgb(149, 165, 207) 50%,rgb(221, 224, 233))")
      setBgColorDashboard("linear-gradient(120deg,rgb(117, 143, 231), rgb(149, 165, 207) 50%,rgb(221, 224, 233))")
      setDashboardText("indigo")
      setFooterRowClass("bg-white text-black p-2")
      setFooterLinkText("text-black")
    }
    else{
      setDark("dark")
      setBgColor("linear-gradient(120deg,rgb(114, 119, 138),rgb(71, 97, 190) 50%,rgb(132, 142, 173))")
      setBgColorDashboard("linear-gradient(120deg,rgb(114, 119, 138),rgb(74, 85, 126) 50%,rgb(135, 138, 148))")
      setDashboardText("whitesmoke")
      setFooterRowClass("bg-dark text-secondary p-2")
      setFooterLinkText("text-secondary")
    }
  }

    return (
        <>
        <Navbar expand="sm" bg={dark} data-bs-theme={dark} sticky="top">
        <Navbar.Brand as={Link} to="/home" style={{marginLeft:"20px"}}>Teaterstickorna</Navbar.Brand>
        <Button variant="outline-secondary" size="sm" onClick={handleClick}>{dark === "dark" ? 'Light Theme' : 'Dark Theme'}</Button>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto" style={{marginRight:"20px"}}>
              <Navbar.Brand as={Link} to="/about" style={{marginLeft:"20px"}}>About</Navbar.Brand>
              {cookies.userName == "" || cookies.userName == null ? <Nav.Link as={Link} to="/register">Register</Nav.Link> : ""}
              {cookies.userName == "" || cookies.userName == null ? <Nav.Link as={Link} to="/login">Login</Nav.Link> : <Button onClick={() => logout()}>{cookies.userName} SignOut</Button>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        </>
    );
};

export default NavBar;