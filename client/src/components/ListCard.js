import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { BsChevronDoubleDown, BsChevronDoubleUp } from 'react-icons/bs';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [editPlaylistActive, setEditPlaylistActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;

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

    function toggleEditPlaylist(event) {
        let active = !editPlaylistActive;
        // if (newActive) {
        //     store.setIsListNameEditActive();
        // }
        setEditPlaylistActive(active);
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }
    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            className={"list-card unselected-list-card"}
            sx={{p: 1 }}
            style={{ width: '98%', height: '3cm'}}
            onClick={(event) => {
                if (event.detail == 2) {
                    handleToggleEdit(event)
                }
            }}
        >
            
            {/* <Box sx={{ p: 1 }}>
                <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                    <DeleteIcon style={{fontSize:'24pt'}} />
                </IconButton>
            </Box>  */}
            <Box sx={{ position:'absolute', top: '0px', pt:1, pl:3, fontSize: '18pt'}}>{idNamePair.name}</Box>
            <Box sx={{ position:'flex', fontSize: '9pt', p: 3}}>{"By: " + idNamePair.username}</Box> 
            <Box sx={{ position: 'absolute', fontSize: '9pt', marginTop: '10%', p: 3}}>{"Published: " + idNamePair.timestamp}</Box>
            
            <Box sx={{ position: 'absolute', fontSize: '9pt', marginTop: '10%', marginLeft:'56%', p: 3}}>{"Listens: " + idNamePair.listens}</Box>
            <Box sx={{ marginLeft:'40%'}}> <IconButton><FaThumbsUp/></IconButton> </Box>
            <Box sx={{ fontSize: '12pt', p:1}}>{idNamePair.likes}</Box>
            <Box sx={{ marginLeft:'10%'}}> <IconButton><FaThumbsDown/></IconButton> </Box>
            <Box sx={{ fontSize: '12pt', p:1}}>{idNamePair.dislikes}</Box>
            
            <Box sx={{ position: 'absolute', fontSize: '9pt', marginTop: '10%', marginLeft:'85%', p: 3}}> <IconButton onClick={(event) => {toggleEditPlaylist(event)}}><BsChevronDoubleDown/></IconButton> </Box>
        </ListItem>
    
    if (editPlaylistActive) {
        cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            className={"list-card unselected-list-card"}
            sx={{p: 1 }}
            style={{ width: '98%', height: '10cm'}}
            onClick={(event) => {
                if (event.detail == 2) {
                    handleToggleEdit(event)
                }
            }}
        >
            <Box sx={{ position:'absolute', top: '0px', pt:1, pl:3, fontSize: '18pt'}}>{idNamePair.name}</Box>
            <Box sx={{ position:'flex', fontSize: '9pt', p: 3, marginTop:'35%'}}>{"By: " + idNamePair.username}</Box> 
            <Box sx={{ position: 'absolute', fontSize: '9pt', marginTop: '45%', p: 3}}>{"Published: " + idNamePair.timestamp}</Box>
            
            <Box sx={{ position: 'absolute', fontSize: '9pt', marginTop: '45%', marginLeft:'56%', p: 3}}>{"Listens: " + idNamePair.listens}</Box>
            <Box sx={{ marginLeft:'40%', marginTop:'35%'}}> <IconButton><FaThumbsUp/></IconButton> </Box>
            <Box sx={{ fontSize: '12pt', p:1, marginTop:'35%'}}>{idNamePair.likes}</Box>
            <Box sx={{ marginLeft:'10%', marginTop:'35%'}}> <IconButton><FaThumbsDown/></IconButton> </Box>
            <Box sx={{ fontSize: '12pt', p:1, marginTop:'35%'}}>{idNamePair.dislikes}</Box>
            
            <Box sx={{ position: 'absolute', fontSize: '9pt', marginTop: '45%', marginLeft:'85%', p: 3}}> <IconButton onClick={(event) => {toggleEditPlaylist(event)}}><BsChevronDoubleUp/></IconButton> </Box>
        </ListItem>
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