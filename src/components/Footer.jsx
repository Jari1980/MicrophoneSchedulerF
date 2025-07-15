import React from "react";
import { Container, Col, Stack, Nav, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useGlobalContext } from "./context";

const Footer = () => {
  const [cookies, setCookie] = useCookies(["jwtToken", "userName", "userRole"]);
  const navigate = useNavigate();
  const {footerRowClass, setFooterRowClass} = useGlobalContext();
  const {footerLinkText, setFooterLinkText} = useGlobalContext();

  function logout(){
        setCookie("jwtToken", "", {path: "/"})
        setCookie("userName", "", {path: "/"})
        setCookie("userRole", "", {path: "/"})
        navigate("/")
    }

  return (
    <footer >
      <Container fluid style={{marginTop: "auto", position:"fixed", width:"100%", bottom: "0", height: "auto"}}>
        <Row className={footerRowClass} >
          <Col className="mx-4">
            <Stack>
              <h3>Teaterstickorna</h3>
              <p>Microphone Scheduler</p>
              <p></p>
            </Stack>
          </Col>
          {/*
          <Col>
            <Nav className="flex-column fs-5">
              <h5>Short Links</h5>
              <Nav.Link className={footerLinkText} as={Link} to="/home">
                Home
              </Nav.Link>
              <Nav.Link className={footerLinkText} as={Link} to="/home">
              About
            </Nav.Link>
              {cookies.userName == "" || cookies.userName == null ? (
                <Nav.Link className={footerLinkText} as={Link} to="/register">
                  Register
                </Nav.Link>
              ) : (
                ""
              )}
              {cookies.userName == "" || cookies.userName == null ? (
                <Nav.Link className={footerLinkText} as={Link} to="/login">
                  Login
                </Nav.Link>
              ) : (
                <Nav.Link className={footerLinkText} onClick={() => logout()}>
                  {cookies.userName} SignOut
                </Nav.Link>
              )}
            </Nav>
          </Col>
          */}
          {/* 
          <Col>
          <h5>Contact:</h5>
          <p>???</p>
          <p>???</p>
          </Col>
          */}
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
