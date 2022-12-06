import React, {useContext, useState} from "react";
import { GlobalStoreContext } from '../store'
import PropTypes from "prop-types";
import { Button } from '@mui/material';
import { Box } from "@mui/material";
import YouTube, { YouTubeProps } from 'react-youtube';
import TextField from "@mui/material/TextField";

function CommentsView(props) {
    const { store } = useContext(GlobalStoreContext);
   
    return ( 
        <div id="comments-viewer">
            <div id="comment-buttons">
                <TextField fullWidth sx={{}} id="outlined-basic" label="Search" variant="outlined" size="small" margin="auto"/>
            </div>
        </div>
    );
}

export default CommentsView;
