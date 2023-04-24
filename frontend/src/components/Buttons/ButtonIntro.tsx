import React, { MouseEventHandler } from "react";
import PropTypes from "prop-types";

type ButtonProps = {
  mood: string;
  img: string;
  handleMoodChange: MouseEventHandler<HTMLInputElement>;
};

const ButtonIntro = ({ mood, img, handleMoodChange }: ButtonProps) => {
  return (
    <div>
      <input
        type="image"
        src={img}
        alt={mood}
        value={mood}
        onClick={handleMoodChange}
      />
      <h2>{mood}</h2>
    </div>
  );
};

ButtonIntro.propTypes = {
  handleMoodChange: PropTypes.func.isRequired,
  mood: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

export default ButtonIntro;
