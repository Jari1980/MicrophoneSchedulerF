import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "./context";
import { useState } from "react";

const NavBar = () => {
  const [cookies, setCookie] = useCookies(["jwtToken", "userName", "userRole"]);
  const navigate = useNavigate();
  const { dark, setDark } = useGlobalContext();
  const { bgColor, setBgColor } = useGlobalContext();
  const { bgColorDashboard, setBgColorDashboard } = useGlobalContext();
  const { dashboardText, setDashboardText } = useGlobalContext();
  const { footerRowClass, setFooterRowClass } = useGlobalContext();
  const { footerLinkText, setFooterLinkText } = useGlobalContext();
  //Translations
  const [language, setLanguage] = useState("../src/assets/England.png");
  const [lightTheme, setLightTheme] = useState("Light Theme");
  const [darkTheme, setDarkTheme] = useState("Dark Theme");
  const [about, setAbout] = useState("About");
  const [logIn, setLogIn] = useState("LogIn");
  const [register, setRegister] = useState("Register");
  const [signOut, setSignOut] = useState("SignOut");
  const { homeMicrophoneSchedule, setHomeMicrophoneSchedule } =
    useGlobalContext();
  const { homeTheaterProductions, setHomeTheaterProductions } =
    useGlobalContext();
  const { homeUserService, setHomeUserService } = useGlobalContext();

  const {theaterProduction, setTheaterProduction} = useGlobalContext();
  const {premiereDate, setPremiereDate} = useGlobalContext();
  const {description, setDescription} = useGlobalContext();
  const {scene, setScene} = useGlobalContext();
  const {character, setCharacter} = useGlobalContext();
  const {microphone, setMicrophone} = useGlobalContext();
  const {hideMicrophone, setHideMicrophone} = useGlobalContext();
  const {otherMicrophoneSchedule, setOtherMicrophoneSchedule} = useGlobalContext();
  const {actor, setActor} = useGlobalContext();
  const {showSchedule, setShowSchedule} = useGlobalContext();
  const {hide, setHide} = useGlobalContext();
  const {commentTranslation, setCommentTranslation} = useGlobalContext();
  const {save, setSave} = useGlobalContext();
  const {commentInfo, setCommentInfo} = useGlobalContext();

  function logout() {
    setCookie("jwtToken", "", { path: "/" });
    setCookie("userName", "", { path: "/" });
    setCookie("userRole", "", { path: "/" });
    navigate("/");
  }

  function handleClick() {
    if (dark === "dark") {
      setDark("light");
      setBgColor(
        "linear-gradient(120deg,rgb(117, 143, 231), rgb(149, 165, 207) 50%,rgb(221, 224, 233))"
      );
      setBgColorDashboard(
        "linear-gradient(120deg,rgb(117, 143, 231), rgb(149, 165, 207) 50%,rgb(221, 224, 233))"
      );
      setDashboardText("indigo");
      setFooterRowClass("bg-white text-black p-2");
      setFooterLinkText("text-black");
    } else {
      setDark("dark");
      setBgColor(
        "linear-gradient(120deg,rgb(114, 119, 138),rgb(71, 97, 190) 50%,rgb(132, 142, 173))"
      );
      setBgColorDashboard(
        "linear-gradient(120deg,rgb(114, 119, 138),rgb(74, 85, 126) 50%,rgb(135, 138, 148))"
      );
      setDashboardText("whitesmoke");
      setFooterRowClass("bg-dark text-secondary p-2");
      setFooterLinkText("text-secondary");
    }
  }

  function toggleLanguage() {
    if (language === "../src/assets/England.png") {
      setLanguage("../src/assets/Sweden.png");
      setLightTheme("Ljus Tema");
      setDarkTheme("Mörk Tema");
      setAbout("Om");
      setLogIn("LoggaIn");
      setRegister("Registrera");
      setSignOut("LoggaUt");
      setHomeMicrophoneSchedule("Mikrofon Schema");
      setHomeTheaterProductions("Teater produktion");
      setHomeUserService("Hantera användare");
      setTheaterProduction("Teater Föreställning");
      setPremiereDate("Premiär Datum")
      setDescription("Beskrivning")
      setScene("Scen")
      setCharacter("Karaktär")
      setMicrophone("Mikrofon")
      setHideMicrophone("Dölj Mikrofon Schema")
      setOtherMicrophoneSchedule("Schema Andra Skådespelare")
      setActor("Skådespelare")
      setShowSchedule("Visa Scema")
      setHide("Dölj")
      setCommentTranslation("Kommentar")
      setSave("Spara")
      setCommentInfo("Kommentarer är synliga för dig, administratörer och direktörer")
    } else {
      setLanguage("../src/assets/England.png");
      setLightTheme("Light Theme");
      setDarkTheme("Dark Theme");
      setAbout("About");
      setLogIn("LogIn");
      setRegister("Register");
      setSignOut("SignOut");
      setHomeMicrophoneSchedule("Microphone Schedule");
      setHomeTheaterProductions("Theater Productions");
      setHomeUserService("User Service");
      setTheaterProduction("Theater Production");
      setPremiereDate("Premiere Date")
      setDescription("Description")
      setScene("Scene")
      setCharacter("Character")
      setMicrophone("Microphone")
      setHideMicrophone("Hide Microphone Schedule")
      setOtherMicrophoneSchedule("Other Actors Schedule")
      setActor("Actor")
      setShowSchedule("Show Schedule")
      setHide("Hide")
      setCommentTranslation("Comment")
      setSave("Save")
      setCommentInfo("Comments are visible for you, admins and directors")
    }
  }

  return (
    <>
      <Navbar
        expand="sm"
        bg={dark}
        data-bs-theme={dark}
        sticky="top"
        style={{ width: "101%" }}
      >
        <Navbar.Brand as={Link} to="/home" style={{ marginLeft: "20px" }}>
          Teaterstickorna
        </Navbar.Brand>
        <Navbar.Brand>
          <img
            src={language}
            onClick={toggleLanguage}
            alt=""
            width={"40px"}
            height={"25px"}
            style={{ marginBottom: "2px" }}
          />
        </Navbar.Brand>
        <Button variant="outline-secondary" size="sm" onClick={handleClick}>
          {dark === "dark" ? lightTheme : darkTheme}
        </Button>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" style={{ marginRight: "20px" }}>
            <Navbar.Brand as={Link} to="/about" style={{ marginLeft: "20px" }}>
              {about}
            </Navbar.Brand>
            {cookies.userName == "" || cookies.userName == null ? (
              <Nav.Link as={Link} to="/register">
                {register}
              </Nav.Link>
            ) : (
              ""
            )}
            {cookies.userName == "" || cookies.userName == null ? (
              <Nav.Link as={Link} to="/login">
                {logIn}
              </Nav.Link>
            ) : (
              <Button onClick={() => logout()}>
                {cookies.userName} {signOut}
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
