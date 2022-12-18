import React from 'react';
import cl from './User.module.scss'
import sizeFormat from "../../utils/sizeFormat";
import {useDispatch, useSelector} from "react-redux";
import {deleteUser} from "../../http/user";

const User = ({user, setUsers}) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.user);

    const deleteCurrentUser = () => {
        dispatch(deleteUser(user.id, currentUser.id. null));
        setUsers((prevState) => ([
            ...prevState.filter(prev => prev.id !== user.id)
        ]));
    }

    return (
        <div className={cl['wrapper-user']}>
            <div className={cl.user}>
                <p>Имя: {user.name}</p>
                <p>Почта: {user.email}</p>
                <p>Использованное место: {sizeFormat(user.usedSpace)}</p>
                <p>Аватар: {user.avatar ? 'Есть' : 'Нет'}</p>
            </div>
            <div className={cl.btn}>
                <button className={cl.delete} onClick={deleteCurrentUser}>Удалить пользователя</button>
            </div>
        </div>
    );
};

export default User;