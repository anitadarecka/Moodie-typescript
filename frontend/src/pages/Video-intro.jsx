import React from "react";
import videointro from "../assets/videointro.mp4";
import "./Video-intro.css";

const Videointro = () => {
  return (
    <div className="video-content">
      <video className="videointro" src={videointro} autoPlay muted />
    </div>
  );
};

export default Videointro;
