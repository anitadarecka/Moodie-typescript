import React, { Dispatch, SetStateAction } from "react";
import PropTypes from "prop-types";
import "./SideBar.css";
import moods from "../../tools/moods";
import logo from "../../assets/logo.png";
import Button from "../Buttons/Button";

interface SideBarProps {
  mood: string;
  handleMoodChange: React.MouseEventHandler<HTMLLIElement | HTMLInputElement>;
  genreList: { id: number; name: string }[];
  setGenreId: Dispatch<SetStateAction<number>>;
  setGenreName: Dispatch<SetStateAction<string>>;
}
[];

interface GenreProps {
  id: number;
  name: string;
}

const SideBar = ({
  mood,
  handleMoodChange,
  genreList,
  setGenreId,
  setGenreName,
}: SideBarProps) => {
  const handleGenreChange = (
    e: React.MouseEvent<HTMLLIElement>,
    genre: GenreProps
  ) => {
    console.log(e);
    e.preventDefault();
    handleMoodChange(e);
    setGenreId(genre.id);
    setGenreName(genre.name);
  };
  return (
    <div className="sidebar">
      <div
        role="button"
        className="logo-desktop"
        onClick={() => {
          window.location.href = "http://localhost:3000";
        }}
        onKeyPress={() => {
          window.location.href = "http://localhost:3000";
        }}
        tabIndex={0}
      >
        <img src={logo} alt="logo-desktop" />
      </div>
      <ul>
        <div className="sidebar-items">
          <div className="favoris">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 30 30"
                className="favorite-icon"
              >
                <path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z" />
              </svg>
            </div>
            <li
              role="presentation"
              value="Favorites"
              onClick={handleMoodChange}
            >
              <h3>Favorites</h3>
            </li>
          </div>
          <div className="genres-menu">
            <h3>Genres</h3>
            <div className="genres">
              <ul>
                {genreList.map((el, index) => (
                  <li
                    key={el.id}
                    role="presentation"
                    tabIndex={index}
                    value="Genre"
                    onClick={(e) => handleGenreChange(e, el)}
                  >
                    {el.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="moods-sidebar">
            <h3>Mood</h3>
            <div className="mood-btns">
              {moods
                .filter((el) => el.mood !== mood && el.isMood)
                .map((el) => (
                  <Button
                    key={el.key}
                    mood={el.mood}
                    img={el.img}
                    handleMoodChange={handleMoodChange}
                  />
                ))}
            </div>
          </div>
          <div className="footer-menu">
            <h3>© 2022 Moodie, Inc.</h3>
          </div>
        </div>
      </ul>
    </div>
  );
};

SideBar.propTypes = {
  handleMoodChange: PropTypes.func.isRequired,
  mood: PropTypes.string.isRequired,
  genreList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  setGenreId: PropTypes.func.isRequired,
  setGenreName: PropTypes.func.isRequired,
};

export default SideBar;
