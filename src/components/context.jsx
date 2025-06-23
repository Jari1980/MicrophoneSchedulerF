import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const[dark, setDark] = useState("dark");
    const[bgColor, setBgColor] = useState(
      "linear-gradient(120deg,rgb(114, 119, 138),rgb(71, 97, 190) 50%,rgb(132, 142, 173))"
    );
    

  return (
    <GlobalContext.Provider
    value={{
        dark,
        setDark,
        bgColor,
        setBgColor
    }}
    >
        {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);