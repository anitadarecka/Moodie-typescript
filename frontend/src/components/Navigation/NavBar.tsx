import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./NavBar.css";
import actors from "../../tools/actors";
import search from "../../assets/search.png";
import user from "../../assets/user.png";
import bell from "../../assets/bell.png";
import Notification from "./Notification";

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

type NavBarProps = {
  setMovieData: Dispatch<SetStateAction<MovieData[]>>;
  setMood: Dispatch<SetStateAction<string>>;
  isFilter: boolean;
  setIsFilter: Dispatch<SetStateAction<boolean>>;
};

const NavBar = ({
  setMovieData,
  setMood,
  isFilter,
  setIsFilter,
}: NavBarProps) => {
  const [searchBarDisplay, setSearchBarDisplay] = useState(false);
  const handleSearchBarDisplay = () => {
    setSearchBarDisplay(!searchBarDisplay);
  };
  const [searchValue, setSearchValue] = useState("");
  const [notificationDisplay, setNotificationDisplay] = useState(false);
  const handleNotificationDisplay = () => {
    setNotificationDisplay(!notificationDisplay);
  };
  const [actorId, setActorId] = useState<number | null>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setIsFilter(true);
    setMood("Filter");
    actors
      .filter((el) => el.actorName.toLowerCase().includes(searchValue))
      .map((el) => setActorId(el.id));
  };
  const API_KEY = import.meta.env.VITE_API_KEY;
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_people=${actorId}&sort_by=vote_count.desc`;
  useEffect(() => {
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => setMovieData(data.results));
  }, [actorId]);
  return (
    <div className="nav-bar">
      <div className="navBarItem">
        <div className="search-bar">
          {searchBarDisplay && (
            <input
              type="search"
              className="search-field"
              placeholder="Actor, actress, director..."
              title="Movie Search"
              value={isFilter ? searchValue : ""}
              onChange={handleChange}
            />
          )}
          <input
            className="imgSearch"
            type="image"
            src={search}
            alt="research button"
            onClick={handleSearchBarDisplay}
          />
        </div>
        <div className="notification-icon">
          <input
            className="imgNotification"
            type="image"
            src={bell}
            alt="notification"
            onClick={handleNotificationDisplay}
          />
          {!notificationDisplay && <div className="round" />}
          {notificationDisplay && <Notification />}
        </div>
        <input className="imgUser" type="image" src={user} alt="login" />
      </div>
    </div>
  );
};

NavBar.propTypes = {
  setMovieData: PropTypes.func.isRequired,
  setMood: PropTypes.func.isRequired,
  isFilter: PropTypes.bool.isRequired,
  setIsFilter: PropTypes.func.isRequired,
};

export default NavBar;
