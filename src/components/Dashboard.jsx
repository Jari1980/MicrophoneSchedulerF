import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import ManageProductionHome from './ManageProductionHome';

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <>
        <div style={{ display: "flex", height: "1200px"}}> 
        <aside
        style={{
        background: "gray",
          padding: "16px",
          borderRight: "1px solid #ddd",
        }}
      >
        <Nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <button
                className="btn btn-outline-primary w-100 mb-2"
                onClick={() => navigate("../dashboard")}
              >
                Theater Plays
              </button>
            </li>
            <li>
              <button
                className="btn btn-outline-primary w-100 mb-2"
                disabled
              >
                ...
              </button>
            </li>
            <li>
              <button
                className="btn btn-outline-primary w-100 mb-2"
                disabled
              >
                ...
              </button>
            </li>
            <li>
              <button
                className="btn btn-outline-primary w-100 mb-2"
                disabled
              >
                ..
              </button>
            </li>
            <li>
              <button
                className="btn btn-outline-primary w-100 mb-2"
                disabled
              >
                ...
              </button>
            </li>
            <li>
              <button
                className="btn btn-outline-primary w-100 mb-2"
                disabled
              >
                ...
              </button>
            </li>
            <li>
              <button
                className="btn btn-outline-primary w-100 mb-2"
                disabled
              >
                ...
              </button>
            </li>
          </ul>
        </Nav>
      </aside>
      <div style={{backgroundSize:"100%", width:"100vw", overflow: "hidden", marginLeft: "-2px"}}>
      <main style={{ flex:2, padding: "16px" }}>
        <Routes>
            <Route path='/' element={<ManageProductionHome/>}/>
        </Routes>
        </main>
        </div>
        </div>
        </>
    );
};

export default Dashboard;