import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";
import { DescriptionProvider } from "../MovieDescription/DescriptionContext";
import "./Genre.css";

type GenreProps = {
  genreId: number,
  genreName: string,
  API_KEY: string,
}

interface MovieData {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [number, number, number];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const Genre = ({ genreId, genreName, API_KEY }: GenreProps) => {
  const [genreMovieData, setGenreMovieData] = useState<MovieData[]>([]);
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
        {genreMovieData.map((el) =>
        (
          <DescriptionProvider key={el.id}>
            <MovieCard
              key={el.id}
              poster={el.poster_path}
              title={el.original_title}
              synopsis={el.overview}
              movieId={el.id}
            />
          </DescriptionProvider>
        )
        )}
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
