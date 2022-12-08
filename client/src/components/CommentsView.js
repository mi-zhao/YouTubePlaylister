import React, {useContext, useState} from "react";
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'
import TextField from "@mui/material/TextField";
import List from '@mui/material/List';
import CommentCard from "./CommentCard";

function CommentsView(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
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

    let commentbuttons = 
        <div id="comment-buttons">
            <TextField fullWidth sx={{}} onKeyPress={handleKeyPress} onChange={handleSetText} value={textField} id="outlined-basic" placeholder="Comment" variant="outlined" size="small" margin="auto"/>
        </div>
    if (auth.guest) {
        commentbuttons = <div></div>
    }

    return ( 
        <div id="comments-viewer">
            <div id="comment-cards">{commentCards}</div>
            {commentbuttons}
        </div>
    );
}

export default CommentsView;
