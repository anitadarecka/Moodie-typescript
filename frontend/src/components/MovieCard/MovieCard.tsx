import React from "react";
import PropTypes from "prop-types";
import "./MovieCard.css";
import play from "../../assets/play.png";
import MovieDescription from "../MovieDescription/MovieDescription";
import { useDescription } from "../MovieDescription/DescriptionContext";
import { useFavorites } from "../Favorites/FavoritesContext";

type MovieCardProps = {
  movieId: number;
  poster?: string;
  title: string;
  synopsis: string;
};

type StylesProps = {
  [key: string]: unknown;
};

const MovieCard = ({ movieId, poster, title, synopsis }: MovieCardProps) => {
  const { showDescription, setShowDescription } = useDescription();
  const { favorites, handleFavorites } = useFavorites();
  const isFavorite = favorites.includes(movieId);
  const styles: StylesProps = {
    "--fill-color": isFavorite ? "var(--corail-color)" : "var(--text-color)",
  };
  return (
    <div>
      <div
        className="movie-card"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w200${poster})`,
        }}
        role="button"
        tabIndex={0}
      >
        <div className="overlay">
          <div className="content-movie">
            <div className="title-movie">{title}</div>
            <div className="icons">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                type="button"
                className="favourite-button"
                style={styles}
                onClick={() => handleFavorites(movieId)}
              >
                <path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z" />
              </svg>
              <input
                className="add-button"
                type="image"
                src={play}
                alt="play icon"
                onClick={() => setShowDescription(true)}
              />
            </div>
            <div className="synopsis-movie">{synopsis}</div>
          </div>
        </div>
      </div>
      {showDescription && (
        <div className="movie-description-window">
          <MovieDescription movieId={movieId} />
        </div>
      )}
    </div>
  );
};

MovieCard.propTypes = {
  poster: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  synopsis: PropTypes.string.isRequired,
  movieId: PropTypes.number.isRequired,
};

export default MovieCard;
