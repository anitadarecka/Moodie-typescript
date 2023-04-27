import React from "react";
import PropTypes from "prop-types";

type MoodTitleProps = {
  mood: string;
  color: string;
};

const MoodTitle = ({ mood, color }: MoodTitleProps) => {
  return <h1 style={{ color: `${color}` }}>{mood}</h1>;
};

MoodTitle.propTypes = {
  mood: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default MoodTitle;
