import $api from './index'
import {
    addFileAction,
    deleteFileAction,
    setFavoriteAction,
    setFilesAction,
    setNewLinkAction
} from "../store/fileReducer";
import {addUploadFileAction, changeUploadFileAction, showUploaderAction} from "../store/uploadReducer";
import {hideLoaderAction, showLoaderAction} from "../store/appReducer";

export function getFiles(dirId, sort) {
    return async dispatch => {
        try {
            dispatch(showLoaderAction())
            let url = 'file';
            if (dirId) {
                url = 'file?parent=' + dirId;
            }
            if (sort) {
                url = `file?sort=${sort}`;
            }
            if (sort && dirId) {
                url = `file?parent=${dirId}&sort=${sort}`;
            }

            $api.get(url)
                .then(response => response.data)
                .then(data => dispatch(setFilesAction(data)))
                .finally(() => dispatch(hideLoaderAction()));
        } catch (e) {
            console.log(e.response.data)
        } finally {
            dispatch(hideLoaderAction())
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
            const uploadFile = {name: file.name, progress: 0, id: Date.now()};
            dispatch(showUploaderAction());
            dispatch(addUploadFileAction(uploadFile));
            $api.post(`file/upload`,
                formData,
                {
                    onUploadProgress: (progressEvent) => {
                        const totalLength = progressEvent.total;
                        if (totalLength) {
                            uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                            dispatch(changeUploadFileAction(uploadFile));
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

export async function downloadFile(file) {
    const response = await fetch(`http://localhost:5000/api/file/download?id=${file.id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })

    if (response.status === 200) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
}

export function deleteFile(file) {
    return async dispatch => {
        try {
            const response = await $api.delete(`file/delete?id=${file.id}`);
            dispatch(deleteFileAction(file.id));
            alert(response.data.message)
        } catch (e) {
            console.log(e.response.data)
        }
    }
}

export function searchFiles(search) {
    return async dispatch => {
        try {
            const response = await $api.get(`file/search?search=${search}`);
            dispatch(setFilesAction(response.data));
        } catch (e) {
            console.log(e.response.data)
        }
    }
}

export function changeFavoriteFile(file) {
    return async dispatch => {
        try {
            await $api.patch(`file/favorite`, {file})
                .then((response) => {
                    dispatch(setFavoriteAction(file.id));
                }).catch(e => console.log(e));

        } catch (e) {
            console.log(e.response.data)
        }
    }
}

export function createCopyFile(file) {
    return async dispatch => {
        try {
            await $api.post(`file/copy`, {file})
                .then(response => response.data)
                .then(data => dispatch(addFileAction(data)))
                .catch(e => console.log(e));

        } catch (e) {
            console.log(e.response.data)
        }
    }
}

export async function readFile(file) {
    try {
        return await $api.post(`file/read`, {file})
            .then(response => response.data)
            .catch(e => console.log(e));

    } catch (e) {
        console.log(e.response.data)
    }
}

export async function getFileOnLink(link) {
    try {
        return await $api.get(`file/link${link}`)
            .catch(e => console.log(e));

    } catch (e) {
        console.log(e.response.data)
    }
}

export function createLinkOnFile(file) {
    return async dispatch => {
        try {
            return await $api.patch(`file/link`, {file})
                .then((response) => response.data)
                .then(data => dispatch(setNewLinkAction(file.id, data.link)))
                .catch(e => console.log(e));

        } catch (e) {
            console.log(e.response.data)
        }
    }
}