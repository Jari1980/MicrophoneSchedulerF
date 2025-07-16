import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import Home from "./Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./components/context.jsx";
import { CookiesProvider } from "react-cookie";
import NavBar from "./components/NavBar.jsx";
import LogIn from "./components/LogIn.jsx";
import UserService from "./components/userService.jsx";
import Register from "./components/Register.jsx";
import Dashboard from "./components/Dashboard.jsx";
import ActorScenes from "./components/ActorScenes.jsx";
import Footer from "./components/Footer.jsx";
import About from "./components/About.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GlobalProvider>
      <CookiesProvider>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/userservice" element={<UserService />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/actorscenes" element={<ActorScenes />} />
          <Route path="about" element={<About />} />
        </Routes>
        {/*<Footer />*/}
      </CookiesProvider>
    </GlobalProvider>
  </BrowserRouter>
);
