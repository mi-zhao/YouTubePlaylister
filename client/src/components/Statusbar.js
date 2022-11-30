import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'

import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    // let text ="";
    // if (store.currentList)
    //     text = store.currentList.name;

    function handleCreateNewList() {
        store.createNewList();
    }

    return (
        <div id="playlist-statusbar">
            {/* <Typography variant="h4">{text}</Typography> */}
            <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
                size="medium"
            >
                <AddIcon />
            </Fab>
                <Typography variant="h3">Your Lists</Typography>
        </div>
    );
}

export default Statusbar;