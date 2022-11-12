import $api from './index'
import {addFileAction, setFilesAction} from "../store/fileReducer";

export function getFiles(dirId) {
    return async dispatch => {
        try {
            $api.get(`file${dirId ? '?parent=' + dirId : ''}`)
                .then(response => response.data)
                .then(data => dispatch(setFilesAction(data)))

        } catch (e) {
            console.log(e.response.data)
        }
    }
}

export function createDir(dirId, name) {
    return async dispatch => {
        try {
            $api.post(`file`, {
                name,
                parentId: dirId,
                type: 'dir'
            })
                .then(response => response.data)
                .then(data => dispatch(addFileAction(data)))

        } catch (e) {
            console.log(e.response.data)
        }
    }
}