import React, { useEffect, useState, useRef } from "react";
import "../App.css";
import { useBookmarks } from "../BookmarkContext"; // Importa el hook del contexto
import bookmarkFull from "../assets/icons/icon-bookmark-full.svg";
import bookmarkEmpty from "../assets/icons/icon-bookmark-empty.svg";
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate

function Home() {
  const { bookmarkedData, toggleBookmark } = useBookmarks(); // Obtengo los datos y la función para alternar el marcado desde el contexto
  const [filtered, setFiltered] = useState([]);
  const [searched, setSearched] = useState("");
  const navigate = useNavigate(); // Crea una instancia del navegado
  const horizontalScrollerRef = useRef(null);

  // Al montarse el componente o cambiar los datos, se actualiza el filtrado
  useEffect(() => {
    setFiltered(bookmarkedData);
  }, [bookmarkedData]);

  const handleInputChange = (e) => {
    const searched = e.target.value.toLowerCase();

    if (searched.length >= 2) {
      const result = bookmarkedData.filter((item) =>
        item.title.toLowerCase().includes(searched)
      );
      setFiltered(result);
      setSearched(searched);
    } else {
      setFiltered(bookmarkedData);
      setSearched(searched);
    }
  };

  const handleCardClick = (id) => {
    navigate(`/player/${id}`);
  };

  const handleBookmarkClick = (event, id) => {
    event.stopPropagation();
    toggleBookmark(id);
  };
  // Función para manejar el desplazamiento horizontal
  const handleScroll = (direction) => {
    if (horizontalScrollerRef.current) {
      const scrollAmount = 300;
      horizontalScrollerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <div className="contentContainer">
        <div className="moviesContainer">
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
              placeholder="Search for movies or TV series"
              value={searched}
              onChange={handleInputChange}
            />
          </div>
          <div className="tituloContainer">Trending</div>
          <div className="horizontal-scroller-container">
            <div className="horizontal-scroller" ref={horizontalScrollerRef}>
              {filtered.length > 0 &&
                filtered
                  .filter((movie) => movie.isTrending)
                  .map((movie, index) => (
                    <div className="big_cards" key={movie.id}>
                      <img
                        className="big_thumbnail"
                        src={movie.thumbnail.trending.large}
                        alt={movie.title}
                      />
                      <div
                        className="bigplay_card row"
                        onClick={() => handleCardClick(movie.id)}
                      >
                        {" "}
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
                      <div className="big_cardInfo">
                        <div className="innerMovieWrapper">
                          <span>{movie.year}</span>
                          <span>{movie.category}</span>
                          <span>{movie.rating}</span>
                        </div>
                      </div>
                      <div className="big_card_title">
                        <h2>{movie.title}</h2>
                      </div>
                      <div
                        className="bookmark_icon"
                        onClick={(event) =>
                          handleBookmarkClick(event, movie.id)
                        }
                      >
                        <img
                          className="bookmark_icon_svg"
                          src={
                            movie.isBookmarked ? bookmarkFull : bookmarkEmpty
                          }
                          alt="Bookmark"
                        />
                      </div>
                    </div>
                  ))}
            </div>
            <div className="navigation-buttons">
              <button
                className="nav-button"
                onClick={() => handleScroll("left")}
              >
                {"<"}
              </button>
              <button
                className="nav-button"
                onClick={() => handleScroll("right")}
              >
                {">"}
              </button>
            </div>
          </div>
          <div className="recommendationForYou">Recommended for you</div>
        </div>
        <div className="grid_container">
          {filtered.length > 0
            ? filtered
                .filter((item) => !item.isTrending)
                .map((movie) => (
                  <div
                    className="smallCard"
                    key={movie.id}
                    onClick={() => handleCardClick(movie.id)} // asocia la función de clic
                  >
                    <div className="smallCard_img">
                      <img
                        className="bg_smallCard_img"
                        src={movie.thumbnail.regular.small}
                        alt={movie.title}
                      />
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
                      <div
                        className="bookmark_icon"
                        onClick={(event) =>
                          handleBookmarkClick(event, movie.id)
                        }
                      >
                        <img
                          src={
                            movie.isBookmarked ? bookmarkFull : bookmarkEmpty
                          }
                          alt="Bookmark"
                        />
                      </div>
                    </div>
                    <div className="SmallCardInfo">
                      <div className="SmallCardInnerInfo">
                        <span>{movie.year}</span>
                        <span>{movie.category}</span>
                        <span>{movie.rating}</span>
                      </div>
                      <div className="SmallCardInfoTittle">
                        <h2>{movie.title}</h2>
                      </div>
                    </div>
                  </div>
                ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default Home;
