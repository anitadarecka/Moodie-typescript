import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CarouselCard from "./CarouselCard";
import moods from "../../tools/moods";
import arrow from "../../assets/arrow.svg";
import shufflebtn from "../../assets/aleatoire.png";
import "./Carousel.css";
import MovieDescription from "../MovieDescription/MovieDescription";
import { useDescription } from "../MovieDescription/DescriptionContext";

const Carousel = ({ mood, carouselData }) => {
  const { value } = useDescription();
  const [active, setActive] = useState(10);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const prev = () => {
    setActive((active + 1) % carouselData.length);
    if (active === carouselData.length - 1) {
      setTransitionEnabled(false);
    }
  };
  const next = () => {
    if (active === 0) {
      setActive(carouselData.length - 1);
      setTransitionEnabled(false);
    } else {
      setActive(active - 1);
    }
  };
  const shuffle = () => {
    const random = Math.floor(Math.random() * (carouselData.length - 0) + 0);
    setActive(random);
  };
  useEffect(() => {
    if (active === 0 || active === carouselData.length - 1) {
      setTransitionEnabled(true);
    }
  }, [active]);
  const [modalId, setModalId] = useState();
  return (
    <>
      <div className="carousel-content">
        {moods
          .filter((el) => el.mood === mood)
          .map((el) => (
            <input
              key={el.key}
              type="image"
              src={arrow}
              id={el.prev}
              alt={el.prev}
              className={`filter-${el.id}`}
              onClick={prev}
            />
          ))}
        <div className="carousel-cards">
          {/* add placeholder cards with index 0 & 1 */}
          {carouselData.length < 4 ||
            (active === carouselData.length - 2 &&
              carouselData.slice(0, 1).map((el, index) => {
                const offset = -index - 2;
                return (
                  <CarouselCard
                    key={el.id}
                    offset={offset}
                    poster={el.poster_path}
                    title={el.original_title}
                    synopsis={el.overview}
                    movieId={el.id}
                    setModalId={setModalId}
                    transitionEnabled={transitionEnabled}
                  />
                );
              }))}
          {carouselData.length < 4 ||
            (active === carouselData.length - 1 &&
              carouselData.slice(0, 2).map((el, index) => {
                const offset = -index - 1;
                return (
                  <CarouselCard
                    key={el.id}
                    offset={offset}
                    poster={el.poster_path}
                    title={el.original_title}
                    synopsis={el.overview}
                    movieId={el.id}
                    setModalId={setModalId}
                    transitionEnabled={transitionEnabled}
                  />
                );
              }))}
          {/* original cards */}
          {carouselData.map((el, index) => {
            const offset = (active - index) % carouselData.length;
            return (
              <CarouselCard
                key={el.id}
                offset={offset}
                transitionEnabled={transitionEnabled}
                poster={el.poster_path}
                title={el.original_title}
                synopsis={el.overview}
                movieId={el.id}
                setModalId={setModalId}
              />
            );
          })}
          {/* add placeholder cards with index 19 & 18 */}
          {carouselData.length < 4 ||
            ((active === 0 || 1 || carouselData.length - 1) &&
              carouselData
                .slice(carouselData.length - 3, carouselData.length)
                .reverse()
                .map((el, index) => {
                  const offset = active + index + 1;
                  return (
                    <CarouselCard
                      key={el.id}
                      offset={offset}
                      poster={el.poster_path}
                      title={el.original_title}
                      synopsis={el.overview}
                      movieId={el.id}
                      setModalId={setModalId}
                      transitionEnabled={transitionEnabled}
                    />
                  );
                }))}
        </div>
        {moods
          .filter((el) => el.mood === mood)
          .map((el) => (
            <input
              key={el.key}
              type="image"
              src={arrow}
              id={el.next}
              alt={el.next}
              className={`filter-${el.id}`}
              onClick={next}
            />
          ))}
      </div>
      {mood === "Surprise Me" && (
        <div className="shuffle-btn">
          <input
            type="image"
            src={shufflebtn}
            alt="shuffle"
            style={{ width: "50px" }}
            onClick={shuffle}
          />
        </div>
      )}
      {value && (
        <div className="movie-description-window">
          <MovieDescription movieId={modalId} />
        </div>
      )}
    </>
  );
};

Carousel.propTypes = {
  mood: PropTypes.string.isRequired,
  carouselData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      original_title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Carousel;
