import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    /*

    Exaxmples:

    const [background, setBackground] = useState("#212529");

    const [dark, setDark] = useState("dark");

    const [uppdateMeeting, setUppdateMeeting] = useState({
    uppdate: false,
    id: 0,
    title: "",
    date: "",
    time: "",
    level: "",
    participants: "",
    description: "",
  });

    */

  return (
    <GlobalContext.Provider
    value={{
        /*
        Example continue:

        background,
        setBackground,

        dark,
        setDark,

        uppdateMeeting,
        setUppdateMeeting,
        */
    }}
    >
        {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);