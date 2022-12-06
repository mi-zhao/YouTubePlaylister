import React, {useContext, useState} from "react";
import { GlobalStoreContext } from '../store'
import PropTypes from "prop-types";
import { Button } from '@mui/material';
import { Box } from "@mui/material";
import YouTube, { YouTubeProps } from 'react-youtube';
import TextField from "@mui/material/TextField";

function CommentsView(props) {
    const { store } = useContext(GlobalStoreContext);
    const [textField, setText] = useState("");
    
    function handleKeyPress(event) {
        if (event.key === 'Enter' && store.currentList){
            store.postComment();
            setText("")
        }
    }

    function handleSetText(event) {
        setText(event.target.value);
    }

    return ( 
        <div id="comments-viewer">
            <div id="comment-buttons">
                <TextField fullWidth sx={{}} onKeyPress={handleKeyPress} onChange={handleSetText} value={textField} id="outlined-basic" placeholder="Comment" variant="outlined" size="small" margin="auto"/>
            </div>
        </div>
    );
}

export default CommentsView;
