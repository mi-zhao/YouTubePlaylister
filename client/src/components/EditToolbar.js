import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import CloseIcon from '@mui/icons-material/HighlightOff';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar(props) {
    const { store } = useContext(GlobalStoreContext);
    const { isPublished } = props;

    function handleAddNewSong() {
        store.addNewSong();
    }
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        store.closeCurrentList();
    }

    function handlePublish(event) {
        store.publishPlaylist();
    }   

    let playlistButtons = 
    <div>
        <Button
            disabled={!store.canAddNewSong()}
            id='add-song-button'
            onClick={handleAddNewSong}
            variant="contained">
            <AddIcon />
        </Button>
        <Button 
            disabled={!store.canUndo()}
            id='undo-button'
            onClick={handleUndo}
            variant="contained">
                <UndoIcon />
        </Button>
        <Button 
            disabled={!store.canRedo()}
            id='redo-button'
            onClick={handleRedo}
            variant="contained">
                <RedoIcon />
        </Button>
        <Button 
            disabled={!store.canClose()}
            id='close-button'
            onClick={handleClose}
            variant="contained">
                <CloseIcon />
        </Button>
        <Button onClick={handlePublish}>
            Publish
        </Button>
        <Button>
            Duplicate
        </Button>
    </div>

    if (isPublished) {
        playlistButtons = 
        <div>
            <Button>
                Duplicate
            </Button>
        </div>
    }

    return (
        <div id="edit-toolbar">
            {playlistButtons}
        </div>
    )
}

export default EditToolbar;