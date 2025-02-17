import React, { createContext, useContext, useState } from "react";
import data from "./data";


const BookmarkContext = createContext();

export const useBookmarks = () => useContext(BookmarkContext);

export const BookmarkProvider = ({ children }) => {
  // Estado inicial basado en los datos originales
  const [bookmarkedData, setBookmarkedData] = useState(data);
  {/*
     const [bookmarkedData, setBookmarkedData] = useState(
    data.map(item => ({
      ...item,
      isBookmarked: item.isBookmarked || false
    }))
  );
    */}

  // Función para alternar el estado de marcado
  const toggleBookmark = (id) => {
    console.log(`Toggling bookmark for id: ${id}`);
    const updatedData = bookmarkedData.map((item) =>
      item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item
  );
  console.log("Updated Data: ", updatedData); // Verificar que los datos se actualizan correctamente

  setBookmarkedData([...updatedData]); // Ensure spread to create new reference
  };

  return (
    <BookmarkContext.Provider value={{ bookmarkedData, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};
   