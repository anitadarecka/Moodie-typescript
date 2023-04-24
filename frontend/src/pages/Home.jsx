import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/Navigation/NavBar";
import Genre from "../components/Genres/Genre";
import "./Home.css";
import SideBar from "../components/Navigation/SideBar";
import Carousel from "../components/Carousel/Carousel";
import Loading from "../components/Loading/Loading";
import PlaylistList from "../components/Playlists/PlaylistList";
import playlists from "../tools/playlists";
import Shuffle from "../tools/Shuffle";
import logomobile from "../assets/logo-mobile.png";
import MoodTitle from "../components/Carousel/MoodTitle";
import moods from "../tools/moods";
import { DescriptionProvider } from "../components/MovieDescription/DescriptionContext";
import { useFavorites } from "../components/Favorites/FavoritesContext";
import Favorites from "../components/Favorites/Favorites";
import BurgerMenuIcon from "../assets/burger-menu.png";

const Home = ({
  movieData,
  setMovieData,
  handleMoodChange,
  isLoading,
  setIsLoading,
  isFilter,
  setIsFilter,
  url,
  mood,
  setMood,
  API_KEY,
}) => {
  // get movieData
  useEffect(() => {
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => setMovieData(Shuffle(data.results)))
      .then(setTimeout(() => setIsLoading(false), 1000));
  }, [mood]);
  const { favorite } = useFavorites();
  const [favoritesData, setFavoritesData] = useState([]);
  useEffect(() => {
    if (favorite.length > 0) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${
            favorite[favorite.length - 1]
          }?api_key=${API_KEY}`
        )
        .then((response) => response.data)
        .then((data) => setFavoritesData([...favoritesData, data]));
    }
  }, [favorite]);
  const url2 = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
  const [genreList, setGenreList] = useState([]);
  const [genreId, setGenreId] = useState();
  const [genreName, setGenreName] = useState("");
  useEffect(() => {
    axios
      .get(url2)
      .then((response) => response.data)
      .then((data) => setGenreList(data.genres));
  }, []);
  const [showBurger, setShowBurger] = useState(false);
  return (
    <div className="home">
      {moods
        .filter((el) => el.mood === mood)
        .map((el) => (
          <svg
            key="doodle"
            id="doodle"
            width="379"
            height="298"
            viewBox="0 0 379 298"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M48.3419 151.502C63.8743 140.182 81.9873 133.397 101.366 131.87C155.109 127.638 186.869 162.961 212.388 191.348C239.483 221.483 252.708 233.245 274.741 228.034C303.97 221.121 310.546 196.768 318.56 142.84C326.81 87.2913 338.1 11.2017 432.659 0.709802C489.938 -5.65529 544.91 31.5443 552.676 81.9404C555.12 97.7482 543.471 112.425 526.636 114.71C509.813 116.995 494.194 106.048 491.762 90.2407C488.809 71.1104 463.6 55.5242 439.892 58.1471C396.781 62.9501 388.766 88.7252 379.536 150.849C371.844 202.586 362.279 266.983 289.778 284.143C228.293 298.68 191.93 258.228 165.381 228.687C142.579 203.332 127.543 187.874 106.514 189.517C91.4532 190.706 81.2553 200.138 75.3624 207.855C63.6014 223.231 58.7134 245.055 63.2044 262.156C67.2736 277.661 57.1874 293.329 40.6873 297.153C24.1871 300.976 7.51328 291.499 3.44406 275.994C-5.3767 242.385 3.03466 203.355 25.3657 174.118C32.1022 165.293 39.8437 157.727 48.3667 151.513L48.3419 151.502Z"
              fill={el.color}
            />
          </svg>
        ))}
      {/* NavBar droite */}
      <NavBar
        setMovieData={setMovieData}
        isFilter={isFilter}
        setIsFilter={setIsFilter}
        setMood={setMood}
      />
      <div
        className="side-bar"
        style={{ "--display-mobile": showBurger ? "block" : "none" }}
      >
        {genreList && (
          <SideBar
            handleMoodChange={handleMoodChange}
            mood={mood}
            genreList={genreList}
            setGenreId={setGenreId}
            setGenreName={setGenreName}
          />
        )}
      </div>
      <div className="side-bar-mobile">
        <input
          type="image"
          src={BurgerMenuIcon}
          alt="BurgerMenu button"
          onClick={() => setShowBurger(!showBurger)}
        />
        <div
          role="button"
          className="logo-mobile"
          onClick={() => {
            window.location.href = "http://localhost:3000";
          }}
          onKeyPress={() => {
            window.location.href = "http://localhost:3000";
          }}
          tabIndex="0"
        >
          <img src={logomobile} alt="logo-mobile" />
        </div>
      </div>
      <div className="content">
        {isLoading && <Loading />}
        {mood === "Favorites" && (
          <div className="genre-list">
            <Favorites favoritesData={favoritesData} />
          </div>
        )}
        {(mood === "Happy" ||
          mood === "Not My Day" ||
          mood === "Surprise Me" ||
          isFilter) && (
          <div>
            <div className="carousel">
              <div className="mood-title">
                {moods
                  .filter((el) => el.mood === mood)
                  .map((el) => (
                    <MoodTitle
                      key={el.key}
                      mood={el.mood}
                      color={el.isMood ? el.color : "black"}
                    />
                  ))}
              </div>
              {/* Carousel */}
              <DescriptionProvider>
                <Carousel mood={mood} carouselData={movieData} />
              </DescriptionProvider>
            </div>
            <hr />
            {/* Playlist List */}
            <div className="playlistList">
              {playlists
                .filter((el) => el.mood === mood)
                .map((playlist) => (
                  <PlaylistList
                    key={playlist.id}
                    name={playlist.name}
                    keywordslist={playlist.keywords}
                    mood={playlist.mood}
                    genrelist={playlist.genre}
                  />
                ))}
            </div>
          </div>
        )}
        {mood === "Genre" && (
          <div>
            {/* Display by Genre only */}
            <div className="genre-list">
              {genreId && (
                <Genre
                  genreId={genreId}
                  genreName={genreName}
                  API_KEY={API_KEY}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Home.propTypes = {
  movieData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      original_title: PropTypes.string.isRequired,
    })
  ).isRequired,
  setMovieData: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  mood: PropTypes.string.isRequired,
  handleMoodChange: PropTypes.func.isRequired,
  setMood: PropTypes.func.isRequired,
  isFilter: PropTypes.bool.isRequired,
  setIsFilter: PropTypes.func.isRequired,
  API_KEY: PropTypes.string.isRequired,
};

export default Home;
