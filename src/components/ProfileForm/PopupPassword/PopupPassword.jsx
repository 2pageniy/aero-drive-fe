import React, {useState} from 'react';
import cl from "./PopupPassword.module.scss";
import {updateUserPassword} from "../../../http/user";
import iconCancel from '../../../assets/img/icon-cancel.png'

const PopupPassword = ({hidePopup}) => {
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const updatePassword = () => {
        if (newPassword !== repeatPassword) {
            alert("Пароли не совпадают")
        } else {
            updateUserPassword(password, newPassword, hidePopup);
        }
    }

    return (
        <div className={cl.popup} onClick={hidePopup}>

            <div onClick={e => e.stopPropagation()} className={cl.modal}>
                <img onClick={hidePopup} className={cl.icon} src={iconCancel} alt="cancel" width='30px' height='30px' />
                <div className={cl['pass']}>
                    <p className={cl.paragraph}>Введите старый пароль</p>
                    <input
                        type="password"
                        className={cl['input-pass']}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className={cl['pass']}>
                    <p className={cl.paragraph}>Введите новый пароль</p>
                    <input
                        type="password"
                        className={cl['input-pass']}
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                    />
                </div>
                <div className={cl['pass']}>
                    <p className={cl.paragraph}>Повторите новый пароль</p>
                    <input
                        type="password"
                        className={cl['input-pass']}
                        value={repeatPassword}
                        onChange={e => setRepeatPassword(e.target.value)}
                    />
                </div>
                <button className={cl['save-btn']} onClick={updatePassword}>Сохранить новый пароль</button>
            </div>
        </div>
    );
};

export default PopupPassword;