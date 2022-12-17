import React from 'react';
import cl from './File.module.scss'
import FolderIcon from '../../../../assets/img/folder-icon.png'
import FileIcon from '../../../../assets/img/file-icon.png'
import {useDispatch, useSelector} from "react-redux";
import {pushToStackAction, setCurrentDirAction} from "../../../../store/fileReducer";
import {deleteFile, downloadFile} from "../../../../http/file";
import sizeFormat from "../../../../utils/sizeFormat";

const File = ({file}) => {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.file.currentDir);
    const {name, size, type} = file;
    const date = file.createdAt.slice(0, 10)
    const fileView = useSelector(state => state.file.view);

    function openHandler() {
        if (file.type === 'dir') {
            dispatch(pushToStackAction(currentDir))
            dispatch(setCurrentDirAction(file.id))
        }
    }

    function downloadClickHandler(e) {
        e.stopPropagation();
        downloadFile(file)
    }

    function deleteClickHandler(e) {
        e.stopPropagation();
        dispatch(deleteFile(file));
    }

    if (fileView === 'plate') {
        return (
            <div className={cl['file-plate']} onClick={() => openHandler(file)}>
                <img src={type === 'dir' ? FolderIcon : FileIcon} width='70px' alt="" className={cl.img}/>
                <div className={cl.name}>{name}</div>
                <div className={cl.btns}>
                    {file.type !== 'dir' &&
                        <button
                            className={cl.download}
                            onClick={downloadClickHandler}
                        >
                            Скачать
                        </button>
                    }
                    <button className={cl.delete} onClick={deleteClickHandler}>Удалить</button>
                </div>

            </div>
        )
    }

    if (fileView === 'list') {
        return (
            <div className={cl.file} onClick={() => openHandler(file)}>
                <img src={type === 'dir' ? FolderIcon : FileIcon} width='40px' alt="" className={cl.img}/>
                <div className={cl.name}>{name}</div>
                <div className={cl.date}>{date}</div>
                <div className={cl.size}>{sizeFormat(size)}</div>
                {file.type !== 'dir' &&
                    <button
                        className={cl.download}
                        onClick={downloadClickHandler}
                    >
                        Скачать
                    </button>
                }
                <button className={cl.delete} onClick={deleteClickHandler}>Удалить</button>
            </div>
        );
    }
};

export default File;