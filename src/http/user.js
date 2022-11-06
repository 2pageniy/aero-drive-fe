import $api from "./index";
import {loginAuthAction} from "../store/authReducer";

export const registration = async (email, password) => {
    try {
        await $api.post('/user/registration', {email, password});
    } catch (e) {
        console.log(e)
    }
}

export const login = (email, password) => {
    return async dispatch => {
        try {
            $api.post('/user/login', {email, password})
                .then(response => response.data)
                .then(data => {
                    dispatch(loginAuthAction(data.user))
                    localStorage.setItem('token', data.token)
                });
        } catch (e) {
            console.log(e)
        }
    }
}

export const auth = () => {
    return async dispatch => {
        try {
            $api.get('/user/auth')
                .then(response => response.data)
                .then(data => {
                    dispatch(loginAuthAction(data.user))
                    localStorage.setItem('token', data.token)
                })
                .catch(() => localStorage.removeItem('token'));
        } catch (e) {
            console.log(e)
        }
    }
}