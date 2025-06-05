import React from "react";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from 'react-bootstrap'
import { useCookies } from "react-cookie";
import CookieConsent from "./components/CookieConsent";
import { redirect, useNavigate } from "react-router-dom";

function App() {
  const [cookies, setCookie] = useCookies(["cookieConsent", "jwtToken", "userName", "userRole"])
  const navigate = useNavigate();

  return (
    <>
      <p>Hello World</p>
      {cookies.userRole == "ROLE_ADMINISTRATOR" ? <Button onClick={() => navigate("/userservice")}>User Service</Button> : ""}
      {!cookies.cookieConsent && <CookieConsent />}
    </>
  )
}

export default App;
