import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Intro from "./pages/Intro";
import "./App.css";
import MovieFind from "./tools/MovieFind";
import Videointro from "./pages/Video-intro";
import { FavoritesProvider } from "./components/Favorites/FavoritesContext";

const App = () => {
  // api call, recupere la base de donnes
  const API_KEY: string = import.meta.env.VITE_API_KEY;
  const { genres } = MovieFind[0];
  const [genre, setGenre] = useState<number | null>();
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=true&page=1&with_original_language=en&with_genres=${genre}&with_watch_monetization_types=flatrate`;
  const [movieData, setMovieData] = useState([]);
  const [mood, setMood] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [displayVideo, setDisplayVideo] = useState(true);
  const [isFilter, setIsFilter] = useState(false);
  setTimeout(() => setDisplayVideo(false), 5000);
  const handleMoodChange = (event: React.MouseEvent<HTMLInputElement>) => {
    const newMood: string = event.currentTarget.value;
    console.log(newMood);
    setMood(newMood);
    setIsLoading(true);
    switch (newMood) {
      case "Happy":
        setIsFilter(false);
        genres
          ?.filter((el) => el.genre === "Comedy")
          .map((el) => setGenre(el.id));
        break;
      case "Not My Day":
        setIsFilter(false);
        genres
          ?.filter((el) => el.genre === "Drama")
          .map((el) => setGenre(el.id));
        break;
      case "Surprise Me":
        setIsFilter(false);
        setGenre(null);
        setMood("Surprise Me");
        break;
      case "Genre":
        setIsLoading(false);
        setIsFilter(false);
        setMood("Genre");
        break;
      case "Favorites":
        setIsLoading(false);
        setIsFilter(false);
        setMood("Favorites");
        break;
      default:
        setIsFilter(false);
        setGenre(null);
    }
  };
  return (
    <div className="App">
      {mood ? (
        <FavoritesProvider>
          <Home
            movieData={movieData}
            setMovieData={setMovieData}
            handleMoodChange={handleMoodChange}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            isFilter={isFilter}
            setIsFilter={setIsFilter}
            url={url}
            mood={mood}
            setMood={setMood}
            // genre={genre}
            API_KEY={API_KEY}
          />
        </FavoritesProvider>
      ) : (
        <>
          {/* <AnimatePresence>
            {displayVideo && (
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 2 } }}
              >
                <Videointro />{" "}
              </motion.div>
            )}
          </AnimatePresence> */}
          <Intro handleMoodChange={handleMoodChange} />
        </>
      )}
    </div>
  );
};

export default App;
