import React, {useEffect, useRef, useState} from 'react';
import cl from './Disk.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {getFiles, uploadFile} from "../../http/file";
import FileList from "./FileList/FileList";
import Popup from "./Popup";
import {setCurrentDirAction, setPopupDisplay} from "../../store/fileReducer";

const Disk = () => {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.file.currentDir);
    const dirStack = useSelector(state => state.file.dirStack);
    const [dragEnter, setDragEnter] = useState(false);

    useEffect(() => {
        dispatch(getFiles(currentDir));
    }, [currentDir])

    function showPopupHandler() {
        dispatch(setPopupDisplay('flex'))
    }

    function backClickHandler() {
        const backDirId = dirStack.pop();
        dispatch(setCurrentDirAction(backDirId))
    }

    function fileUploaderHandler(e) {
        const files = [...e.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }

    function dragEnterHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragEnter(true);
    }

    function dragLeaveHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragEnter(false);
    }

    function dropHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        const files = [...e.dataTransfer.files];
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDragEnter(false);
    }

    return ( !dragEnter ?
        <div className={cl.disk} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
            <div className={cl.btns}>
                <button className={cl.back} onClick={() => backClickHandler()}>Назад</button>
                <button className={cl.create} onClick={showPopupHandler}>Создать папку</button>
                <button className={cl.upload}>
                    <label htmlFor="upload-input" className={cl.label}>Загрузить файл</label>
                    <input
                        multiple={true}
                        onChange={fileUploaderHandler}
                        type="file"
                        id='upload-input'
                        className={cl.input}
                    />
                </button>
            </div>
            <FileList/>
            <Popup/>
        </div>
            :
            <div
                className={cl.dropArea}
                onDrop={dropHandler}
                onDragEnter={dragEnterHandler}
                onDragLeave={dragLeaveHandler}
                onDragOver={dragEnterHandler}
            >
                Перетащите файлы сюда
            </div>
    );
};

export default Disk;