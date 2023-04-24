import PropTypes from "prop-types";
import React, { MouseEventHandler } from "react";

type ButtonProps = {
  mood: string;
  img: string;
  handleMoodChange: MouseEventHandler<HTMLInputElement>;
};

const Button = ({ mood, img, handleMoodChange }: ButtonProps) => {
  return (
    <input
      type="image"
      src={img}
      alt={mood}
      value={mood}
      onClick={handleMoodChange}
    />
  );
};

Button.propTypes = {
  handleMoodChange: PropTypes.func.isRequired,
  mood: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

export default Button;
