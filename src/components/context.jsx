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
    const [manageActSceneTranslation, setManageActSceneTranslation] = useState("Manage Acts & Scenes")
    const [selectProductionTranslation, setSelectProductionTranslation] = useState("Select Production")
    const [productionTranslation, setProductionTranslation] = useState("Production")
    const [actNumberTranslation, setActNumberTranslation] = useState("Act Number")
    const [sceneNumberTranslation, setSceneNumberTranslation] = useState("Scene Number")
    const [sceneNameTranslation, setSceneNameTranslation] = useState("Scene Name")
    const [saveSceneTranslation, setSaveSceneTranslation] = useState("Save Scene")
    const [addActTranslation, setAddActTranslation] = useState("Add Act")
    const [numberOfScenesTranslation, setNumberOfScenesTranslation] = useState("Number of Scenes")
    const [numberOfScenesToAddTranslation, setNumberOfScenesToAddTranslation] = useState("Number of scenes to be added")
    const [manageCharacterToSceneTranslation, setManageCharacterToSceneTranslation] = useState("Manage Character to Scene")
    const [charactersTranslation, setCharactersTranslation] = useState("Characters")
    const [characterNameTranslation, setCharacterNameTranslation] = useState("Character Name")
    const [addCharacterTranslation, setAddCharacterTranslation] = useState("Add Character")
    const [addTranslation, setAddTranslation] = useState("Add")
    const [removeTranslation, setRemoveTranslation] = useState("Remove")
    const [cancelTranslation, setCancelTranslation] = useState("Cancel")
    const [selectTranslation, setSelectTranslation] = useState("Select")
    const [manageCharatersTranslation, setManageCharatersTranslation] = useState("Manage Characters")
    const [editActorTranslation, setEditActorTranslation] = useState("Edit Actor")
    const [createCharacterTranslation, setCreateCharacterTranslation] = useState("Create Character")
    const [enterCharacterNameTranslation, setEnterCharacterNameTranslation] = useState("Enter Character name")
    const [sceneInformationTranslation, setSceneInformationTranslation] = useState("Scene Information")
    const [scenesTranslation, setScenesTranslation] = useState("Scenes")
    const [hideSceneInfoTranslation, setHideSceneInfoTranslation] = useState("Hide Scene Info")
    const [manageMicrophoneInProductionTranslation, setManageMicrophoneInProductionTranslation] = useState("Manage Microphone in Production")
    const [scenesWithAssignedCharactersTranslation, setScenesWithAssignedCharactersTranslation] = useState("scenes with assigned characters")
    const [suggestMicrophoneScheduleTranslation, setSuggestMicrophoneScheduleTranslation] = useState("Suggest MicrophoneSchedule")
    const [applyTranslation, setApplyTranslation] = useState("Apply")
    const [loadPDFTranslation, setLoadPDFTranslation] = useState("Load PDF")
    const [hidePDFTranslation, setHidePDFTranslation] = useState("Hide PDF")
    const [suggestedScheduleTranslation, setSuggestedScheduleTranslation] = useState("Suggested Schedule")
    const [hideSuggestedTranslation, setHideSuggestedTranslation] = useState("Hide Suggested")
    const [microphonesTranslation, setMicrophonesTranslation] = useState("Microphones")
    const [nameTranslation, setNameTranslation] = useState("Name")
    const [renameTranslation, setRenameTranslation] = useState("Rename")
    const [enterMicrophoneName, setEnterMicrophoneName] = useState("Enter Microphone Name")
    

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
        setCancelEditTranslation,
        manageActSceneTranslation,
        setManageActSceneTranslation,
        selectProductionTranslation,
        setSelectProductionTranslation,
        productionTranslation,
        setProductionTranslation,
        actNumberTranslation,
        setActNumberTranslation,
        sceneNumberTranslation,
        setSceneNumberTranslation,
        sceneNameTranslation,
        setSceneNameTranslation,
        saveSceneTranslation,
        setSaveSceneTranslation,
        addActTranslation,
        setAddActTranslation,
        numberOfScenesTranslation,
        setNumberOfScenesTranslation,
        numberOfScenesToAddTranslation,
        setNumberOfScenesToAddTranslation,
        manageCharacterToSceneTranslation,
        setManageCharacterToSceneTranslation,
        charactersTranslation,
        setCharactersTranslation,
        characterNameTranslation,
        setCharacterNameTranslation,
        addCharacterTranslation,
        setAddCharacterTranslation,
        addTranslation,
        setAddTranslation,
        removeTranslation,
        setRemoveTranslation,
        cancelTranslation,
        setCancelTranslation,
        selectTranslation,
        setSelectTranslation,
        manageCharatersTranslation,
        setManageCharatersTranslation,
        editActorTranslation,
        setEditActorTranslation,
        createCharacterTranslation,
        setCreateCharacterTranslation,
        enterCharacterNameTranslation,
        setEnterCharacterNameTranslation,
        sceneInformationTranslation,
        setSceneInformationTranslation,
        scenesTranslation,
        setScenesTranslation,
        hideSceneInfoTranslation,
        setHideSceneInfoTranslation,
        manageMicrophoneInProductionTranslation,
        setManageMicrophoneInProductionTranslation,
        scenesWithAssignedCharactersTranslation,
        setScenesWithAssignedCharactersTranslation,
        suggestMicrophoneScheduleTranslation,
        setSuggestMicrophoneScheduleTranslation,
        applyTranslation,
        setApplyTranslation,
        loadPDFTranslation,
        setLoadPDFTranslation,
        hidePDFTranslation,
        setHidePDFTranslation,
        suggestedScheduleTranslation,
        setSuggestedScheduleTranslation,
        hideSuggestedTranslation,
        setHideSuggestedTranslation,
        microphonesTranslation,
        setMicrophonesTranslation,
        nameTranslation,
        setNameTranslation,
        renameTranslation,
        setRenameTranslation,
        enterMicrophoneName,
        setEnterMicrophoneName,
    }}
    >
        {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);