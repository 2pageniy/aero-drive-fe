import React from 'react';
import cl from './File.module.scss'
import FolderIcon from '../../../../assets/img/folder-icon.png'
import FileIcon from '../../../../assets/img/file-icon.png'

const File = ({file}) => {
    const {name, size, type} = file;
    const date = file.createdAt.slice(0, 10)

    return (
        <div className={cl.file}>
            <img src={type === 'dir' ? FolderIcon : FileIcon} width='40px' alt="" className={cl.img}/>
            <div className={cl.name}>{name}</div>
            <div className={cl.date}>{date}</div>
            <div className={cl.size}>{size}</div>
        </div>
    );
};

export default File;