import $api from './index'
import {setFilesAction} from "../store/fileReducer";

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