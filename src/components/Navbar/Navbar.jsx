import React from 'react';
import cl from './Navbar.module.scss'
import logo from '../../assets/img/logo-aero-drive.png'
import {Link, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, MAIN_ROUTE, DISK_ROUTE} from "../../constants/routes";
import {useDispatch, useSelector} from "react-redux";
import {logoutAuthAction} from "../../store/authReducer";

const Navbar = () => {
    const isAuth = useSelector(state => state.auth.isAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        dispatch(logoutAuthAction());
        navigate(MAIN_ROUTE)
    }

    return (
        <nav className={cl.navbar}>
            <div className={cl.wrapper}>
                <Link to={isAuth ? DISK_ROUTE : MAIN_ROUTE}><img src={logo} alt="Logo cloud" width='60px' height='35px' className={cl.logo}/></Link>
                <h1 className={cl.header}><Link to={isAuth ? DISK_ROUTE : MAIN_ROUTE}>Aero Drive</Link></h1>
                {isAuth ?
                    <div className={cl.exit} onClick={logout}>Выход</div>
                    :
                    <>
                        <div className={cl.login}><Link to={LOGIN_ROUTE}>Войти</Link></div>
                        <div className={cl.registration}><Link to={REGISTRATION_ROUTE}>Регистрация</Link></div>
                    </>
                }
            </div>
        </nav>
    );
};

export default Navbar;