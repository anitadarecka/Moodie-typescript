import React from 'react';
import PropTypes from "prop-types";
import MovieCard from "../MovieCard/MovieCard";
import { DescriptionProvider } from "../MovieDescription/DescriptionContext";

interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | any;
  budget: number;
  credits: {
    cast: Array<any>;
    crew: Array<any>;
  };
  genres: Array<{
    id: number;
    name: string;
  }>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<{
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }>;
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  videos: {
    results: Array<any>;
  };
  vote_average: number;
  vote_count: number;
}

type FavoritesProps = {
  favoritesData: Movie[]
}

const Favorites = ({ favoritesData }: FavoritesProps) => {
  return (
    <>
      {" "}
      <div className="genre-title">
        <h2>Favorites</h2>
      </div>
      <div className="movie-cards-favorites">
        {favoritesData.map((el) => (
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

Favorites.propTypes = {
  favoritesData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      original_title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Favorites;
