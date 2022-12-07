import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'

import Button from '@mui/material/Button';

import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Icon } from '@mui/material';
import { InputAdornment } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import YouTubePlayer from './YouTubePlayer';
import MUIEditSongModal from './MUIEditSongModal';
import MUIRemoveSongModal from './MUIRemoveSongModal';
import YouTubeViewer from './YouTubeViewer';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const [textField, setText] = useState("");

    let modalJSX = "";
    if(store.isEditSongModalOpen()){
        modalJSX = <MUIEditSongModal/>
    }
    if(store.isRemoveSongModalOpen()){
        modalJSX = <MUIRemoveSongModal/>
    }

    if(store.isDeleteListModalOpen()){
        modalJSX = <MUIDeleteModal/>
    }

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '100%', bgcolor: '#e6e6e6' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }

    function handleOpenMenu(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleCloseMenu(event) {
        setAnchorEl(null);
    }

    function handleSortByName() {
        store.sortByName();
    }

    function handleSortByPublished() {
        store.sortByPublished();
    }

    function handleSortByListens() {
        store.sortByListens();
    }
    
    function handleSortByLikes() {
        store.sortByLikes();
    }

    function handleSortByDislikes() {
        store.sortByDislikes();
    }

    const menuId = 'sort-menu';
    const sortMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleCloseMenu}
        >
            <MenuItem onClick={handleSortByName}>{"Name (A-Z)"}</MenuItem>
            <MenuItem onClick={handleSortByPublished}>{"Publish Date (Newest)"}</MenuItem>
            <MenuItem onClick={handleSortByListens}>{"Listens (High-Low)"}</MenuItem>
            <MenuItem onClick={handleSortByLikes}>{"Likes (High-Low)"}</MenuItem>
            <MenuItem onClick={handleSortByDislikes}>{"Dislikes (High-Low)"}</MenuItem>
        </Menu>
    );
    
    function handleSetText(event) {
        setText(event.target.value);
    }
    
    function handleSearchByHome() {
        if (textField == "") {
            store.loadIdNamePairs();
        }
        else {
            store.searchAllUserPlaylists({ownerPlaylist: textField});
        }
        setText("");
    }

    function handleSearchByName() {
        store.searchAllUserPlaylists({name: textField});
        setText("");
    }

    function handleSearchByUsers() {
        store.searchAllUserPlaylists({username: textField});
        setText("");
    }
    return (
        <div>
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
            
            <div id="navigate-toolbar">
                <IconButton>
                    <HomeIcon sx={{ fontSize: 40 }} onClick={handleSearchByHome}/>
                </IconButton>

                <IconButton>
                    <PeopleAltIcon sx={{ fontSize: 40 }} onClick={handleSearchByName}/>
                </IconButton>
                
                <IconButton>
                    <PersonIcon sx={{ fontSize: 40 }} onClick={handleSearchByUsers}/>
                </IconButton>
                
                <TextField fullWidth sx={{paddingY:1}} onChange={handleSetText} value={textField} id="outlined-basic" placeholder="Search" variant="outlined" size="small" margin="auto"/>
                <IconButton aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true" onClick={handleOpenMenu}>
                    <SortIcon sx={{ fontSize: 30, p:1}}/>Sort By
                </IconButton>
                {sortMenu}
            </div>

            <YouTubeViewer youTubeId={store.songInPlayer}/>
                
            {modalJSX}
        </div>)
}

export default HomeScreen;