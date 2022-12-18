import React, {useState} from 'react';
import cl from './File.module.scss'
import FolderIcon from '../../../../assets/img/folder-icon.png'
import FileIcon from '../../../../assets/img/file-icon.png'
import {useDispatch, useSelector} from "react-redux";
import {pushToStackAction, setCurrentDirAction} from "../../../../store/fileReducer";
import {changeFavoriteFile, deleteFile, downloadFile} from "../../../../http/file";
import sizeFormat from "../../../../utils/sizeFormat";
import heartIcon from '../../../../assets/img/heart-icon.png'
import heartFullIcon from '../../../../assets/img/heart-full-icon.png'
import PopupProperty from "./PopupProperty/PopupProperty";
import {useLocation} from "react-router-dom";
import {LINK_ROUTE} from "../../../../constants/routes";

const File = ({file}) => {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.file.currentDir);
    const dirPath = useSelector(state => state.file.dirPath);
    const {name, size, type} = file;
    const location = useLocation();
    const date = file.createdAt.slice(0, 10)
    const fileView = useSelector(state => state.file.view);
    const isFavorite = file.favorite;
    const iconHeart = isFavorite ? heartFullIcon : heartIcon;
    const [popupProperty, setPopupProperty] = useState(false);


    const openHandler = () => {
        if (file.type === 'dir') {
            dispatch(pushToStackAction(currentDir, file.path))
            dispatch(setCurrentDirAction(file.id))
        }
    }

    const downloadClickHandler = (e) => {
        e.stopPropagation();
        downloadFile(file)
    }

    const deleteClickHandler = (e) => {
        e.stopPropagation();
        dispatch(deleteFile(file));
    }

    const favoriteHandler = (e) => {
        e.stopPropagation();
        dispatch(changeFavoriteFile(file))
    }

    const showPopupProperty = () => {
        setPopupProperty(true);
    }

    const closePopupProperty = () => {
        setPopupProperty(false);
    }

    if (location.pathname === LINK_ROUTE) {
        return (
            <div className={cl.file} onClick={() => openHandler(file)}>
                <img src={FileIcon} width='40px' alt="" className={cl.img}/>
                <div className={cl.name}>{name}</div>
                <div className={cl.date}>{date}</div>
                <div className={cl.size}>{sizeFormat(size)}</div>
                <button
                    className={cl.download}
                    onClick={downloadClickHandler}
                >
                    Скачать
                </button>
                <button className={cl.property} onClick={showPopupProperty}>
                    Свойства
                </button>
                {popupProperty &&
                    <PopupProperty file={file} close={closePopupProperty}/>
                }
            </div>
        )
    }


    if (fileView === 'plate') {
        return (
            <div className={cl['file-plate']} onClick={() => openHandler(file)}>
                <img
                    src={iconHeart}
                    alt='heart'
                    width='25px'
                    className={cl[`favorite-${isFavorite}`]}
                    onClick={favoriteHandler}
                />
                <img src={type === 'dir' ? FolderIcon : FileIcon} width='70px' alt="" className={cl.img}/>
                <div className={cl.name}>{name}</div>
                <div className={cl.btns}>
                    {file.type !== 'dir' &&
                        <>
                            <button
                                className={cl.download}
                                onClick={downloadClickHandler}
                            >
                                Скачать
                            </button>
                            <button  className={cl.property}  onClick={showPopupProperty}>
                                Свойства
                            </button>
                        </>
                    }
                    <button className={cl.delete} onClick={deleteClickHandler}>Удалить</button>
                </div>
                {popupProperty &&
                    <PopupProperty file={file} close={closePopupProperty}/>
                }
            </div>
        )
    }

    if (fileView === 'list') {
        return (
            <div className={cl.file} onClick={() => openHandler(file)}>
                <img
                    src={iconHeart}
                    alt='heart'
                    width='25px'
                    className={cl[`favorite-${isFavorite}`]}
                    onClick={favoriteHandler}
                />
                <img src={type === 'dir' ? FolderIcon : FileIcon} width='40px' alt="" className={cl.img}/>
                <div className={cl.name}>{name}</div>
                <div className={cl.date}>{date}</div>
                <div className={cl.size}>{sizeFormat(size)}</div>
                {file.type !== 'dir' &&
                    <button
                        className={cl.download}
                        onClick={downloadClickHandler}
                    >
                        Скачать
                    </button>
                }
                <button className={cl.delete} onClick={deleteClickHandler}>Удалить</button>
                {file.type !== 'dir' &&
                    <button className={cl.property} onClick={showPopupProperty}>
                        Свойства
                    </button>
                }
                {popupProperty &&
                    <PopupProperty file={file} close={closePopupProperty}/>
                }
            </div>
        );
    }
};

export default File;