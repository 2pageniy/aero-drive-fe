import React, {useState} from 'react';
import cl from './Popup.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {setPopupDisplay} from "../../store/fileReducer";
import {createDir} from "../../http/file";

const Popup = () => {
    const dispatch = useDispatch();
    const [dirName, setDirName] = useState('');
    const popupDisplay = useSelector(state => state.file.popupDisplay);
    const currentDir = useSelector(state => state.file.currentDir);

    function closePopup() {
        dispatch(setPopupDisplay('none'));
    }

    function createHandler() {
        dispatch(createDir(currentDir, dirName));
        closePopup();
        setDirName('');
    }

    return (
        <div className={cl.popup} onClick={closePopup} style={{display: popupDisplay}}>
            <div className={cl.content} onClick={(e) => e.stopPropagation()}>
                <div className={cl.header}>
                    <div className={cl.title}>Создать новую папку</div>
                    <button className={cl.close} onClick={closePopup}>X</button>
                </div>
                <input
                    className={cl.input}
                    type="text"
                    placeholder='Введите название папки'
                    value={dirName}
                    onChange={(e) => setDirName(e.target.value)}
                />
                <button className={cl.create} onClick={createHandler}>Создать</button>
            </div>
        </div>
    );
};

export default Popup;