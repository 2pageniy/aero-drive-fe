import $api from "./index";
import {loginAuthAction} from "../store/authReducer";
import {hideLoaderAction, showLoaderAction} from "../store/appReducer";
import {DISK_ROUTE} from "../constants/routes";

export const registration = (email, password, navigate) => {
    return async dispatch => {
        try {
            $api.post('/user/registration', {email, password})
                .then(response => response.data)
                .then(data => {
                    dispatch(loginAuthAction(data.user))
                    localStorage.setItem('token', data.token)
                    navigate(DISK_ROUTE);
                })
                .finally(() => dispatch(hideLoaderAction()));
        } catch (e) {
            console.log(e)
            dispatch(hideLoaderAction())
        }
    }
}

export const login = (email, password, navigate) => {
    return async dispatch => {
        try {
             $api.post('/user/login', {email, password})
                 .then(response => response.data)
                 .then(data => {
                    dispatch(loginAuthAction(data.user))
                    localStorage.setItem('token', data.token)
                    navigate(DISK_ROUTE);
                })
                 .finally(() => dispatch(hideLoaderAction()));
        } catch (e) {
            console.log(e)
        }
    }
}

export const auth = () => {
    return async dispatch => {
        try {
            dispatch(showLoaderAction())
            $api.get('/user/auth')
                .then(response => response.data)
                .then(data => {
                    dispatch(loginAuthAction(data.user))
                    localStorage.setItem('token', data.token)
                })
                .catch(() => localStorage.removeItem('token'))
                .finally(() => dispatch(hideLoaderAction()));
        } catch (e) {
            console.log(e)
        }
    }
}