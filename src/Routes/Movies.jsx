import React, { useEffect, useState } from "react";
import "../App.css";
import { useBookmarks } from "../BookmarkContext";
import bookmarkFull from "../assets/icons/icon-bookmark-full.svg";
import bookmarkEmpty from "../assets/icons/icon-bookmark-empty.svg";
import { useNavigate } from "react-router-dom";

function Movies() {
  const { bookmarkedData, toggleBookmark } = useBookmarks();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Bookmarked Data: ", bookmarkedData); // Verificar que los datos están actualizados cada vez que cambian
  }, [bookmarkedData]);

  const dataMovies = bookmarkedData.filter((item) => item.category === "Movie");

  const filteredMovies = dataMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleCardClick = (id) => {
    navigate(`/player/${id}`);
  };

  const handleBookmarkClick = (event, id) => {
    event.stopPropagation();
    toggleBookmark(id);
  };

  return (
    <div id="App">
      <div className="main">
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
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <div className="recommendation">MOVIES</div>
          <div className="grid_container">
            {filteredMovies.length > 0
              ? filteredMovies.map((movie) => (
                  <div
                    className="smallCard"
                    key={movie.id}
                    onClick={() => handleCardClick(movie.id)}
                  >
                    <div className="smallCard_img">
                      <img
                        className="bg_smallCard_img"
                        src={movie.thumbnail.regular.small}
                        alt={movie.title}
                      />
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
                      <div className="SmallCardInfoTittle">
                        <h2>{movie.title}</h2>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>{" "}
      </div>
    </div>
  );
}

export default Movies;

{
  /*
Inicio con: Multiples estados(inecesarios), estado local, busqueda básica, sin integracion con Bokkmarks, estado separado/duplicados para array y objetos(no de data con filtros aún.)

function Allmovies() {
  //filtra elementos que tienen la propiedad "Allmovies"
  //y establece la variable Allmovies
  const [Allmovies, setAllmovies] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [AllmoviesArray, setAllmoviesArray] = useState([]);

  //para que no entre en loop infinito
  const dataAllmovies = data.filter((data) => data.category === "Movie");
  if (JSON.stringify(dataAllmovies) !== JSON.stringify(Allmovies)) {
    setAllmovies(dataAllmovies);
    console.log(dataAllmovies);
    
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMovies = AllmoviesArray.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  //filtra elementos que tienen la propiedad "AllmoviesFalse"como false
  //y establece la variable AllmoviesFalse
  const [AllmoviesFalse, setAllmoviesFalse] = useState({});
  const dataMovies = data.filter((data) => data.category === false);
  if (JSON.stringify(dataMovies) !== JSON.stringify(AllmoviesFalse)) {
    setAllmoviesFalse(dataMovies);
    
  }

  //convierto el objeto AllmoviesFalse en un array para iterarlo
  const AllmoviesFalseArray = Object.values(AllmoviesFalse);
  for (let i = 0; i < AllmoviesFalseArray.length; i++) {
    const peli = AllmoviesFalseArray[i];
    console.log(peli);
    console.log(peli.thumbnail.regular.small);
  }

  //convierto el objeto Allmovies en un array para iterarlo
  const AllmoviesArray = Object.values(Allmovies);
  for (let i = 0; i < AllmoviesArray.length; i++) {
    const peli = AllmoviesArray[i];
    console.log(peli);
    console.log(peli.thumbnail.regular.large);
  }


  useEffect(() => {
    console.log(Allmovies);
    console.log(AllmoviesArray);
  }, [Allmovies, AllmoviesArray, AllmoviesFalseArray]);


  return (
    <div>
      <div id="App">
        <div className="main">
          <NavBar>
            <div className="navLinksContainer"></div>
          </NavBar>

          <div className="moviesContainer">
            <div className="searchbar">
           <div className="searchbarimg" alt="icon-search"></div> 
              <svg width="70" height="60" xmlns="http://www.w3.org/2000/svg">
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
                onChange={handleSearch}

              ></input>
            </div>

            <div className="recommendation">MOVIES</div>
            <div className="grid_container">
              {filteredMovies.length > 0
                ? filteredMovies.map((peli, item) => (
                    <div className="smallCard" key={peli.id}>
                      <div className="smallCard_img">
                        <img
                          className="bg_smallCard_img"
                          src={peli.thumbnail.regular.small}
                          alt={peli.title}
                          key={peli.title}
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
                      </div>
                      <div className="SmallCardInfo">
                        <div className="SmallCardInnerInfo">
                          <span>{peli.year}</span>
                          <span>{peli.category}</span>
                          <span>{peli.rating}</span>
                        </div>
                        <div className="SmallCardInfoTittle">
                          <h2> {peli.title}</h2>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Allmovies;

 */
}
