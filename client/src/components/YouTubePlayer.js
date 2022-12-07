import React, {useContext} from "react";
import { GlobalStoreContext } from '../store'
import PropTypes from "prop-types";
import { Button } from '@mui/material';
import { Box } from "@mui/material";
import YouTube, { YouTubeProps } from 'react-youtube';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import IconButton from '@mui/material/IconButton';

function YouTubePlayer(props) {
  const { store } = useContext(GlobalStoreContext);
  const { youTubeId } = props;

  let player = "";

  const onPlayerReady = (event) => {
      player = event.target;
  }

  const onPlayerStateChange = (event) => {
    // Handles when the video ends
    if (event.data === 0) {          
      nextSong();
    }
  }

  const pauseVideo = (event) => {
    if (store.currentList) {
      player.pauseVideo();
    }
  }

  const playVideo = (event) => {
    if (store.currentList) {
      player.playVideo();
    }
  }

  const nextSong = (event) => {
    if (store.currentList) {
      store.playNextOrPrevSong(true);
    }
  }

  const previousSong = (event) => {
    if (store.currentList) {
      store.playNextOrPrevSong(false);
    }
  }

  const opts = {
    height: '200',
    width: '390',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  let currentSong = store.songNamePairs[store.songNumber];
  return ( 
    <div id="player-workspace">
        {store.songInPlayer ? 
          <div>
            <YouTube id='youtube-player' videoId={youTubeId} opts={opts} onReady={onPlayerReady} onStateChange={onPlayerStateChange}/>
            <div id="youtube-text">
              <div>Playlist: {store.playlistName ? store.playlistName : 'Untitled'} </div>
              <div>Song #: {store.songNumber + 1} </div>
              <div>Title: {currentSong.title} </div>
              <div>Artist: {currentSong.artist} </div>
            </div>
          </div>
        : <div id="empty-player"></div>}

        <div id="youtube-player-buttons">
          <IconButton onClick={previousSong}> <SkipPreviousIcon/> </IconButton>
          <IconButton onClick={playVideo}> <PlayArrowIcon/> </IconButton>
          <IconButton onClick={pauseVideo}> <StopIcon/> </IconButton>
          <IconButton onClick={nextSong}> <SkipNextIcon/> </IconButton>
        </div>
    </div>
  
  );
}

export default YouTubePlayer;
