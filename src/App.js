import React from "react";
//import React, { useCallback, useEffect, useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
//import data from "./data.js";
import NavBar from "./Routes/NavBar.jsx";

function App() {
  return (
    <div>
      <div className="main">
        <div className="navLinksContainer">
          <NavBar />
        </div>
        <div className="contentContainer">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
