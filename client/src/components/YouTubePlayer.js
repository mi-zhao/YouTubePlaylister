import React from "react";
import PropTypes from "prop-types";

const YouTubePlayer = ({ youTubeId }) => (
  <div className="youtube-player">
    <iframe
      width="450"
      height="255"
      src={`https://www.youtube.com/embed/${youTubeId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Youtube"
    />
  </div>
);

YouTubePlayer.propTypes = {
  youTubeId: PropTypes.string.isRequired
};

export default YouTubePlayer;
