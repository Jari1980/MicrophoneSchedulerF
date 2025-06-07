import React from "react";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from 'react-bootstrap'
import { useCookies } from "react-cookie";
import CookieConsent from "./components/CookieConsent";
import { redirect, useNavigate } from "react-router-dom";

function Home() {
  const [cookies, setCookie] = useCookies(["cookieConsent", "jwtToken", "userName", "userRole"])
  const navigate = useNavigate();

  return (
    <>
      <p>Hello World</p>
      {cookies.userRole == "ROLE_ADMINISTRATOR" || cookies.userRole == "ROLE_DIRECTOR" ? <Button onClick={() => navigate("/dashboard")}>Manage Theater productions</Button> : ""}
      {cookies.userRole == "ROLE_ADMINISTRATOR" ? <Button onClick={() => navigate("/userservice")}>User Service</Button> : ""}
      {!cookies.cookieConsent && <CookieConsent />}
    </>
  )
}

export default Home;
