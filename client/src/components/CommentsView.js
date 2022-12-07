import React, {useContext, useState} from "react";
import { GlobalStoreContext } from '../store'
import PropTypes from "prop-types";
import { Button } from '@mui/material';
import { Box } from "@mui/material";
import YouTube, { YouTubeProps } from 'react-youtube';
import TextField from "@mui/material/TextField";
import List from '@mui/material/List';
import CommentCard from "./CommentCard";

function CommentsView(props) {
    const { store } = useContext(GlobalStoreContext);
    const [textField, setText] = useState("");
    
    function handleKeyPress(event) {
        event.stopPropagation();
        if (event.code === 'Enter' && store.currentList) {
            store.postComment(textField);
            setText("");
        }
    }

    function handleSetText(event) {
        setText(event.target.value);
    }

    let commentCards = <div></div>
    if (store.currentList) {
        commentCards = 
        <div id='comment-cards'>
            <List>
            {
                store.currentList.comments.map((comment, index) => (
                    <CommentCard
                        id={'comment-card-' + (index)}
                        key={'comment-card-' + (index)}
                        index={index}
                        comment={comment}
                    />
                ))  
            }
            </List>  
        </div>
    }

    return ( 
        <div id="comments-viewer">
            <div id="comment-cards">{commentCards}</div>
            <div id="comment-buttons">
                <TextField fullWidth sx={{}} onKeyPress={handleKeyPress} onChange={handleSetText} value={textField} id="outlined-basic" placeholder="Comment" variant="outlined" size="small" margin="auto"/>
            </div>
        </div>
    );
}

export default CommentsView;
