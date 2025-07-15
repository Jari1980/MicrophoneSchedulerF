import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

    //Toggle background
    const [dark, setDark] = useState("dark");
    const [bgColor, setBgColor] = useState(
      "linear-gradient(120deg,rgb(114, 119, 138),rgb(71, 97, 190) 50%,rgb(132, 142, 173))"
    );
    const [bgColorDashboard, setBgColorDashboard] = useState(
      "linear-gradient(120deg,rgb(114, 119, 138),rgb(74, 85, 126) 50%,rgb(135, 138, 148))"
    );
    const [dashboardText, setDashboardText] = useState("whitesmoke")
    const [footerRowClass, setFooterRowClass] = useState("bg-dark text-secondary p-2")
    const [footerLinkText, setFooterLinkText] = useState("text-secondary")

    //Toggle language
    const [homeMicrophoneSchedule, setHomeMicrophoneSchedule] = useState("Microphone Schedule")
    const [homeTheaterProductions,  setHomeTheaterProductions] = useState("Theater Productions")
    const [homeUserService, setHomeUserService] = useState("User Service")
    const [theaterProduction, setTheaterProduction] = useState("Theater Production")
    const [premiereDate, setPremiereDate] = useState("Premiere Date")
    const [description, setDescription] = useState("Description")
    const [scene, setScene] = useState("Scene")
    const [character, setCharacter] = useState("Character")
    const [microphone, setMicrophone] = useState("Microphone")
    const [hideMicrophone, setHideMicrophone] = useState("Hide Microphone Schedule")
    const [otherMicrophoneSchedule, setOtherMicrophoneSchedule] = useState("Other Actors Schedule")
    const [actor, setActor] = useState("Actor")
    const [showSchedule, setShowSchedule] = useState("Show Schedule")
    const [hide, setHide] = useState("Hide")
    const [commentTranslation, setCommentTranslation] = useState("Comment")
    const [save, setSave] = useState("Save")
    const [commentInfo, setCommentInfo] = useState("Comments are visible for you, admins and directors")
    const [userName, setUserName] = useState("User Name")
    const [userRole, setUserRole] = useState("User Role")
    const [actions, setActions] = useState("Actions")
    const [newRole, setNewRole] = useState("Set New Role")
    const [deleteUserTranslation, setDeleteUserTranslation] = useState("Delete User")
    const [registerTranslation, setRegisterTranslation] = useState("Register")
    const [passwordTranslation, setPasswordTranslation] = useState("Password")
    const [registerloginTranslation, setRegisterLoginTranslation] = useState("Register and Login")
    const [logInTranslation, setLogInTranslation] = useState("LogIn")
    const [actSceneTranslation, setActSceneTranslation] = useState("Act & Scene")
    const [characterToSceneTranslation, setCharacterToSceneTranslation] = useState("Character To Scene")
    const [microphoneInProductionTranslation, setMicrophoneInProductionTranslation] = useState("Microphone in Production")
    const [manageTheaterProductionsTranslate, setManageTheaterProductionsTranslate] = useState("Manage Theater Productions")
    const [editTranslation, setEditTranslation] = useState("Edit")
    const [newProductionTranslation, setNewProductionTranslation] = useState("New Production")
    const [addProductionTranlation, setAddProductionTranslation] = useState("Add Production")
    const [deleteTranslation, setDeleteTranslation] = useState("Delete")
    const [productionNameTranslation, setProductionNameTranslation] = useState("Production Name")
    const [saveProductionTranslation, setSaveProductionTranslation] = useState("Save Production")
    const [cancelEditTranslation, setCancelEditTranslation] = useState("Cancel Edit")

  return (
    <GlobalContext.Provider
    value={{
        dark,
        setDark,
        bgColor,
        setBgColor,
        bgColorDashboard,
        setBgColorDashboard,
        dashboardText,
        setDashboardText,
        footerRowClass,
        setFooterRowClass,
        footerLinkText,
        setFooterLinkText,

        homeMicrophoneSchedule,
        setHomeMicrophoneSchedule,
        homeTheaterProductions,
        setHomeTheaterProductions,
        homeUserService,
        setHomeUserService,
        theaterProduction,
        setTheaterProduction,
        premiereDate,
        setPremiereDate,
        description,
        setDescription,
        scene,
        setScene,
        character,
        setCharacter,
        microphone,
        setMicrophone,
        hideMicrophone,
        setHideMicrophone,
        otherMicrophoneSchedule,
        setOtherMicrophoneSchedule,
        actor,
        setActor,
        showSchedule,
        setShowSchedule,
        hide,
        setHide,
        commentTranslation,
        setCommentTranslation,
        save,
        setSave,
        commentInfo,
        setCommentInfo,
        userName,
        setUserName,
        userRole,
        setUserRole,
        actions,
        setActions,
        newRole,
        setNewRole,
        deleteUserTranslation,
        setDeleteUserTranslation,
        registerTranslation,
        setRegisterTranslation,
        passwordTranslation,
        setPasswordTranslation,
        registerloginTranslation,
        setRegisterLoginTranslation,
        logInTranslation,
        setLogInTranslation,
        actSceneTranslation,
        setActSceneTranslation,
        characterToSceneTranslation,
        setCharacterToSceneTranslation,
        microphoneInProductionTranslation,
        setMicrophoneInProductionTranslation,
        manageTheaterProductionsTranslate,
        setManageTheaterProductionsTranslate,
        editTranslation,
        setEditTranslation,
        newProductionTranslation,
        setNewProductionTranslation,
        addProductionTranlation,
        setAddProductionTranslation,
        deleteTranslation,
        setDeleteTranslation,
        productionNameTranslation,
        setProductionNameTranslation,
        saveProductionTranslation,
        setSaveProductionTranslation,
        cancelEditTranslation,
        setCancelEditTranslation
    }}
    >
        {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);