import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import ManageProductionHome from "./ManageProductionHome";
import "./Dashboard.css";
import Scene from "./Scene";
import Character from "./Character";
import CharacterScene from "./CharacterScene";
import MicrophoneProduction from "./MicrophoneProduction";
import Microphone from "./Microphone";
import { useGlobalContext } from "./context";
import { useCookies } from "react-cookie";

const Dashboard = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const { bgColor, setBgColor } = useGlobalContext();
  const { bgColorDashboard, setBgColorDashboard } = useGlobalContext();
  const { dashboardText, setDashboardText } = useGlobalContext();
  const [cookies, setCookie] = useCookies(["jwtToken", "userName", "userRole"]);

  useEffect(() => {
    const handleToggle = () => {
      if (window.innerWidth < 550 && open) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", handleToggle);
    return () => window.removeEventListener("resize", handleToggle);
  }, [open]);

  return (
    <>
      <div style={{ display: "flex", height: "100%", paddingBottom: "120px" }}>
        <button className="dashboard-toggle" onClick={() => setOpen(!open)}>
          {/* Using Google icon for toggle */}
          <span className="material-symbols-outlined">
            {open ? "toggle_on" : "toggle_off"}
          </span>
        </button>
        <aside className={`aside ${open ? "aside-open" : "aside-closed"}`}>
          <Nav style={{ height: "100%", background: bgColorDashboard }}>
            <ul style={{ listStyle: "none", padding: 10 }}>
              {cookies.userRole == "ROLE_ADMINISTRATOR" || cookies.userRole == "ROLE_DIRECTOR" ? (
              <li>
                <button
                  className="btn btn-outline-primary w-100 mb-2"
                  style={{ color: dashboardText }}
                  onClick={() => navigate("../dashboard")}
                >
                  Theater Productions
                </button>
              </li>
              ) : "" }
              {cookies.userRole == "ROLE_ADMINISTRATOR" ? (
                <li>
                  <button
                    className="btn btn-outline-primary w-100 mb-2"
                    style={{ color: dashboardText }}
                    onClick={() => navigate("../dashboard/scene")}
                  >
                    Scene
                  </button>
                </li>
              ) : (
                ""
              )}
              {cookies.userRole == "ROLE_ADMINISTRATOR" ? (
              <li>
                <button
                  className="btn btn-outline-primary w-100 mb-2"
                  style={{ color: dashboardText }}
                  onClick={() => navigate("../dashboard/characterscene")}
                >
                  Character to Scene
                </button>
              </li>
              ) : ""}
              {cookies.userRole == "ROLE_ADMINISTRATOR" || cookies.userRole == "ROLE_DIRECTOR" ? (
              <li>
                <button
                  className="btn btn-outline-primary w-100 mb-2"
                  style={{ color: dashboardText }}
                  onClick={() => navigate("../dashboard/character")}
                >
                  Character
                </button>
              </li>
              ) : ""}
              {cookies.userRole == "ROLE_ADMINISTRATOR" || cookies.userRole == "ROLE_DIRECTOR" ? (
              <li>
                <button
                  className="btn btn-outline-primary w-100 mb-2"
                  style={{ color: dashboardText }}
                  onClick={() => navigate("../dashboard/microphoneProduction")}
                >
                  Microphone in Production
                </button>
              </li>
              ) : ""}
              {cookies.userRole == "ROLE_ADMINISTRATOR" ? (
              <li>
                <button
                  className="btn btn-outline-primary w-100 mb-2"
                  style={{ color: dashboardText }}
                  onClick={() => navigate("../dashboard/microphone")}
                >
                  Microphone
                </button>
              </li>
              ) : "" }
              <li>
                <button
                  className="btn btn-outline-primary w-100 mb-2"
                  style={{ color: dashboardText }}
                  disabled
                >
                  ...
                </button>
              </li>
            </ul>
          </Nav>
        </aside>
        <div
          style={{
            background: bgColor,
            width: "100vw",
            overflow: "hidden",
            marginLeft: "-2px",
          }}
        >
          <main style={{ flex: 2, padding: "16px", height: "100%" }}>
            <Routes>
              <Route path="/" element={<ManageProductionHome />} />
              <Route path="scene" element={<Scene />} />
              <Route path="character" element={<Character />} />
              <Route path="characterScene" element={<CharacterScene />} />
              <Route
                path="microphoneProduction"
                element={<MicrophoneProduction />}
              />
              <Route path="microphone" element={<Microphone />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
