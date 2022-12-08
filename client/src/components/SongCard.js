import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [ draggedTo, setDraggedTo ] = useState(0);
    const { song, index } = props;

    function handleDragStart(event) {
        event.dataTransfer.setData("song", index);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let targetIndex = index;
        let sourceIndex = Number(event.dataTransfer.getData("song"));
        setDraggedTo(false);

        // UPDATE THE LIST
        store.addMoveSongTransaction(sourceIndex, targetIndex);
    }
    function handleRemoveSong(event) {
        event.stopPropagation();
        store.showRemoveSongModal(index, song);
    }

    function handleEditSong(event) {
        event.stopPropagation();
        store.showEditSongModal(index, song);
    }
    function handleClick(event) {
        if (event.detail === 1) {
            event.stopPropagation();
            store.updateQueue(store.currentList._id, index);
        }
    }

    let removeSongButton = 
        <IconButton id={"remove-song-" + index} className="list-card-button" onClick={handleRemoveSong}>
            <ClearIcon/>
        </IconButton>

    let editSongButton =
        <IconButton id={"edit-song-" + index} className="list-card-button" onClick={handleEditSong}>
            <EditIcon/>
        </IconButton>
      
    let songCardClass = "song-card"

    if (store.currentList.published) {
        removeSongButton = <div></div>
        editSongButton = <div></div>
        songCardClass = "published-song-card";
    }    

    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={songCardClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
            onClick={handleClick}
        >
            <div id={'song-' + index + '-link'} className="song-link"> {index + 1}. {song.title} by {song.artist}</div>
            <div id="song-space">
            </div>
            {editSongButton}
            {removeSongButton}
        </div>
    );
}

export default SongCard;