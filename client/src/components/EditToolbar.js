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

    function handleAddNewSong(event) {
        event.stopPropagation();
        store.addNewSong();
    }
    function handleUndo(event) {
        event.stopPropagation();
        store.undo();
    }
    function handleRedo(event) {
        event.stopPropagation();
        store.redo();
    }
    function handleClose(event) {
        store.closeCurrentList();
    }

    function handlePublish() {
        store.publishPlaylist();
    }   

    function handleDuplicate() {
        store.duplicatePlaylist();
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
        
        <Button onClick={handlePublish}> Publish </Button>
        <Button onClick={handleDuplicate}> Duplicate </Button>
        </div>

    if (isPublished) {
        playlistButtons = 
            <Button onClick={handleDuplicate}>
                Duplicate
            </Button>
    }

    return (
        <div id="edit-toolbar">
            {playlistButtons}
        </div>
    )
}

export default EditToolbar;