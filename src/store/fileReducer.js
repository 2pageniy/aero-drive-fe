const SET_FILES = 'SET_FILES';
const SET_CURRENT_DIR = 'SET_CURRENT_DIR';
const ADD_FILE = 'ADD_FILE';
const SET_POPUP_DISPLAY = 'SET_POPUP_DISPLAY';
const PUSH_TO_STACK = 'PUSH_TO_STACK';
const DELETE_FILE = 'DELETE_FILE';
const SET_VIEW = 'SET_VIEW';
const SET_FAVORITE = 'SET_FAVORITE';
const SET_LINK = 'SET_LINK';

const initialState = {
    files: [],
    currentDir: null,
    popupDisplay: 'none',
    dirStack: [],
    view:  'list'
}

export default function fileReducer(state = initialState, action) {
    switch (action.type) {
        case SET_FILES:
            return {...state, files: action.payload}

        case SET_CURRENT_DIR:
            return {...state, currentDir: action.payload}

        case ADD_FILE:
            return {...state, files: [...state.files, action.payload]}

        case SET_POPUP_DISPLAY:
            return {...state, popupDisplay: action.payload}

        case PUSH_TO_STACK:
            return {...state, dirStack: [...state.dirStack, action.payload]}

        case DELETE_FILE:
            return {...state, files: [...state.files.filter(file => file.id !== action.payload)]}

        case SET_VIEW:
            return {...state, view: action.payload}

        case SET_FAVORITE:
            return {
                ...state,
                files: [...state.files.map((file) => {
                    if (file.id === action.payload) {
                        file.favorite = !file.favorite;
                    }
                    return file
                })]}
        case SET_LINK:
            return {...state, files: [...state.files.map((file => {
                    if (file.id !== action.payload.id) {
                        return file
                    } else {
                        file.access_link = action.payload.link;
                        return file
                    }
                }))]}

        default:
            return state;
    }
}

export const setFilesAction = (files) => ({type: SET_FILES, payload: files});
export const setCurrentDirAction = (dir) => ({type: SET_CURRENT_DIR, payload: dir});
export const addFileAction = (file) => ({type: ADD_FILE, payload: file});
export const setPopupDisplay = (display) => ({type: SET_POPUP_DISPLAY, payload: display});
export const pushToStackAction = (dir) => ({type: PUSH_TO_STACK, payload: dir});
export const deleteFileAction = (dirId) => ({type: DELETE_FILE, payload: dirId});
export const setFileViewAction = (payload) => ({type: SET_VIEW, payload});
export const setFavoriteAction = (id) => ({type: SET_FAVORITE, payload: id});
export const setNewLinkAction = (id, link) => ({type: SET_LINK, payload: {id, link}});