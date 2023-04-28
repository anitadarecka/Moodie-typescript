import React, { createContext, useContext, useState, ReactNode } from "react";
import PropTypes from "prop-types";

interface FavoritesContextType {
  favorites: number[];
  handleFavorites: (id: number) => void;
}

interface FavoritesProviderProps {
  children: ReactNode;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  handleFavorites: () => {},
});

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<number[]>([]);
  const handleFavorites = (id: number) => {
    setFavorites((prevFavorites) => {
      const i = prevFavorites.indexOf(id);
      if (prevFavorites.includes(id)) {
        prevFavorites.splice(i, 1);
        return [...prevFavorites];
      } else {
        return [...prevFavorites, id];
      }
    });
  };

  const contextValue = {
    favorites,
    handleFavorites,
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
}

FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useFavorites = () => useContext(FavoritesContext);
