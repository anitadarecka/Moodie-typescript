import PropTypes from "prop-types";
import MovieCard from "../MovieCard/MovieCard";
import { DescriptionProvider } from "../MovieDescription/DescriptionContext";

const Favorites = ({ favoritesData }) => {
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
