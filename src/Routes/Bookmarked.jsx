import React, { useState, useEffect } from "react";
import "../App.css";
import { useBookmarks } from "../BookmarkContext";
import bookmarkFull from "../assets/icons/icon-bookmark-full.svg";
import bookmarkEmpty from "../assets/icons/icon-bookmark-empty.svg";

// Obtengo los datos y la función para alternar el marcado desde el contexto
function Bookmarked() {
  const { bookmarkedData, toggleBookmark } = useBookmarks();
  const [search, setSearch] = useState("");
  const [filteredBookmarked, setFilteredBookmarked] = useState([]);

  // Filtra los datos cuando cambian los datos marcados o la búsqueda
  useEffect(() => {
    console.log("bookmarkedData:", bookmarkedData); // Registro de los datos marcados
    setFilteredBookmarked(
      bookmarkedData.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) &&
          item.isBookmarked
      )
    );
  }, [search, bookmarkedData]);

  return (
    <main className="bookmarked-container">
      <div className="contentContainer">
        <section className="moviesContainer">
          <div className="searchbar">
            <div className="searchbarimg" alt="icon-search"></div>
            <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M27.613 25.72 23.08 21.2a10.56 10.56 0 0 0 2.253-6.533C25.333 8.776 20.558 4 14.667 4S4 8.776 4 14.667c0 5.89 4.776 10.666 10.667 10.666A10.56 10.56 0 0 0 21.2 23.08l4.52 4.533a1.333 1.333 0 0 0 1.893 0 1.333 1.333 0 0 0 0-1.893ZM6.667 14.667a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z"
                fill="#FFF"
              />
            </svg>
            <input
              id="input_home"
              className="luz"
              type="text"
              placeholder="Search for bookmarked shows"
              onChange={(event) => setSearch(event.target.value)}
              value={search}
            />
          </div>
          <div className="tituloContainerBookmarked">Bookmarked Movies</div>
          <div className="grid_container">
            {filteredBookmarked.length > 0 ? (
              filteredBookmarked.map((movie) => (
                <div className="smallCard" key={movie.id}>
                  <div className="smallCard_img">
                    <img
                      className="bg_smallCard_img"
                      src={movie.thumbnail.regular.small}
                      alt={movie.title}
                    />
                    <div
                      className="bookmark_icon"
                      onClick={() => toggleBookmark(movie.id)}
                    >
                      <img
                        src={
                          movie.isBookmarked ? bookmarkFull : bookmarkEmpty
                        }
                        alt="Bookmark"
                      />
                    </div>
                    <div className="play_card row">
                      <svg
                        className="play"
                        width="30"
                        height="30"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15 0C6.713 0 0 6.713 0 15c0 8.288 6.713 15 15 15 8.288 0 15-6.712 15-15 0-8.287-6.712-15-15-15Zm-3 21V8l9 6.5-9 6.5Z"
                          fill="#FFF"
                        />
                      </svg>
                      <p className="medium">Play</p>
                    </div>
                  </div>
                  <div className="SmallCardInfo">
                    <div className="SmallCardInnerInfo">
                      <span>{movie.year}</span>
                      <span>{movie.category}</span>
                      <span>{movie.rating}</span>
                    </div>
                    <div className="SmallCardInfoTitle">
                      <h2>{movie.title}</h2>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="no_results">No results found</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Bookmarked;


  