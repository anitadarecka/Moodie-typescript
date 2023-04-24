import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";
import { DescriptionProvider } from "../MovieDescription/DescriptionContext";
import "./Genre.css";

const Genre = ({ genreId, genreName, API_KEY }) => {
  const [genreMovieData, setGenreMovieData] = useState([]);
  const url3 = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=true&page=1&with_original_language=en&with_genres=${genreId}`;
  useEffect(() => {
    axios
      .get(url3)
      .then((response) => response.data)
      .then((data) => setGenreMovieData(data.results));
  }, [genreId]);
  return (
    <>
      <div className="genre-title">
        <h2>{genreName}</h2>
      </div>
      <div className="movie-cards">
        {genreMovieData.map((el) => (
          <DescriptionProvider key={el.id}>
            <MovieCard
              key={el.id}
              poster={el.poster_path}
              title={el.original_title}
              synopsis={el.overview}
              movieId={el.id}
            />
          </DescriptionProvider>
        ))}
      </div>
    </>
  );
};

Genre.propTypes = {
  genreId: PropTypes.number.isRequired,
  genreName: PropTypes.string.isRequired,
  API_KEY: PropTypes.string.isRequired,
};

export default Genre;
