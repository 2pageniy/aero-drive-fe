import React, {useState} from 'react';
import cl from './ProfileForm.module.scss';
import {deleteAvatar, deleteUser, updateUser, uploadAvatar} from "../../http/user";
import {useDispatch, useSelector} from "react-redux";
import PopupPassword from "./PopupPassword/PopupPassword";
import {NavLink, useNavigate} from "react-router-dom";
import {USERS_ROUTE} from "../../constants/routes";
import DeletePopup from "../DeletePopup/DeletePopup";

const ProfileForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [popup, setPopup] = useState(false);
    const [popupConfirm, setPopupConfirm] = useState(false);

    const changeHandler = (e) => {
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    };

    const saveHandler = () => {
        dispatch(updateUser(name, email))
    }

    const showPopup = () => {
        setPopup(true);
    }

    const hidePopup = () => {
        setPopup(false);
    }

    const removeHandler = () => {
        dispatch(deleteUser(user.id, user.id, navigate));
    }

    const getUsers = () => {
        navigate(USERS_ROUTE);
    }

    return (
        <div className={cl.wrapper}>
            <div className={cl.profile}>
                <div className={cl['field']}>
                    <p>Имя:</p>
                    <input className={cl.input} type="text" value={name} onChange={e => setName(e.target.value)}/>
                </div>
                <div className={cl['field']}>
                    <p>Почта:</p>
                    <input className={cl.input} type="text" value={email} onChange={e => setEmail(e.target.value)}/>

                </div>
                <div className={cl['field']}>
                    <p><button className={cl.input} onClick={showPopup}>Изменить пароль</button></p>
                </div>
                <div className={cl['field']}>
                    <p>Аватар:</p>
                    <label className={cl.label} htmlFor="avatar">Загрузить аватарку</label>
                    <input
                        className={cl['avatar-input']}
                        accept='image/*'
                        id='avatar'
                        onChange={e => changeHandler(e)}
                        type="file"
                        placeholder='Загрузить аватар'
                    />
                    <button className={cl.delete} onClick={() => dispatch(deleteAvatar())}>Удалить</button>
                </div>
                <div className={cl.field}>
                    <button type='submit' className={cl.submit} onClick={saveHandler}>Сохранить</button>
                </div>
                {popup &&
                    <PopupPassword hidePopup={hidePopup}/>
                }
                <div className={cl.field}>
                    <button className={cl.danger} onClick={() => setPopupConfirm(true)}>Удалить свой профиль</button>
                </div>
            </div>
            {user.roles.includes('admin') &&
                <NavLink to={USERS_ROUTE} className={cl['wrapper-btn']}>
                    <button className={cl['watch-user']} onClick={getUsers}>
                        Посмотреть всех пользователей.
                    </button>
                </NavLink>
            }
            {popupConfirm &&
                <DeletePopup
                    deleteCurrentUser={removeHandler}
                    setPopupConfirm={setPopupConfirm}
                    removeUser={user}
                />
            }
        {

        }
        </div>
    );
};

export default ProfileForm;