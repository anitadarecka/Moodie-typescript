import PropTypes from "prop-types";
import "./Carousel.css";
import "../../pages/Home.css";
import play from "../../assets/play.png";
import { useDescription } from "../MovieDescription/DescriptionContext";
import { useFavorites } from "../Favorites/FavoritesContext";

const CarouselCard = ({
  offset,
  transitionEnabled,
  poster,
  title,
  synopsis,
  movieId,
  setModalId,
}) => {
  const angle = offset < 0 ? 60 : -60;
  const { onChange } = useDescription();
  const { favorite, handleFavorites } = useFavorites();
  const isFavorite = favorite.includes(movieId);
  const handleShowModal = () => {
    setModalId(movieId);
    onChange(true);
  };
  return (
    <div
      role="button"
      className="carousel-card"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w300${poster})`,
        "--offset": offset,
        "--rotate": offset === 0 ? "0deg" : `${angle}deg`,
        "--zindex": offset < 0 ? offset : -offset,
        "--scale": offset === 0 ? "1" : "0.8",
        "--opacity": offset > 2 || offset < -2 ? 0 : 1,
        "--opacity-mobile": offset !== 0 && 0,
        "--transform-transition": transitionEnabled
          ? "transform 0.3s linear"
          : "",
      }}
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
              style={{
                "--fill-color": isFavorite
                  ? "var(--corail-color)"
                  : "var(--text-color)",
              }}
              onClick={() => handleFavorites(movieId)}
            >
              <path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z" />
            </svg>
            <input
              className="add-button"
              type="image"
              src={play}
              alt="play icon"
              onKeyPress={() => handleShowModal(movieId)}
              onClick={() => handleShowModal(movieId)}
            />
          </div>
          <div className="synopsis-movie">{synopsis}</div>
        </div>
      </div>
    </div>
  );
};

CarouselCard.propTypes = {
  offset: PropTypes.number.isRequired,
  transitionEnabled: PropTypes.bool.isRequired,
  poster: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  synopsis: PropTypes.string.isRequired,
  movieId: PropTypes.number.isRequired,
  setModalId: PropTypes.func.isRequired,
};

export default CarouselCard;
