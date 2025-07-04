import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
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
        setFooterLinkText
    }}
    >
        {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);