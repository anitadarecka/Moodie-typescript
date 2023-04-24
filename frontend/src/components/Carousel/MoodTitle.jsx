import PropTypes from "prop-types";

const MoodTitle = ({ mood, color }) => {
  return <h1 style={{ color: `${color}` }}>{mood}</h1>;
};

MoodTitle.propTypes = {
  mood: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default MoodTitle;
