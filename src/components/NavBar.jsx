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
  const { theaterProduction, setTheaterProduction } = useGlobalContext();
  const { premiereDate, setPremiereDate } = useGlobalContext();
  const { description, setDescription } = useGlobalContext();
  const { scene, setScene } = useGlobalContext();
  const { character, setCharacter } = useGlobalContext();
  const { microphone, setMicrophone } = useGlobalContext();
  const { hideMicrophone, setHideMicrophone } = useGlobalContext();
  const { otherMicrophoneSchedule, setOtherMicrophoneSchedule } =
    useGlobalContext();
  const { actor, setActor } = useGlobalContext();
  const { showSchedule, setShowSchedule } = useGlobalContext();
  const { hide, setHide } = useGlobalContext();
  const { commentTranslation, setCommentTranslation } = useGlobalContext();
  const { save, setSave } = useGlobalContext();
  const { commentInfo, setCommentInfo } = useGlobalContext();
  const { userName, setUserName } = useGlobalContext();
  const { userRole, setUserRole } = useGlobalContext();
  const { actions, setActions } = useGlobalContext();
  const { newRole, setNewRole } = useGlobalContext();
  const { deleteUserTranslation, setDeleteUserTranslation } =
    useGlobalContext();
  const { registerTranslation, setRegisterTranslation } = useGlobalContext();
  const { passwordTranslation, setPasswordTranslation } = useGlobalContext();
  const { registerloginTranslation, setRegisterLoginTranslation } =
    useGlobalContext();
  const { logInTranslation, setLogInTranslation } = useGlobalContext();
  const { actSceneTranslation, setActSceneTranslation } = useGlobalContext();
  const { characterToSceneTranslation, setCharacterToSceneTranslation } =
    useGlobalContext();
  const {
    microphoneInProductionTranslation,
    setMicrophoneInProductionTranslation,
  } = useGlobalContext();
  const { deleteTranslation, setDeleteTranslation } = useGlobalContext();
  const {
    manageTheaterProductionsTranslate,
    setManageTheaterProductionsTranslate,
  } = useGlobalContext();
  const { editTranslation, setEditTranslation } = useGlobalContext();
  const { newProductionTranslation, setNewProductionTranslation } =
    useGlobalContext();
  const { addProductionTranlation, setAddProductionTranslation } =
    useGlobalContext();
  const { productionNameTranslation, setProductionNameTranslation } =
    useGlobalContext();
  const { saveProductionTranslation, setSaveProductionTranslation } =
    useGlobalContext();
  const { cancelEditTranslation, setCancelEditTranslation } =
    useGlobalContext();
  const { manageActSceneTranslation, setManageActSceneTranslation } =
    useGlobalContext();
  const { selectProductionTranslation, setSelectProductionTranslation } =
    useGlobalContext();
  const { productionTranslation, setProductionTranslation } =
    useGlobalContext();
  const { actNumberTranslation, setActNumberTranslation } = useGlobalContext();
  const { sceneNumberTranslation, setSceneNumberTranslation } =
    useGlobalContext();
  const { sceneNameTranslation, setSceneNameTranslation } = useGlobalContext();
  const { saveSceneTranslation, setSaveSceneTranslation } = useGlobalContext();
  const { addActTranslation, setAddActTranslation } = useGlobalContext();
  const { numberOfScenesTranslation, setNumberOfScenesTranslation } =
    useGlobalContext();
  const { numberOfScenesToAddTranslation, setNumberOfScenesToAddTranslation } =
    useGlobalContext();
  const {manageCharacterToSceneTranslation, setManageCharacterToSceneTranslation} = useGlobalContext();
  const {charactersTranslation, setCharactersTranslation} = useGlobalContext();
  const {characterNameTranslation, setCharacterNameTranslation} = useGlobalContext();
  const {addCharacterTranslation, setAddCharacterTranslation} = useGlobalContext();
  const {addTranslation, setAddTranslation} = useGlobalContext();
  const {removeTranslation, setRemoveTranslation} = useGlobalContext();
  const {cancelTranslation, setCancelTranslation} = useGlobalContext();
  const {selectTranslation, setSelectTranslation} = useGlobalContext();
  const {manageCharatersTranslation, setManageCharatersTranslation} = useGlobalContext();
  const {editActorTranslation, setEditActorTranslation} = useGlobalContext();
  const {createCharacterTranslation, setCreateCharacterTranslation} = useGlobalContext();
  const {enterCharacterNameTranslation, setEnterCharacterNameTranslation} = useGlobalContext();
  const {sceneInformationTranslation, setSceneInformationTranslation} = useGlobalContext();
  const {scenesTranslation, setScenesTranslation} = useGlobalContext();
  const {hideSceneInfoTranslation, setHideSceneInfoTranslation} = useGlobalContext();
  const {manageMicrophoneInProductionTranslation, setManageMicrophoneInProductionTranslation} = useGlobalContext();
  const {scenesWithAssignedCharactersTranslation, setScenesWithAssignedCharactersTranslation} = useGlobalContext();
  const {suggestMicrophoneScheduleTranslation, setSuggestMicrophoneScheduleTranslation} = useGlobalContext();
  const {applyTranslation, setApplyTranslation} = useGlobalContext();
  const {loadPDFTranslation, setLoadPDFTranslation} = useGlobalContext();
  const {hidePDFTranslation, setHidePDFTranslation} = useGlobalContext();
  const {suggestedScheduleTranslation, setSuggestedScheduleTranslation} = useGlobalContext();
  const {hideSuggestedTranslation, setHideSuggestedTranslation} = useGlobalContext();
  const {microphonesTranslation, setMicrophonesTranslation} = useGlobalContext();
  const {nameTranslation, setNameTranslation} = useGlobalContext();
  const {renameTranslation, setRenameTranslation} = useGlobalContext();
  const {enterMicrophoneName, setEnterMicrophoneName} = useGlobalContext();
  const {showExcelTranslation, setShowExcelTranslation} = useGlobalContext();
  const {hideExcelTranslation, setHideExcelTranslation} = useGlobalContext();
  const {saveExcelTranslation, setSaveExcelTranslation} = useGlobalContext();

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
      setHomeTheaterProductions("Teater Produktioner");
      setHomeUserService("Hantera Användare");
      setTheaterProduction("Teater Föreställning");
      setPremiereDate("Premiär Datum");
      setDescription("Beskrivning");
      setScene("Scen");
      setCharacter("Karaktär");
      setMicrophone("Mikrofon");
      setHideMicrophone("Dölj Mikrofon Schema");
      setOtherMicrophoneSchedule("Schema Andra Skådespelare");
      setActor("Skådespelare");
      setShowSchedule("Visa Scema");
      setHide("Dölj");
      setCommentTranslation("Kommentar");
      setSave("Spara");
      setCommentInfo(
        "Kommentarer är synliga för dig, administratörer och direktörer"
      );
      setUserName("Användarnamn");
      setUserRole("Användarroll");
      setActions("Händelser");
      setNewRole("Bekräfta Roll");
      setDeleteUserTranslation("Ta bort Användare");
      setRegisterTranslation("Registrera");
      setPasswordTranslation("Lösenord");
      setRegisterLoginTranslation("Registrera och LoggaIn");
      setLogInTranslation("Logga In");
      setActSceneTranslation("Akt & Scen");
      setCharacterToSceneTranslation("Karaktär till Scen");
      setMicrophoneInProductionTranslation("Mikrofon i Produktion");
      setManageTheaterProductionsTranslate("Hantera Teater Produktioner");
      setEditTranslation("Redigera");
      setNewProductionTranslation("Ny Produktion");
      setAddProductionTranslation("Lägg till Produktion");
      setDeleteTranslation("Ta Bort");
      setProductionNameTranslation("Produktions Namn");
      setSaveProductionTranslation("Spara Produktion");
      setCancelEditTranslation("Avbryt Redigering");
      setManageActSceneTranslation("Hantera Akter & Scener");
      setSelectProductionTranslation("Välj Produktion");
      setProductionTranslation("Produktion");
      setActNumberTranslation("Akt Nummer");
      setSceneNumberTranslation("Scen Nummer");
      setSceneNameTranslation("Scen Namn");
      setSaveSceneTranslation("Spara Scen");
      setAddActTranslation("Lägg till Akt");
      setNumberOfScenesTranslation("Antal Scener");
      setNumberOfScenesToAddTranslation("Antal scener som skall läggas till");
      setManageCharacterToSceneTranslation("Hantera Karaktärer till Scen");
      setCharactersTranslation("Karaktärer");
      setCharacterNameTranslation("Karaktär Namn");
      setAddCharacterTranslation("Lägg till Karaktär");
      setAddTranslation("Lägg till");
      setRemoveTranslation("Ta bort");
      setCancelTranslation("Avbryt");
      setSelectTranslation("Välj");
      setManageCharatersTranslation("Hantera Karaktärer");
      setEditActorTranslation("Redigera Skådespelare");
      setCreateCharacterTranslation("Skapa Karaktär");
      setEnterCharacterNameTranslation("Skriv in namn på Karaktär");
      setSceneInformationTranslation("Scen Information");
      setScenesTranslation("Scener");
      setHideSceneInfoTranslation("Dölj Scne Info");
      setManageMicrophoneInProductionTranslation("Hantera Mikrofoner i Produktion");
      setScenesWithAssignedCharactersTranslation("Scener med allokerade Karaktärer");
      setSuggestMicrophoneScheduleTranslation("Föreslå Mikrofon Schema");
      setApplyTranslation("Tillämpa");
      setLoadPDFTranslation("Visa PDF");
      setHidePDFTranslation("Dölj PDF");
      setSuggestedScheduleTranslation("Föreslagen Schema");
      setHideSuggestedTranslation("Dölj förslag");
      setMicrophonesTranslation("Mikrofoner");
      setNameTranslation("Namn");
      setRenameTranslation("Döp Om");
      setEnterMicrophoneName("Skriv Mikrofon Namn");
      setShowExcelTranslation("Visa Excel");
      setHideExcelTranslation("Dölj Excel");
      setSaveExcelTranslation("Spara Excel");
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
      setPremiereDate("Premiere Date");
      setDescription("Description");
      setScene("Scene");
      setCharacter("Character");
      setMicrophone("Microphone");
      setHideMicrophone("Hide Microphone Schedule");
      setOtherMicrophoneSchedule("Other Actors Schedule");
      setActor("Actor");
      setShowSchedule("Show Schedule");
      setHide("Hide");
      setCommentTranslation("Comment");
      setSave("Save");
      setCommentInfo("Comments are visible for you, admins and directors");
      setUserName("User Name");
      setUserRole("User Role");
      setActions("Actions");
      setNewRole("Set new Role");
      setDeleteUserTranslation("Delete User");
      setRegisterTranslation("Register");
      setPasswordTranslation("Password");
      setRegisterLoginTranslation("Register and Login");
      setLogInTranslation("LogIn");
      setActSceneTranslation("Act & Scene");
      setCharacterToSceneTranslation("Character to Scene");
      setMicrophoneInProductionTranslation("Microphone in Production");
      setManageTheaterProductionsTranslate("Manage Theater Productions");
      setEditTranslation("Edit");
      setNewProductionTranslation("New Production");
      setAddProductionTranslation("Add Production");
      setDeleteTranslation("Delete");
      setProductionNameTranslation("Production Name");
      setSaveProductionTranslation("Save Production");
      setCancelEditTranslation("Cancel Edit");
      setManageActSceneTranslation("Manage Acts & Scenes");
      setSelectProductionTranslation("Select Production");
      setProductionTranslation("Production");
      setActNumberTranslation("Act Number");
      setSceneNumberTranslation("Scene Number");
      setSceneNameTranslation("Scene Name");
      setSaveSceneTranslation("Save Scene");
      setAddActTranslation("Add Act");
      setNumberOfScenesTranslation("Number of Scenes");
      setNumberOfScenesToAddTranslation("Number of scenes to be added");
      setManageCharacterToSceneTranslation("Manage Characters to Scene");
      setCharactersTranslation("Characters");
      setCharacterNameTranslation("Character Name");
      setAddCharacterTranslation("Add Character");
      setAddTranslation("Add");
      setRemoveTranslation("Remove");
      setCancelTranslation("Cancel");
      setSelectTranslation("Select");
      setManageCharatersTranslation("Manage Characters");
      setEditActorTranslation("Edit Actor");
      setCreateCharacterTranslation("Create Character");
      setEnterCharacterNameTranslation("Enter Character name");
      setSceneInformationTranslation("Scene Information");
      setScenesTranslation("Scenes");
      setHideSceneInfoTranslation("Hide Scene Info");
      setManageMicrophoneInProductionTranslation("Manage Microphone in Production");
      setScenesWithAssignedCharactersTranslation("Scenes with assigned Characters");
      setSuggestMicrophoneScheduleTranslation("Suggest MicrophoneSchedule");
      setApplyTranslation("Apply");
      setLoadPDFTranslation("Load PDF");
      setHidePDFTranslation("Hide PDF");
      setSuggestedScheduleTranslation("Suggested Schedule");
      setHideSuggestedTranslation("Hide Suggested");
      setMicrophonesTranslation("Microphones");
      setNameTranslation("Name");
      setRenameTranslation("Rename");
      setEnterMicrophoneName("Enter Microphone Name");
      setShowExcelTranslation("Show Excel");
      setHideExcelTranslation("Hide Excel");
      setSaveExcelTranslation("Save Excel");
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
          <img
            src="../src/assets/Med-namn-transparent.png"
            alt=""
            height={"45px"}
          />
        </Navbar.Brand>
        <Navbar.Brand as={Link}>
          <img
            src={language}
            onClick={toggleLanguage}
            alt=""
            width={"40px"}
            height={"25px"}
            style={{ marginBottom: "2px", marginLeft: "10px" }}
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
