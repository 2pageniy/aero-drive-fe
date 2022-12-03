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

export function uploadFile(file, dirId) {
    return async dispatch => {
        try {
            const formData = new FormData();
            formData.append('file', file)
            if (dirId) {
                formData.append('parent', dirId)
            }
            console.log(file.size)
            $api.post(`file/upload`,
                formData,
                {
                    onUploadProgress: progressEvent => {
                        // counting the weight of the file
                        // const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                        const totalLength = file.size;
                        console.log('total', totalLength)
                        if (totalLength) {
                            let progress = Math.round((progressEvent.loaded * 100) / totalLength)
                            console.log(progress)
                        }
                    }
                }
            )
                .then(response => response.data)
                .then(data => dispatch(addFileAction(data)))

        } catch (e) {
            console.log(e.response.data)
        }
    }
}