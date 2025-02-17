import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.js";
import Movies from "./Routes/Movies.jsx";
import NavBar from "./Routes/NavBar.jsx";
import TVSeries from "./Routes/TVSeries.jsx";
import Bookmarked from "./Routes/Bookmarked.jsx";
import Player from "./Routes/Player";
import Home from "./Routes/Home.jsx"; // Home contendrá Trending y Recommended
import { BookmarkProvider } from "./BookmarkContext.js"; // Proveedor del contexto

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
      <BookmarkProvider>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} /> 
        <Route path="movies" element={<Movies />} />
        <Route path="tvseries" element={<TVSeries />} />
        <Route path="bookmarked" element={<Bookmarked />} />
        <Route path="player/:id" element={<Player />} />
      </Route>
    </Routes>
    </BookmarkProvider>
  </BrowserRouter>
);
