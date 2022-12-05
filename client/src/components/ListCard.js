import { useContext, useState, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { BsChevronDoubleDown, BsChevronDoubleUp } from 'react-icons/bs';
import SongCard from './SongCard.js'
import List from '@mui/material/List';
import { Button } from '@mui/material';
import MUIEditSongModal from './MUIEditSongModal';
import MUIRemoveSongModal from './MUIRemoveSongModal';
import EditToolbar from './EditToolbar';

function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;

    let songModal = "";
    if (store.isEditSongModalOpen()) {
        songModal = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        songModal = <MUIRemoveSongModal />;
    }

    let edittoolbar = "";
    const editToolbar = (isPublished) => {
        if (store.currentList) {
            edittoolbar = <EditToolbar isPublished={isPublished}/>;
        }
        return edittoolbar;
    }

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }



    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            if (text !== "") {
                let id = event.target.id.substring("list-".length);
                store.changeListName(id, text);
            }
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    useEffect(() => {
        if (store.currentList && store.currentList._id !== idNamePair._id) {
            setExpanded(false)
        }
    });


    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }

    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

    let songCards = <div></div>
    if (store.currentList) {
        songCards = 
        <div id='song-cards'>
            <List>
            {
                store.currentList.songs.map((song, index) => (
                    <SongCard
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}
                    />
                ))  
            }
            </List>  
        </div>
    }



    function handlePlayFromBeginning(event, playlistId) {
        store.updateQueue(playlistId);
    }

    function handleLikes(event, playlistId) {
        event.stopPropagation();
        store.updateLikesPlaylist(playlistId, true);
    }

    function handleDislikes(event, playlistId) {
        event.stopPropagation();
        store.updateLikesPlaylist(playlistId, false);
    }

    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            className={'list-card unselected-list-card'}
            sx={{p: 1 }}
            style={{ width: '98%', height: '3cm'}}
            onClick={(event) => {
                if (event.detail == 1) {
                    handlePlayFromBeginning(event, idNamePair._id);
                }
                else if (event.detail == 2) {
                    handleToggleEdit(event);
                }
            }}
        >
            <Box sx={{ position:'absolute', top: '0px', pt:1, pl:3, fontSize: '18pt'}}>{idNamePair.name}</Box>
            <div> <Box sx={{ position:'relative', fontSize: '9pt', pl:3}}>{"By: " + idNamePair.username}</Box> </div>
                       {/* <Box sx={{ p: 1 }}>
                            <IconButton onClick={(event) => {
                                    handleDeleteList(event, idNamePair._id)
                                }} aria-label='delete'>
                                <DeleteIcon style={{fontSize:'24pt'}} />
                            </IconButton>
                        </Box>  */}
            <Box sx={{ position: 'absolute', fontSize: '9pt', marginTop: '10%', marginLeft:'85%', p: 3}}> 
                <IconButton onClick={(event) => {
                    store.closeCurrentList();
                    event.stopPropagation();
                    setExpanded(true);
                    handleLoadList(event, idNamePair._id)
                }}><BsChevronDoubleDown/></IconButton> </Box>
        </ListItem>

    if (idNamePair.published) {
        cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            className={'list-card selected-list-card'}
            sx={{p: 1 }}
            style={{ width: '98%', height: '3cm'}}
            onClick={(event) => {
                if (event.detail == 1) {
                    handlePlayFromBeginning(event, idNamePair._id);
                }
                else if (event.detail == 2) {
                    handleToggleEdit(event);
                }
            }}
        >
            <Box sx={{ position:'absolute', top: '0px', pt:1, pl:3, fontSize: '18pt'}}>{idNamePair.name}</Box>
            <div> <Box sx={{ position:'relative', fontSize: '9pt', pl:3}}>{"By: " + idNamePair.username}</Box> </div>
                       {/* <Box sx={{ p: 1 }}>
                            <IconButton onClick={(event) => {
                                    handleDeleteList(event, idNamePair._id)
                                }} aria-label='delete'>
                                <DeleteIcon style={{fontSize:'24pt'}} />
                            </IconButton>
                        </Box>  */}
            <Box sx={{ position: 'absolute', fontSize: '9pt', marginTop: '10%', p: 3}}>{"Published: " + idNamePair.timestamp}</Box>
            <Box sx={{ position: 'absolute', fontSize: '9pt', marginTop: '10%', marginLeft:'56%', p: 3}}>{"Listens: " + idNamePair.listens}</Box>
            <Box sx={{ marginLeft:'40%'}}> 
                <IconButton 
                    onClick={(event) => {handleLikes(event, idNamePair._id)}}>
                <FaThumbsUp/></IconButton> 
            </Box>
            <Box sx={{ fontSize: '12pt', p:1}}>{idNamePair.likes}</Box>
            <Box sx={{ marginLeft:'10%'}}> 
                <IconButton
                    onClick={(event) => {handleDislikes(event, idNamePair._id)}}>
                <FaThumbsDown/></IconButton> 
            </Box>
            <Box sx={{ fontSize: '12pt', p:1}}>{idNamePair.dislikes}</Box>
            
            <Box sx={{ position: 'absolute', fontSize: '9pt', marginTop: '10%', marginLeft:'85%', p: 3}}> 
                <IconButton onClick={(event) => {
                    store.closeCurrentList();
                    event.stopPropagation();
                    setExpanded(true);
                    handleLoadList(event, idNamePair._id)
                }}><BsChevronDoubleDown/></IconButton> </Box>
        </ListItem>
        
        if (expanded && store.currentList) {
            cardElement =
            <ListItem
                id={idNamePair._id}
                key={idNamePair._id}
                className={"list-card selected-list-card"}
                sx={{p: 1 }}
                style={{ width: '98%', height: '13cm'}}
                onClick={(event) => {
                    if (event.detail == 2) {
                        handleToggleEdit(event)
                    }
                }}
            >
                <Box sx={{ position:'absolute', top: '0px', pt:1, pl:3, fontSize: '18pt'}}>{idNamePair.name}</Box>
                <Box maxWidth sx={{position: 'absolute', width:'80%', height: '65%', overflow:'auto', bottom:'7em'}}>
                    {songCards}
                </Box>
            
                {editToolbar(store.currentList.published)}

                <Box sx={{ position: 'absolute', fontSize: '9pt', marginTop: '60%', marginLeft:'85%', p: 3}}> 
                    <IconButton 
                    onClick={(event) => {
                        event.stopPropagation();
                        setExpanded(false);
                        store.closeCurrentList();
                    }}><BsChevronDoubleUp/></IconButton> </Box>
            </ListItem>
        }
    }
    else {
        if (expanded && store.currentList) {
            cardElement =
            <ListItem
                id={idNamePair._id}
                key={idNamePair._id}
                className={"list-card unselected-list-card"}
                sx={{p: 1 }}
                style={{ width: '98%', height: '13cm'}}
                onClick={(event) => {
                    if (event.detail == 2) {
                        handleToggleEdit(event)
                    }
                }}
            >
                <Box sx={{ position:'absolute', top: '0px', pt:1, pl:3, fontSize: '18pt'}}>{idNamePair.name}</Box>
                <Box maxWidth sx={{position: 'absolute', width:'80%', height: '65%', overflow:'auto', bottom:'7em'}}>
                    {songCards}
                </Box>
            
                {editToolbar(store.currentList.published)}
    
                <Box sx={{ position: 'absolute', fontSize: '9pt', marginTop: '60%', marginLeft:'85%', p: 3}}> 
                    <IconButton 
                    onClick={(event) => {
                        event.stopPropagation();
                        setExpanded(false);
                        store.closeCurrentList();
                    }}><BsChevronDoubleUp/></IconButton> </Box>
            </ListItem>
        }
    }
    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }



    return (
        cardElement
    );
}

export default ListCard;