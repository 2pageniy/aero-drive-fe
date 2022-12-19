import React from 'react';
import cl from "./DeletePopup.module.scss";

const DeletePopup = ({setPopupConfirm, deleteCurrentUser, removeUser}) => {
    return (
        <div className={cl.popup}>
            <div className={cl.modal}>
                <p className={cl['delete-text']}>Вы действительно хотите удалить профиль {removeUser.name}?</p>
                <div className={cl.buttons}>
                    <button className={cl.danger} onClick={deleteCurrentUser}>Удалить</button>
                    <button onClick={() => setPopupConfirm(false)}>Отмена</button>
                </div>

            </div>
        </div>
    );
};

export default DeletePopup;