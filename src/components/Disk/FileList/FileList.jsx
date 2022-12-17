import React from 'react';
import cl from './FileList.module.scss'
import {useSelector} from "react-redux";
import File from "./File/File";

const FileList = () => {
    const files = useSelector(state => state.file.files);
    const fileView = useSelector(state => state.file.view);

    if (!files.length) {
        return (
            <div className={cl['not-file']}>Файлы не найдены</div>
        )
    }

    if (fileView === 'plate') {
        return (
            <div className={cl.file_plate}>
                {files.map(file =>
                    <File
                        file={file}
                        key={file.id}
                    />
                )}
            </div>
        )
    }

    if (fileView === 'list') {
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
    }
};

export default FileList;