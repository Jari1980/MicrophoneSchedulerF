import React from "react";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Container } from 'react-bootstrap'
import { useCookies } from "react-cookie";
import CookieConsent from "./components/CookieConsent";

function App() {
  const [cookies] = useCookies(["cookieConsent"])

  return (
    <>
      <p>Hello World</p>
      {!cookies.cookieConsent && <CookieConsent />}
    </>
  )
}

export default App;
