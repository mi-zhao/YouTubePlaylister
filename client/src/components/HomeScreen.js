import React, { useContext, useEffect } from 'react'
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

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

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

    function handleCreateNewList() {
        store.createNewList();
    }
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
    return (
        <div>
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
            
            <div id="navigate-toolbar">
                <IconButton>
                    <HomeIcon sx={{ fontSize: 30 }}/>
                </IconButton>

                <IconButton>
                    <PeopleAltIcon sx={{ fontSize: 30 }}/>
                </IconButton>
                
                <IconButton>
                    <PersonIcon sx={{ fontSize: 30 }}/>
                </IconButton>
                
                <TextField  sx={{marginLeft:"2in", width:"35em"}} id="outlined-basic" label="Search" variant="outlined" size="small" margin="auto"/>
                <IconButton>
                    <SortIcon sx={{ p: 1 }}/>   
                </IconButton>
            </div>

            {/* <div id="youtube-viewer">  */}
                <YouTubeViewer youTubeId={store.songInPlayer}/>
            {/* </div> */}
            {modalJSX}
        </div>)
}

export default HomeScreen;