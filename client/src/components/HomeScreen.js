import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import List from '@mui/material/List';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SortIcon from '@mui/icons-material/Sort';
import MUIEditSongModal from './MUIEditSongModal';
import MUIRemoveSongModal from './MUIRemoveSongModal';
import YouTubeViewer from './YouTubeViewer';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AuthContext from '../auth';

const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
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
        if (auth.guest) {
            store.getAllPlaylistPairs();
        }
        else {
            store.loadIdNamePairs();
        }
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
        store.loadIdNamePairs();
    }

    function handleSearchByName() {
        if (textField !== "") {
           store.searchAllUserPlaylists({name: textField});
            setText("");
        }
    }

    function handleSearchByUsers() {
        if (textField !== "") {
            store.searchAllUserPlaylists({username: textField});
            setText("");
        }
    }
    return (
        <div>
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
            
            <div id="navigate-toolbar">
                <IconButton disabled={auth.guest}>
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