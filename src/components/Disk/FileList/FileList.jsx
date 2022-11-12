import React from 'react';
import cl from './FileList.module.scss'
import {useSelector} from "react-redux";
import File from "./File/File";

const FileList = () => {
    const files = useSelector(state => state.file.files);

    return (
        <div className={cl.file_list}>
            <div className={cl.header}>
                <div className={cl.name}>Название</div>
                <div className={cl.date}>Дата</div>
                <div className={cl.size}>Размер</div>
            </div>
            {files.map(file =>
                <File
                    file={file}
                    key={file.id}
                />
            )}
        </div>
    );
};

export default FileList;