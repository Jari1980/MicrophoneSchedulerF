import React from "react";
import { Container } from "react-bootstrap";
import { useGlobalContext } from "./context";
import { useCookies } from "react-cookie";

const TestUser = () => {
  const { userName, setUserName } = useGlobalContext();
  const { userRole, setUserRole } = useGlobalContext();
  const [cookies, setCookie] = useCookies(["jwtToken", "userName", "userRole"]);

  return (
    <>
      <Container>
        <br />
        <h1>From GlobalContext: </h1>
        <h2>User: {userName}</h2>
        <h2>UserRole: {userRole}</h2>
        <br />
        <br />
        <h1>From Cookie</h1>
        <h2>JWT: {cookies.jwtToken}</h2>
        <h2>User: {cookies.userName}</h2>
        <h2>UserRole: {cookies.userRole}</h2>
      </Container>
    </>
  );
};

export default TestUser;
