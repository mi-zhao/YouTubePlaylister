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
    console.log("player", player)
    player.loadVideoById(store.songInPlayer);
  }

  const pauseVideo = (event) => {
    player.pauseVideo();
  }

  const playVideo = (event) => {
    player.playVideo();
  }

  const nextSong = (event) => {
    store.playNextOrPrevSong(true);
  }

  const previousSong = (event) => {
    store.playNextOrPrevSong(false);
  }

  const opts = {
    height: '255',
    width: '450',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return( 
    <div>
      <div>
        <Button variant="contained" sx={{ }}>Player</Button>
        <Button variant="contained" sx={{ }}>Comments</Button>
      </div>
        
      <div>
        <YouTube id='youtube-player' videoId={youTubeId} opts={opts} onReady={onPlayerReady} />

        <div id="youtube-text">
          <div>Playlist: </div>
          <div>Song #: </div>
          <div>Title: </div>
          <div>Artist: </div>
        </div>

        <div id="youtube-player-buttons">
        <IconButton onClick={previousSong}> <SkipPreviousIcon/> </IconButton>
        <IconButton onClick={playVideo}> <PlayArrowIcon/> </IconButton>
        <IconButton onClick={pauseVideo}> <StopIcon/> </IconButton>
        <IconButton onClick={nextSong}> <SkipNextIcon/> </IconButton>
        </div>
      </div>
     

    </div>
  
  );
}

export default YouTubePlayer;
