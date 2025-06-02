import React from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useGlobalContext } from "./context";
import { useCookies } from "react-cookie";

const LogIn = () => {
    const{userName, setUserName} = useGlobalContext();
    const{userRole, setUserRole} = useGlobalContext();
    const [cookies, setCookie] = useCookies(["jwtToken"])

  function handleSubmit(event) {
    event.preventDefault();
    const userData = {
      username: event.currentTarget.elements.formUserName.value,
      password: event.currentTarget.elements.formPassword.value,
    };
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
          setUserName(response.data.userName)
          setUserRole(response.data.userRole)
          setCookie("jwtToken", response.data.jwtToken, {path: "/"})
        });
    } catch (error) {
      console.log("Error logging in: " + error);
    }
  }

  return (
    <div>
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
    </div>
  );
};

export default LogIn;
