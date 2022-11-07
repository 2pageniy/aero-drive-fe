import React, {useEffect} from 'react';
import cl from './Disk.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {getFiles} from "../../http/file";
import FileList from "./FileList/FileList";

const Disk = () => {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.file.currentDir)

    useEffect(() => {
        dispatch(getFiles(currentDir));
    }, [currentDir])

    return (
        <div className={cl.disk}>
            <div className={cl.btns}>
                <button className={cl.back}>Назад</button>
                <button className={cl.create}>Создать папку</button>
            </div>
            <FileList/>
        </div>
    );
};

export default Disk;