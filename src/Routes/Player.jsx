import React from "react";
import { useParams } from "react-router-dom";
import { useBookmarks } from '../BookmarkContext';

const Player = () => {
  const { id } = useParams();
  const { bookmarkedData } = useBookmarks();
 // Encuentra la película basada en el ID.
 const movie = bookmarkedData.find(item => item.id === Number(id));

 return (
   <div className="player-container">
     <h1 className="player-container_title">{movie ? movie.title : 'Loading...'}</h1> {/* Muestra el título o Loading... */}
     <video className="player-video" controls>
       <source src="path/to/your/video.mp4" type="video/mp4" />
       Your browser does not support the video tag.
     </video>
     <div className="player-controls">
       <button>Play</button>
       <button>Pause</button>
     </div>
   </div>
 );
};

export default Player;