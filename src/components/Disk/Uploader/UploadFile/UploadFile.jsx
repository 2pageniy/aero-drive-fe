import React from 'react';
import cl from '../Uploader.module.scss';
import {useDispatch} from "react-redux";
import {removeUploadFileAction} from "../../../../store/uploadReducer";

const UploadFile = ({file}) => {
    const dispatch = useDispatch();

    return (
        <div className={cl.upload_file}>
            <div className={cl.file__header}>
                <div className={cl.name}>{file.name}</div>
                <button className={cl.remove} onClick={() => dispatch(removeUploadFileAction(file.id))}>X</button>
            </div>
            <div className={cl.progress_bar}>
                <div className={cl.upload_bar} style={{width: file.progress + '%'}}/>
                <div className={cl.percent}>{file.progress}%</div>
            </div>
        </div>
    );
};

export default UploadFile;