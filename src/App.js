import React from "react";
//import React, { useCallback, useEffect, useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
//import data from "./data.js";
import NavBar from "./Routes/NavBar.jsx";

function App() {
  return (
    <div className="app-wrapper">
      <header className="sr-only">
        <h1>Entertainment Web App</h1>
      </header>
      <nav className="navLinksContainer" aria-label="Main navigation">
        <NavBar />
      </nav>
      <main className="main">
        <div className="contentContainer">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default App;
