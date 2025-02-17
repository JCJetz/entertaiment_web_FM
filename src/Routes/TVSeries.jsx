import React, { useEffect, useState } from "react";
import "../App.css";
import { useBookmarks } from "../BookmarkContext";
import bookmarkFull from "../assets/icons/icon-bookmark-full.svg";
import bookmarkEmpty from "../assets/icons/icon-bookmark-empty.svg";
import { useNavigate } from "react-router-dom";

function TVSeries() {
  const { bookmarkedData, toggleBookmark } = useBookmarks(); // Obtengo los datos y la función para alternar el marcado desde el contexto
  const [searchTerm, setSearchTerm] = useState(""); // Estado para almacenar el término de búsqueda
  const navigate = useNavigate();

  // Filtra las series de TV de los datos marcados con la categoría "TV Series"
  const dataTVSeries = bookmarkedData.filter(
    (item) => item.category === "TV Series"
  );

  // Filtra las series que coinciden con el término de búsqueda en el título
  const filteredSeries = dataTVSeries.filter((series) =>
    series.title.toLowerCase().includes(searchTerm.toLowerCase())
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
              placeholder="Search for TV series"
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <div className="recommendation">Series TV</div>
          <div className="grid_container">
            {filteredSeries.length > 0
              ? filteredSeries.map((series) => (
                  <div
                    className="smallCard"
                    key={series.id}
                    onClick={() => handleCardClick(series.id)}
                  >
                    {" "}
                    <div className="smallCard_img">
                      <img
                        className="bg_smallCard_img"
                        src={series.thumbnail.regular.small}
                        alt={series.title}
                      />
                      <div
                        className="bookmark_icon"
                        onClick={(event) =>
                          handleBookmarkClick(event, series.id)
                        }
                      >
                        <img
                          src={
                            series.isBookmarked ? bookmarkFull : bookmarkEmpty
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
                        <span>{series.year}</span>
                        <span>{series.category}</span>
                        <span>{series.rating}</span>
                      </div>
                      <div className="SmallCardInfoTittle">
                        <h2>{series.title}</h2>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TVSeries;

{
  /*  Inicio con: Manejoo estado local básico, filtrado simple, sin integracion con Bookmarks y busqueda básica.

// la función TVSeries renderiza la lista de series de TV
function TVSeries() {
  //estado inicial de la lista de series de TV y el término de búsqueda
  const [TVSeries, setTVSeries] = useState([]);

  //useEffect para filtrar las series de TV al cargar el componente
  useEffect(() => {
    setTVSeries(data.filter((data) => data.category === "TV Series"));
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <div id="App">
        <div className="main">
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
                onChange={(e) => setSearchTerm(e.target.value)}
              ></input>
            </div>
            <div className="recommendation">Series TV</div>
            <div className="grid_container">
              {TVSeries.filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (
                  val.title.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return val;
                }
              }).map((series, item) => (
                <div className="smallCard" key={series.id}>
                  <div className="smallCard_img">
                    <img
                      className="bg_smallCard_img"
                      src={series.thumbnail.regular.small}
                      alt={series.title}
                      key={series.title}
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
                      onClick={() => toggleBookmark(series.id)}
                    >
                      <img
                        src={series.isBookmarked ? bookmarkFull : bookmarkEmpty}
                        alt="Bookmark"
                      />
                    </div>

                  </div>
                  <div className="SmallCardInfo">
                    <div className="SmallCardInnerInfo">
                      <span>{series.year}</span>
                      <span>{series.category}</span>
                      <span>{series.rating}</span>
                    </div>
                    <div className="SmallCardInfoTittle">
                      <h2> {series.title}</h2>
                    </div>
                  </div>{" "}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TVSeries;

   */
}

//category": "TV Series
//const dataSeries = data.filter((data) => data.category === "TV Series");

{
  /*
function TVSeries() {
  
    //filtra elementos que tienen la propiedad "TVSeries"
    //y establece la variable TVSeries
    const [TVSeries, setTVSeries] = useState({});
    //para que no entre en loop infinito
    const dataSeries = data.filter((data) => data.category === "TV Series");
    if (JSON.stringify(dataSeries) !== JSON.stringify(TVSeries)) {
        setTVSeries(dataSeries);
        console.log(TVSeries);

    }
   
   //filtra elementos que tienen la propiedad "TVSeries"como false
    //y establece la variable TVSeriesFalse
    const [TVSeriesFalse, setTVSeriesFalse] = useState({});
    const dataSeriesFalse = data.filter((data) => data.category === false);
    if (JSON.stringify(dataSeriesFalse) !== JSON.stringify(TVSeriesFalse)) {
        setTVSeriesFalse(dataSeriesFalse);
    }
   

    //convierto el objeto TVSeriesFalse en un array para iterarlo
    const TVSeriesArrayFalse = Object.values(TVSeriesFalse);
    for (let i = 0; i < TVSeriesArrayFalse.length; i++) {
      const series = TVSeriesArrayFalse[i];
      console.log(series);
      console.log(series.thumbnail.regular.small);
    }
    
  
      //convierto el objeto TVSeries en un array para iterarlo
      const TVSeriesArray = Object.values(TVSeries);
      for (let i = 0; i < TVSeriesArray.length; i++) {
        const series = TVSeriesArray[i];
        console.log(series);
        console.log(series.thumbnail.regular.large);
      }
  
    useEffect(() => {
      console.log(TVSeries);
      console.log(TVSeriesArray);

    }, [TVSeries, TVSeriesArray]);
  
  
  
    
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
              ></input>
            </div>
           
           <div className="recommendation">Series TV</div>
            <div className="grid_container">
            {TVSeriesArray.length > 0
                ? TVSeriesArray.map((series, item) => (
              <div className="smallCard" key={series.id}>
                <div className="smallCard_img">
                <img
                    className="bg_smallCard_img"
                    src={series.thumbnail.regular.small}
                    alt={series.title}
                    key={series.title}
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
                    <span>{series.year}</span>
                    <span>{series.category}</span>
                    <span>{series.rating}</span>
                    </div> 
                    <div className="SmallCardInfoTittle">
                    <h2> {series.title}</h2>
                    </div> 
            
                    </div> 
            
              </div>    )): null }
            </div> 
          </div> 
        </div>
      </div>
    </div>
  );
}
export default TVSeries;


*/
}
