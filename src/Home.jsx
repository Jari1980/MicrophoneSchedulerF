import React from "react";
import { useState } from "react";
import "./App.css";
import { Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import CookieConsent from "./components/CookieConsent";
import { redirect, useNavigate } from "react-router-dom";
import { useGlobalContext } from "./components/context";

function Home() {
  const [cookies, setCookie] = useCookies([
    "cookieConsent",
    "jwtToken",
    "userName",
    "userRole",
  ]);
  const navigate = useNavigate();
  const { bgColor, setBgColor } = useGlobalContext();
  const { homeMicrophoneSchedule, setHomeMicrophoneSchedule } =
    useGlobalContext();
  const { homeTheaterProductions, setHomeTheaterProductions } =
    useGlobalContext();
  const { homeUserService, setHomeUserService } = useGlobalContext();

  return (
    <>
      <div
        style={{
          backgroundImage: bgColor,
          width: "100vw",
          height: "100%",
          overflow: "hidden",
          paddingBottom: "120px",
        }}
      >
        {!cookies.cookieConsent && <CookieConsent />}
        <br />
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontFamily: "Brush Script MT", fontSize: "44px" }}>
            Teaterstickorna
          </h1>
          <br />
          <br />
          <br />
          <br />
          {cookies.userRole == "ROLE_ACTOR" ||
          cookies.userRole == "ROLE_ADMINISTRATOR" ||
          cookies.userRole == "ROLE_DIRECTOR" ? (
            <Button
              style={{ width: "240px" }}
              onClick={() => navigate("/actorscenes")}
            >
              {homeMicrophoneSchedule}
            </Button>
          ) : (
            ""
          )}
          <br />
          <br />
          {cookies.userRole == "ROLE_ADMINISTRATOR" ||
          cookies.userRole == "ROLE_DIRECTOR" ? (
            <Button
              style={{ width: "240px" }}
              onClick={() => navigate("/dashboard")}
            >
              {homeTheaterProductions}
            </Button>
          ) : (
            ""
          )}
          <br />
          <br />
          {cookies.userRole == "ROLE_ADMINISTRATOR" ? (
            <Button
              style={{ width: "240px" }}
              onClick={() => navigate("/userservice")}
            >
              {homeUserService}
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
