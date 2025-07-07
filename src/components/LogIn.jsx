import React from "react";
import { Button, Form, Container } from "react-bootstrap";
import axios from "axios";
import { useGlobalContext } from "./context";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [cookies, setCookie] = useCookies(["jwtToken", "userName", "userRole"]);
  const navigate = useNavigate();
  const {bgColor, setBgColor} = useGlobalContext();

  function handleSubmit(event) {
    event.preventDefault();
    try {
      axios
        .post("http://localhost:8080/api/v1/user/login", {
          userName: event.currentTarget.elements.formUserName.value,
          password: event.currentTarget.elements.formPassword.value,
        })
        .then((response) => {
          console.log(
            "LogIn succes: " +
              "\nJWT: " +
              response.data.jwtToken +
              "\nuserName: " +
              response.data.userName +
              "\nuserRole: " +
              response.data.userRole
          );
          setCookie("jwtToken", response.data.jwtToken, { path: "/" });
          setCookie("userName", response.data.userName, { path: "/" });
          setCookie("userRole", response.data.userRole, { path: "/" });
          navigate("/");
        });
    } catch (error) {
      console.log("Error logging in: " + error);
    }
  }

  return (
    <div style={{backgroundImage:bgColor, width:"100vw", height:"80vh", overflow: "hidden"}}>
      <Container
        style={{ width: "50%", alignItems: "center", justifyContent: "center" }}
      >
        <h1 style={{ marginTop: "20px" }}>Login</h1>
        <br />
        <br />
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formUserName">
            <Form.Label>
              <b>Username</b>
            </Form.Label>
            <Form.Control type="text" placeholder="Enter username" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>
              <b>Password</b>
            </Form.Label>
            <Form.Control type="password" placeholder="Enter password" />
          </Form.Group>
          <Button variant="primary" type="submit" className="extButton">
            LogIn
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default LogIn;
