import $api from "./index";
import {loginAuthAction} from "../store/authReducer";

export const registration = async (email, password) => {
    try {
        $api.post('/user/registration', {email, password})
            .then(response => response.data)
            .then(data => {
                console.log(data)
            });
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
                    console.log(data)
                });
        } catch (e) {
            console.log(e)
        }
    }
}