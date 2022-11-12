import React, {useEffect} from 'react';
import cl from './Disk.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {createDir, getFiles} from "../../http/file";
import FileList from "./FileList/FileList";
import Popup from "./Popup";
import {setCurrentDirAction, setPopupDisplay} from "../../store/fileReducer";

const Disk = () => {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.file.currentDir);
    const dirStack = useSelector(state => state.file.dirStack);

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

    return (
        <div className={cl.disk}>
            <div className={cl.btns}>
                <button className={cl.back} onClick={() => backClickHandler()}>Назад</button>
                <button className={cl.create} onClick={showPopupHandler}>Создать папку</button>
            </div>
            <FileList/>
            <Popup/>
        </div>
    );
};

export default Disk;