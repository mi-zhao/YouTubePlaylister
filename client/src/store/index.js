import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import jsTPS from '../common/jsTPS'
import api from './store-request-api'
import CreateSong_Transaction from '../transactions/CreateSong_Transaction'
import MoveSong_Transaction from '../transactions/MoveSong_Transaction'
import RemoveSong_Transaction from '../transactions/RemoveSong_Transaction'
import UpdateSong_Transaction from '../transactions/UpdateSong_Transaction'
import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});
console.log("create GlobalStoreContext");

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    UPDATE_PLAYLIST: "UPDATE_PLAYLIST",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    EDIT_SONG: "EDIT_SONG",
    REMOVE_SONG: "REMOVE_SONG",
    HIDE_MODALS: "HIDE_MODALS",
    SET_QUEUE: "SET_QUEUE",
    EDITING_PLAYLIST: "EDITING_PLAYLIST",
    SET_SONG_TO_PLAY: "SET_SONG_TO_PLAY",
    SET_PLAYER_VIEW: "SET_PLAYER_VIEW",
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

const CurrentModal = {
    NONE : "NONE",
    DELETE_LIST : "DELETE_LIST",
    EDIT_SONG : "EDIT_SONG",
    REMOVE_SONG : "REMOVE_SONG"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        currentModal : CurrentModal.NONE,
        idNamePairs: [],
        currentList: null,
        currentSongIndex : -1,
        currentSong : null,
        newListCounter: 0,
        listNameActive: false,
        listIdMarkedForDeletion: null,
        listMarkedForDeletion: null,
        songInPlayer: null,
        queuedSongs: null,
        songNumber: 0,
        songNamePairs: [{
            title: '',
            artist: '',
            youTubeId: '',
        }],
        playlistName: null,
        commentsView: false,
    });
    const history = useHistory();

    console.log("inside useGlobalStore");

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);
    console.log("auth: " + auth);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.UPDATE_PLAYLIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    songInPlayer: store.songInPlayer,
                    queuedSongs: store.queuedSongs,
                    songNumber: store.songNumber,
                    songNamePairs: store.songNamePairs,
                    playlistName: store.playlistName,
                    commentsView: store.commentsView,
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    songInPlayer: store.songInPlayer,
                    queuedSongs: store.queuedSongs,
                    songNumber: store.songNumber,
                    songNamePairs: store.songNamePairs,
                    playlistName: store.playlistName,
                    commentsView: store.commentsView,
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {                
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    songInPlayer: store.songInPlayer,
                    queuedSongs: store.queuedSongs,
                    songNumber: store.songNumber,
                    songNamePairs: store.songNamePairs,
                    playlistName: store.playlistName,
                    commentsView: store.commentsView,
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    songInPlayer: store.songInPlayer,
                    queuedSongs: store.queuedSongs,
                    songNumber: store.songNumber,
                    songNamePairs: store.songNamePairs,
                    playlistName: store.playlistName,
                    commentsView: store.commentsView,
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    currentModal : CurrentModal.DELETE_LIST,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: payload.id,
                    listMarkedForDeletion: payload.playlist,
                    songInPlayer: store.songInPlayer,
                    queuedSongs: store.queuedSongs,
                    songNumber: store.songNumber,
                    songNamePairs: store.songNamePairs,
                    playlistName: store.playlistName,
                    commentsView: store.commentsView,
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    songInPlayer: store.songInPlayer,
                    queuedSongs: store.queuedSongs,
                    songNumber: store.songNumber,
                    songNamePairs: store.songNamePairs,
                    playlistName: store.playlistName,
                    commentsView: store.commentsView,
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    songInPlayer: store.songInPlayer,
                    queuedSongs: store.queuedSongs,
                    songNumber: store.songNumber,
                    songNamePairs: store.songNamePairs,
                    playlistName: store.playlistName,
                    commentsView: store.commentsView,
                });
            }
            // 
            case GlobalStoreActionType.EDIT_SONG: {
                return setStore({
                    currentModal : CurrentModal.EDIT_SONG,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    songInPlayer: store.songInPlayer,
                    queuedSongs: store.queuedSongs,
                    songNumber: store.songNumber,
                    songNamePairs: store.songNamePairs,
                    playlistName: store.playlistName,
                    commentsView: store.commentsView,
                });
            }
            case GlobalStoreActionType.REMOVE_SONG: {
                return setStore({
                    currentModal : CurrentModal.REMOVE_SONG,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    songInPlayer: store.songInPlayer,
                    queuedSongs: store.queuedSongs,
                    songNumber: store.songNumber,
                    songNamePairs: store.songNamePairs,
                    playlistName: store.playlistName,
                    commentsView: store.commentsView,
                });
            }
            case GlobalStoreActionType.HIDE_MODALS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    songInPlayer: store.songInPlayer,
                    queuedSongs: store.queuedSongs,
                    songNumber: store.songNumber,
                    songNamePairs: store.songNamePairs,
                    playlistName: store.playlistName,
                    commentsView: store.commentsView,
                });
            }
            case GlobalStoreActionType.SET_QUEUE: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.currentList,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    songInPlayer: payload.songInPlayer,
                    queuedSongs: payload.queue,
                    songNumber: payload.songNumberPlaying,
                    songNamePairs: payload.songNamePairs,
                    playlistName: payload.playlistName,
                    commentsView: store.commentsView,
                });
            }
            case GlobalStoreActionType.SET_SONG_TO_PLAY: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    songInPlayer: payload.songInPlayer,
                    queuedSongs: store.queuedSongs,
                    songNumber: payload.songIndex,
                    songNamePairs: store.songNamePairs,
                    playlistName: store.playlistName,
                    commentsView: store.commentsView,
                });
            }
            case GlobalStoreActionType.SET_PLAYER_VIEW: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    songInPlayer: store.songInPlayer,
                    queuedSongs: store.queuedSongs,
                    songNumber: store.songNumber,
                    songNamePairs: store.songNamePairs,
                    playlistName: store.playlistName,
                    commentsView: payload,
                });
            }
            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.UPDATE_PLAYLIST,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        tps.clearAllTransactions();
        history.push("/");
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;
        const response = await api.createPlaylist(newListName, [], auth.user.email, auth.user.username);
        console.log("createNewList response: " + response);
        if (response.status === 201) {
            tps.clearAllTransactions();
            let newList = response.data.playlist;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            });
            store.loadIdNamePairs();
            history.push("/");
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = function (id) {
        async function getListToDelete(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                    payload: {id: id, playlist: playlist}
                });
            }
        }
        getListToDelete(id);
    }
    store.unmarkListForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_LIST,
            payload: {}
        });
        store.hideModals();
    }
    store.deleteList = function (id) {
        async function processDelete(id) {
            let response = await api.deletePlaylistById(id);
            if (response.data.success) {
                store.loadIdNamePairs();
                history.push("/");
            }
        }
        processDelete(id);
    }

    store.deleteMarkedList = function() {
        store.deleteList(store.listIdMarkedForDeletion);
        store.unmarkListForDeletion();
    }
    // THIS FUNCTION SHOWS THE MODAL FOR PROMPTING THE USER
    // TO SEE IF THEY REALLY WANT TO DELETE THE LIST

    store.showEditSongModal = (songIndex, songToEdit) => {
        storeReducer({
            type: GlobalStoreActionType.EDIT_SONG,
            payload: {currentSongIndex: songIndex, currentSong: songToEdit}
        });        
    }
    store.showRemoveSongModal = (songIndex, songToRemove) => {
        console.log("songindex, ", songIndex, songToRemove)
        storeReducer({
            type: GlobalStoreActionType.REMOVE_SONG,
            payload: {currentSongIndex: songIndex, currentSong: songToRemove}
        });        
    }
    store.hideModals = () => {
        storeReducer({
            type: GlobalStoreActionType.HIDE_MODALS,
            payload: {}
        });    
    }
    store.isDeleteListModalOpen = () => {
        return store.currentModal === CurrentModal.DELETE_LIST;
    }
    store.isEditSongModalOpen = () => {
        return store.currentModal === CurrentModal.EDIT_SONG;
    }
    store.isRemoveSongModalOpen = () => {
        return store.currentModal === CurrentModal.REMOVE_SONG;
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                response = await api.updatePlaylistById(playlist._id, playlist);
                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                }
            }
        }
        asyncSetCurrentList(id);
    }

    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.addNewSong = function() {
        let index = this.getPlaylistSize();
        this.addCreateSongTransaction(index, "Untitled", "?", "dQw4w9WgXcQ");
    }
    // THIS FUNCTION CREATES A NEW SONG IN THE CURRENT LIST
    // USING THE PROVIDED DATA AND PUTS THIS SONG AT INDEX
    store.createSong = function(index, song) {
        let list = store.currentList;      
        list.songs.splice(index, 0, song);
        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION MOVES A SONG IN THE CURRENT LIST FROM
    // start TO end AND ADJUSTS ALL OTHER ITEMS ACCORDINGLY
    store.moveSong = function(start, end) {
        let list = store.currentList;

        // WE NEED TO UPDATE THE STATE FOR THE APP
        if (start < end) {
            let temp = list.songs[start];
            for (let i = start; i < end; i++) {
                list.songs[i] = list.songs[i + 1];
            }
            list.songs[end] = temp;
        }
        else if (start > end) {
            let temp = list.songs[start];
            for (let i = start; i > end; i--) {
                list.songs[i] = list.songs[i - 1];
            }
            list.songs[end] = temp;
        }

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION REMOVES THE SONG AT THE index LOCATION
    // FROM THE CURRENT LIST
    store.removeSong = function(index) {
        let list = store.currentList;      
        list.songs.splice(index, 1); 

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION UPDATES THE TEXT IN THE ITEM AT index TO text
    store.updateSong = function(index, songData) {
        let list = store.currentList;
        let song = list.songs[index];
        song.title = songData.title;
        song.artist = songData.artist;
        song.youTubeId = songData.youTubeId;

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    store.addNewSong = () => {
        let playlistSize = store.getPlaylistSize();
        store.addCreateSongTransaction(
            playlistSize, "Untitled", "?", "dQw4w9WgXcQ");
    }
    // THIS FUNCDTION ADDS A CreateSong_Transaction TO THE TRANSACTION STACK
    store.addCreateSongTransaction = (index, title, artist, youTubeId) => {
        // ADD A SONG ITEM AND ITS NUMBER
        let song = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        let transaction = new CreateSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }    
    store.addMoveSongTransaction = function (start, end) {
        let transaction = new MoveSong_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }
    // THIS FUNCTION ADDS A RemoveSong_Transaction TO THE TRANSACTION STACK
    store.addRemoveSongTransaction = () => {
        let index = store.currentSongIndex;
        let song = store.currentList.songs[index];
        let transaction = new RemoveSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }
    store.addUpdateSongTransaction = function (index, newSongData) {
        let song = store.currentList.songs[index];
        let oldSongData = {
            title: song.title,
            artist: song.artist,
            youTubeId: song.youTubeId
        };
        let transaction = new UpdateSong_Transaction(this, index, oldSongData, newSongData);        
        tps.addTransaction(transaction);
    }
    store.updateCurrentList = function() {
        async function asyncUpdateCurrentList() {
            const response = await api.updatePlaylistById(store.currentList._id, store.currentList);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: store.currentList
                });
            }
        }
        asyncUpdateCurrentList();
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }
    store.canAddNewSong = function() {
        return ((store.currentList !== null) && (store.currentModal === CurrentModal.NONE));
    }
    store.canUndo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToUndo() && (store.currentModal === CurrentModal.NONE));
    }
    store.canRedo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToRedo() && (store.currentModal === CurrentModal.NONE));
    }
    store.canClose = function() {
        return ((store.currentList !== null) && (store.currentModal === CurrentModal.NONE));
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    store.sortByName = function () {
        store.idNamePairs.sort(function(p1, p2){
            if (p1.name.toLowerCase() < p2.name.toLowerCase()) { 
                return -1; 
            }
            if (p1.name.toLowerCase() > p2.name.toLowerCase()) { 
                return 1; 
            }
            return 0;
        });
        history.push('/');
    }

    store.sortByPublished = function () {
        store.idNamePairs.sort(function (x, y) { 
            return new Date(y.date) - new Date(x.date);
        });
        history.push('/')
    }

    store.sortByListens = function () {
        store.idNamePairs.sort(function (x, y) {
            return y.listens - x.listens;
        });
        history.push('/');
    }
    store.sortByLikes = function () {
        store.idNamePairs.sort(function (x, y) {
            return y.likes - x.likes;
        });
        history.push('/');
    }
    store.sortByDislikes = function () {
        store.idNamePairs.sort(function (x, y) {
            return y.dislikes - x.dislikes;
        });
        history.push('/');
    }

    store.getAllPlaylistPairs = function () {
        async function getAllUsers() {
            let response = await api.getAllPlaylistPairs();
            if (response.data.success) {
                let idNamePairs = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: idNamePairs
                });
                history.push('/')
            }
        }
        getAllUsers()
    }

    store.updateQueue = function (id, songNum) {
        async function playFromBeginning(id, songNum) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                let urls = []
                let playingSong = null
                let index = 0
                if (songNum) {
                    index = songNum;
                }

                if (playlist.songs.length > 0) {
                    for (let i = 0; i < playlist.songs.length; i++) {
                        urls.push(playlist.songs[i].youTubeId)
                    }
                    playingSong = urls[index]
                }

                response = await api.updatePlaylistById(playlist._id, playlist);
                if (response.data.success) {
                    let updatedPairs = store.idNamePairs;
                    let playlistIndex = updatedPairs.findIndex((playlist) => playlist._id === id);
                    
                    if ((!store.currentList || (playlist._id !== store.currentList._id)) && playlist.songs.length !== 0) {
                        updatedPairs[playlistIndex].listens++;
                    }
                    
                    storeReducer({
                        type: GlobalStoreActionType.SET_QUEUE,
                        payload: {
                            currentList: playlist,
                            idNamePairs: updatedPairs,
                            queue: urls,
                            songNumberPlaying: index,
                            songInPlayer: playingSong,
                            songNamePairs: playlist.songs,
                            playlistName: playlist.name,
                        }
                    });
                }
            }
        }
        playFromBeginning(id, songNum);
    }

    store.playNextOrPrevSong = function (isNext) {
        let songIndex = store.songNumber;
        // console.log("songindex", songIndex)
        console.log("store songs", store.queuedSongs.length)
        if (isNext && songIndex < store.queuedSongs.length - 1) {
            songIndex++
        } else if (!isNext && songIndex > 0) {
            songIndex--
        }
        storeReducer({
            type: GlobalStoreActionType.SET_SONG_TO_PLAY,
            payload: {
                songIndex: songIndex,
                songInPlayer: store.queuedSongs[songIndex]
            }
        });
    }

    store.publishPlaylist = function() {
        let id = store.currentList._id
        async function setPublished(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.published = true;
                playlist.timestamp = new Date();
                async function updatePublishedPlaylist(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        response = await api.getPlaylistPairs(playlist._id, playlist);
                        if (response.data.success) {
                            storeReducer({
                                type: GlobalStoreActionType.UPDATE_PLAYLIST,
                                payload: {
                                    idNamePairs: response.data.idNamePairs,
                                    playlist: playlist
                                }
                            });
                            history.push("/")
                        }
                    }
                }
                updatePublishedPlaylist(playlist);
            }
        }
        setPublished(id);
    }

    store.duplicatePlaylist = function() {
        let playlist = store.currentList;
        async function createDuplicatePlaylist(playlist) {
            let response = await api.createPlaylist(playlist.name, playlist.songs, auth.user.email, auth.user.username);
            if (response.status === 201) {
                tps.clearAllTransactions();
                let newList = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.CREATE_NEW_LIST,
                    payload: newList
                });
                store.loadIdNamePairs();
                history.push("/");
            }
            else {
                console.log("Duplicate playlist was not created!");
            }
        }
        createDuplicatePlaylist(playlist);
    }

    store.updateLikesDislikes = function(id, newLike, newDislike){
        async function asyncUpdateRatings(id, newLike, newDislike){
            let response = await api.getPlaylistById(id);

            if (response.data.success) {
                let playlist = response.data.playlist;

                if (newLike) { 
                    playlist.likes.push({
                        username : auth.user.username
                    })
                }
                else if (!newLike) {
                    playlist.likes = playlist.likes.filter((user) => (user.username !== auth.user.username))
                }
                
                if (newDislike) {
                    playlist.dislikes.push({
                        username : auth.user.username
                    })
                }
                else if (!newDislike) {
                    playlist.dislikes = playlist.dislikes.filter((user) => (user.username !== auth.user.username))
                }
                
                response = await api.updatePlaylistById(id, playlist)
                if(response.data.success){
                    let newIdNamePairs = store.idNamePairs;
                    let index = newIdNamePairs.findIndex(pair => {return pair._id === playlist._id});

                    newIdNamePairs[index].likes = playlist.likes;
                    newIdNamePairs[index].dislikes = playlist.dislikes;
                    storeReducer({
                        type : GlobalStoreActionType.UPDATE_PLAYLIST,
                        payload : {
                            playlist : playlist,
                            idNamePairs : newIdNamePairs
                        }
                    })
                }
            }
        }
        asyncUpdateRatings(id, newLike, newDislike)
    }

    store.setCommentView = function (isCommentView) {
        if (isCommentView) {
            storeReducer({
                type: GlobalStoreActionType.SET_PLAYER_VIEW,
                payload: true
            });
        } else {
            storeReducer({
                type: GlobalStoreActionType.SET_PLAYER_VIEW,
                payload: false
            });
        }
    }

    store.postComment = function(textField) {
        let id = store.currentList._id
        async function setComment(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.comments.push({username: auth.user.username, comment: textField})

                async function updatePlaylist(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        storeReducer({
                            type: GlobalStoreActionType.UPDATE_PLAYLIST,
                            payload: {
                                idNamePairs: store.idNamePairs,
                                playlist: playlist
                            }
                        });
                        history.push("/")
                    }
                }
                updatePlaylist(playlist);
            }
        }
        setComment(id);
    }

    store.searchAllUserPlaylists = function(searchField) {
        async function loadPlaylists(searchField) {
            let response = await api.getAllPlaylistPairs();
            if (response.data.success) {
                let pairs = response.data.idNamePairs;
                let filteredSearch = "";
                // Search by playlist name
                if (searchField.name) {
                    filteredSearch = pairs.filter((playlist) => (playlist.name === searchField.name));
                }
                // Search by username
                else if (searchField.username) {
                    filteredSearch = pairs.filter((playlist) => (playlist.username === searchField.username));
                }
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: filteredSearch,
                });
                // history.push("/")
            }
        }
        loadPlaylists(searchField)
    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };