import React, {useState} from 'react';
import cl from './Navbar.module.scss'
import logo from '../../assets/img/logo-aero-drive.png'
import {Link, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, MAIN_ROUTE, DISK_ROUTE} from "../../constants/routes";
import {useDispatch, useSelector} from "react-redux";
import {logoutAuthAction} from "../../store/authReducer";
import {getFiles, searchFiles} from "../../http/file";
import {showLoaderAction} from "../../store/appReducer";

const Navbar = () => {
    const isAuth = useSelector(state => state.auth.isAuth);
    const currentDir = useSelector(state => state.file.currentDir);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchName, setSearchName] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(false);

    const logout = () => {
        localStorage.removeItem('token');
        dispatch(logoutAuthAction());
        navigate(MAIN_ROUTE)
    }

    const searchChangeHandler = (e) => {
        setSearchName(e.target.value);
        if (searchTimeout) {
            clearTimeout(searchTimeout)
        }

        if (e.target.value) {
            setSearchTimeout(setTimeout(() => {
                dispatch(searchFiles(e.target.value))
            }, 500))
        } else {
            dispatch(getFiles(currentDir));
        }

    }

    return (
        <nav className={cl.navbar}>
            <div className={cl.wrapper}>
                <Link to={isAuth ? DISK_ROUTE : MAIN_ROUTE}><img src={logo} alt="Logo cloud" width='60px' height='35px' className={cl.logo}/></Link>
                <h1 className={cl.header}><Link to={isAuth ? DISK_ROUTE : MAIN_ROUTE}>Aero Drive</Link></h1>
                {isAuth && <input
                    value={searchName}
                    onChange={searchChangeHandler}
                    className={cl.search}
                    type='text'
                    placeholder='Название файла...'
                /> }
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