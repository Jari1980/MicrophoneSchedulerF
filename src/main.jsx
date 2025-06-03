import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./components/context.jsx";
import { CookiesProvider } from "react-cookie";
import NavBar from "./components/NavBar.jsx";
import LogIn from "./components/LogIn.jsx";
import TestUser from "./components/TestUser.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GlobalProvider>
      <CookiesProvider>
        <NavBar/>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/home" element={<App />} />
          <Route path="/testuser" element={<TestUser />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </CookiesProvider>
    </GlobalProvider>
  </BrowserRouter>
);
