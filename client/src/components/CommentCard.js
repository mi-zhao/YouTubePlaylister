import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'

function CommentCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { comment } = props;
    
    let cardClass = "comment-card";
    return (
        <div className={cardClass}>
            <Typography variant='h7'>{comment.username}</Typography>
            <Typography variant='body2'>{comment.comment}</Typography>
        </div>
    );
}

export default CommentCard;