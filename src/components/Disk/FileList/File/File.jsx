import React from 'react';
import cl from './File.module.scss'
import FolderIcon from '../../../../assets/img/folder-icon.png'
import FileIcon from '../../../../assets/img/file-icon.png'
import {useDispatch, useSelector} from "react-redux";
import {pushToStackAction, setCurrentDirAction} from "../../../../store/fileReducer";

const File = ({file}) => {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.file.currentDir);
    const {name, size, type} = file;
    const date = file.createdAt.slice(0, 10)

    function openHandler() {
        dispatch(pushToStackAction(currentDir))
        dispatch(setCurrentDirAction(file.id))
    }

    return (
        <div className={cl.file} onClick={ file.type === 'dir' ? () => openHandler() : ''}>
            <img src={type === 'dir' ? FolderIcon : FileIcon} width='40px' alt="" className={cl.img}/>
            <div className={cl.name}>{name}</div>
            <div className={cl.date}>{date}</div>
            <div className={cl.size}>{size}</div>
        </div>
    );
};

export default File;