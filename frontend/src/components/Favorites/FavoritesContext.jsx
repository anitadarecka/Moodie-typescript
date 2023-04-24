import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const FavoritesContext = createContext([]);

const useFavorites = () => {
  const { favoritesList, setFavoritesList } = useContext(FavoritesContext);
  const handleOnClick = (value) => {
    setFavoritesList([...favoritesList, value]);
  };
  return { favorite: favoritesList, handleFavorites: handleOnClick };
};

const FavoritesProvider = ({ children }) => {
  const [favoritesList, setFavoritesList] = useState([]);
  const value = useMemo(
    () => ({
      favoritesList,
      setFavoritesList,
    }),
    [favoritesList]
  );
  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { FavoritesProvider, useFavorites };
