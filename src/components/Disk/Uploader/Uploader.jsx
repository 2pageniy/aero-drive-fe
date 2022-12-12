import React from 'react';
import cl from './Uploader.module.scss';
import UploadFile from "./UploadFile/UploadFile";
import {useDispatch, useSelector} from "react-redux";
import {hideUploaderAction} from "../../../store/uploadReducer";

const Uploader = () => {
    const dispatch = useDispatch();
    const files = useSelector(state => state.upload.files);
    const isVisible = useSelector(state => state.upload.isVisible);

    return (
        isVisible &&
        <div className={cl.uploader}>
            <div className={cl.header}>
                <div className={cl.title}>Загрузка</div>
                <button className={cl.close} onClick={() => dispatch(hideUploaderAction())}>X</button>
            </div>
            {files.map(file =>
                <UploadFile key={file.id} file={file}/>
            )}
        </div>
    );
};

export default Uploader;