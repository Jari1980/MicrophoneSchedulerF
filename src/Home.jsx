import React from "react";
import { useState } from 'react'
import './App.css'
import { Button } from 'react-bootstrap'
import { useCookies } from "react-cookie";
import CookieConsent from "./components/CookieConsent";
import { redirect, useNavigate } from "react-router-dom";
import { useGlobalContext } from "./components/context";

function Home() {
  const [cookies, setCookie] = useCookies(["cookieConsent", "jwtToken", "userName", "userRole"])
  const navigate = useNavigate();
  const {bgColor, setBgColor} = useGlobalContext();

  return (
    <>
    <div style={{backgroundImage:bgColor, width:"100vw", height:"100vh", overflow: "hidden"}}>
      {!cookies.cookieConsent && <CookieConsent />}
      <br />
      <div style={{textAlign:"center"}}>
      <h1 style={{fontFamily: "Brush Script MT", fontSize: "44px"}}>Teaterstickorna</h1>
      <br/>
      <b>Image?</b>
      <br />
      <br />
      <br />
      {cookies.userRole == "ROLE_ADMINISTRATOR" || cookies.userRole == "ROLE_DIRECTOR" ? 
      <Button style={{width: "240px"}} onClick={() => navigate("/dashboard")}>Manage Theater productions</Button>
       : ""}
      <br />
      <br />
      {cookies.userRole == "ROLE_ADMINISTRATOR" ? 
      <Button style={{width: "240px"}} onClick={() => navigate("/userservice")}>User Service</Button> 
      : ""}
      </div>
      </div>
    </>
  )
}

export default Home;
