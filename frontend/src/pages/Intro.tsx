import React from "react";
import PropTypes from "prop-types";
import ButtonIntro from "../components/Buttons/ButtonIntro";
import logo from "../assets/logo.png";
import "./Intro.css";
import moods from "../tools/moods";

type IntroProps = {
  handleMoodChange: React.MouseEventHandler<HTMLInputElement>;
};

const Intro = ({ handleMoodChange }: IntroProps) => {
  return (
    <div className="intro">
      <div className="headerintro">
        <img src={logo} alt="logo-desktop" id="logo-intro" />
      </div>
      <div className="title">
        <h1>How are you feeling today?</h1>
      </div>
      <div className="moodList">
        {moods
          .filter((el) => el.isMood)
          .map((el) => (
            <ButtonIntro
              key={el.key}
              mood={el.mood}
              img={el.img}
              handleMoodChange={handleMoodChange}
            />
          ))}
      </div>
    </div>
  );
};

Intro.propTypes = {
  handleMoodChange: PropTypes.func.isRequired,
};

export default Intro;
