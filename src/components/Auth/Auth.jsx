import React, {useState} from 'react';
import cl from './Auth.module.scss'
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../../constants/routes";
import {login, registration} from "../../http/user";
import {useDispatch} from "react-redux";

const Auth = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const isLogin = location.pathname === LOGIN_ROUTE;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const authorization = (e) => {
        e.preventDefault();
        if (isLogin) {
            dispatch(login(email, password));
        } else {
            registration(email, password)
        }
    }

    return (
        <div className={cl.wrapper}>
            <div className={cl.auth}>
                <h1 className={cl.header}>{ isLogin ? 'Авторизация' : 'Регистрация'}</h1>
                <form onSubmit={e => authorization(e)} className={cl['sign-form']}>
                    { isLogin ||
                        <input
                            type="text"
                            placeholder='Введите имя'
                            onChange={e => setName(e.target.value)}
                            value={name}
                            className={cl.input}
                        />
                    }
                    <input
                        type="text"
                        placeholder='Введите email'
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        className={cl.input}
                    />
                    <input
                        type="password"
                        placeholder='Введите пароль'
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        className={cl.input}
                    />
                    <button
                        type='submit'
                        className={cl.submit}
                    >
                        { isLogin ? 'Войти' : 'Регистрация'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Auth;