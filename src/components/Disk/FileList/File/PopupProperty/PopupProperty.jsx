import React, {useState} from 'react';
import cl from './PopupProperty.module.scss'
import iconCancel from '../../../../../assets/img/icon-cancel.png'
import {useDispatch} from "react-redux";
import {createCopyFile, readFile} from "../../../../../http/file";

const PopupProperty = ({file, close}) => {
    const dispatch = useDispatch();
    const [watchFile, setWatchFile] = useState(false);
    const [contentFile, setContentFile] = useState('');

    const copyFile = () => {
        dispatch(createCopyFile(file))
        close()
    }

    const clickWatch = (e) => {
        setWatchFile(true)
        readFile(file).then(data => setContentFile(data.data))
    }

    return (
        <div className={cl.popup} onClick={close}>
            <div className={cl.modal} onClick={e => e.stopPropagation()}>
                <img src={iconCancel} alt="close icon" width="30px" height="30px" className={cl.icon} onClick={close}/>
                {Object.entries(file).map(prop => (
                    <div key={prop} className={cl.property}>

                        {prop[0]}: {prop[1] ? prop[1].toString() : 'Нет'}
                    </div>
                ))}
                <div className={cl['group-btn']}>
                    <button>Переименовать</button>
                    {file.type === 'txt' &&
                        <button onClick={clickWatch}>Посмотреть</button>
                    }
                    <button onClick={copyFile}>Создать копию</button>
                </div>
            </div>
            {watchFile &&
                <div className={cl.watch} onClick={e => e.stopPropagation()}>
                    <img src={iconCancel} alt="close icon" width="30px" height="30px" className={cl.icon} onClick={() => setWatchFile(false)}/>
                    <p className={cl.content}>
                        {contentFile}
                    </p>
                </div>
            }
        </div>
    );
};

export default PopupProperty;