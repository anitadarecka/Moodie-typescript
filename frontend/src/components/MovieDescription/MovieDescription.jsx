import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import ReactPlayer from "react-player";
import { useDescription } from "./DescriptionContext";
import "./MovieDescription.css";
import "./rating.css";
import play from "../../assets/play.png";
import { useFavorites } from "../Favorites/FavoritesContext";

const MovieDescription = ({ movieId }) => {
  const API_KEY = "fac24f9047cf7762d3a3976d29d6c169";
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,credits`;
  const [movieInfo, setMovieInfo] = useState();
  const { onChange } = useDescription();
  const { favorite, handleFavorites } = useFavorites();
  const isFavorite = favorite.includes(movieId);
  const [playVideo, setPlayVideo] = useState(false);
  useEffect(() => {
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => setMovieInfo(data));
  }, []);
  return (
    <>
      {movieInfo && (
        <div className="movie-description">
          <div className="movie-poster">
            <div
              className="poster"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w300${movieInfo.poster_path})`,
              }}
            />
            <input
              type="image"
              src={play}
              className="play-btn"
              alt="play"
              onClick={() => setPlayVideo(!playVideo)}
            />
          </div>
          <div
            role="button"
            className="xbutton"
            onClick={() => onChange(false)}
            onKeyPress={() => onChange(false)}
            tabIndex={0}
          >
            <input
              type="image"
              alt="close"
              className="delete"
              src="./src/assets/cancel.png"
            />
          </div>
          <div className="director">
            <h1>Director(s)</h1>
            {movieInfo.credits.crew
              .filter((el) => el.job === "Director")
              .map((el) => (
                <h2 key={el.id}>{el.name}</h2>
              ))}
          </div>
          <div className="note-user">
            <h1>
              Rating <br />
            </h1>
            <div
              className={`c100 p${Math.round(
                movieInfo.vote_average * 10
              )} small green`}
            >
              <span>{Math.round(movieInfo.vote_average * 10) / 10}</span>
              <div className="slice">
                <div className="bar" />
                <div className="fill" />
              </div>
            </div>
          </div>
          <div className="icons-description">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              type="button"
              className="favourite-button-description"
              style={{
                "--fill-color": isFavorite
                  ? "var(--corail-color)"
                  : "var(--text-color)",
              }}
              onClick={() => handleFavorites(movieId)}
            >
              <path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z" />
            </svg>
          </div>
          <div className="movie-info">
            <h1>
              {movieInfo.original_title} ({movieInfo.release_date.slice(0, 4)})
            </h1>
            <h2>
              {movieInfo.genres.map((el, index) =>
                index < movieInfo.genres.length - 1 ? `${el.name}, ` : el.name
              )}{" "}
              - {movieInfo.runtime} min
            </h2>
            <p>{movieInfo.overview}</p>
          </div>
        </div>
      )}
      {playVideo && (
        <div
          className="video-container"
          role="button"
          onClick={() => setPlayVideo(!playVideo)}
          onKeyPress={() => setPlayVideo(!playVideo)}
          tabIndex={0}
        >
          <div className="trailer">
            {movieInfo.videos.results
              .filter((el) => el.type === "Trailer")
              .map(
                (el, index) =>
                  index === 0 && (
                    <ReactPlayer
                      url={`https://www.youtube.com/watch?v=${el.key}`}
                      playing="true"
                      width="calc(1.5*640px)"
                      height="calc(1.5*360px)"
                    />
                  )
              )}
          </div>
        </div>
      )}
    </>
  );
};

MovieDescription.propTypes = {
  movieId: PropTypes.number.isRequired,
};

export default MovieDescription;
