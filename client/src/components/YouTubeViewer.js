import React, {useContext, useState} from "react";
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
import YouTubePlayer from "./YouTubePlayer";
import CommentsView from "./CommentsView"

function YouTubeViewer(props) {
    const { store } = useContext(GlobalStoreContext);
    const { youTubeId } = props

   
    const handlePlayer = () => {
        store.setCommentView(false);
    }

    const handleComments = () => {
        store.setCommentView(true);
    }

    // {console.log("PLAYER", view)}
  
    return ( 
        <div id="youtube-viewer"> 
            <div>
                <Button variant="contained" sx={{}} onClick={handlePlayer}>Player</Button>
                <Button variant="contained" sx={{}} onClick={handleComments}>Comments</Button>                
            </div>
            
            {store.commentsView ? <CommentsView/> : <YouTubePlayer youTubeId={youTubeId}/>}
        </div>
    );
}

export default YouTubeViewer;
