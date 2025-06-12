import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import ManageProductionHome from "./ManageProductionHome";
import "./Dashboard.css";
import Scene from "./Scene";
import Character from "./Character";
import CharacterScene from "./CharacterScene";

const Dashboard = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const handleToggle = () => {
        if(window.innerWidth < 550 && open) {
            setOpen(false)
        }
    }
    window.addEventListener("resize", handleToggle)
    return () => window.removeEventListener("resize", handleToggle)
  }, [open])

  return (
    <>
      <div style={{ display: "flex", height: "auto" }}>
        <button className="dashboard-toggle" onClick={() => setOpen(!open)}>
            {/* Using Google icon for toggle */}
          <span className="material-symbols-outlined">
            {open ? "toggle_on" : "toggle_off"}
          </span>
        </button>
        <aside
          className={`aside ${open ? "aside-open" : "aside-closed"}`}
        >
          <Nav>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <button
                  className="btn btn-outline-primary w-100 mb-2"
                  onClick={() => navigate("../dashboard")}
                >
                  Theater Productions
                </button>
              </li>
              <li>
                <button className="btn btn-outline-primary w-100 mb-2"
                onClick={() => navigate("../dashboard/scene")}
                >
                  Scene
                </button>
              </li>
              <li>
                <button className="btn btn-outline-primary w-100 mb-2"
                onClick={() => navigate("../dashboard/characterscene")}>
                  Character to Scene
                </button>
              </li>
              <li>
                <button className="btn btn-outline-primary w-100 mb-2"
                onClick={() => navigate("../dashboard/character")}>
                  Character
                </button>
              </li>
              <li>
                <button className="btn btn-outline-primary w-100 mb-2" disabled>
                  Microphone
                </button>
              </li>
              <li>
                <button className="btn btn-outline-primary w-100 mb-2" disabled>
                  ...
                </button>
              </li>
              <li>
                <button className="btn btn-outline-primary w-100 mb-2" disabled>
                  ...
                </button>
              </li>
            </ul>
          </Nav>
        </aside>
        <div
          style={{
            backgroundSize: "100%",
            width: "100vw",
            overflow: "hidden",
            marginLeft: "-2px",
          }}
        >
          <main style={{ flex: 2, padding: "16px" }}>
            <Routes>
              <Route path="/" element={<ManageProductionHome />} />
              <Route path="scene" element={<Scene />} />
              <Route path="character" element={<Character />} />
              <Route path="characterScene" element={<CharacterScene />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
