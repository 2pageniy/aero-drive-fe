import React, {useState} from 'react';
import cl from './Auth.module.scss'
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {DISK_ROUTE, LOGIN_ROUTE} from "../../constants/routes";
import {login, registration} from "../../http/user";
import {useDispatch, useSelector} from "react-redux";
import {showLoaderAction} from "../../store/appReducer";

const Auth = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const loader = useSelector(state => state.app.loader);
    const isAuth = useSelector(state => state.auth.isAuth);
    const isLogin = location.pathname === LOGIN_ROUTE;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const authorization = async (e) => {
        dispatch(showLoaderAction());
        e.preventDefault();
        if (!isLogin) {
            dispatch(registration(email, password, navigate))
        } else {
            dispatch(login(email, password, navigate));
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