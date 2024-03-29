import $api from "./index";
import {loginAuthAction, logoutAuthAction} from "../store/authReducer";
import {hideLoaderAction, showLoaderAction} from "../store/appReducer";
import {DISK_ROUTE, MAIN_ROUTE} from "../constants/routes";

export const registration = (name, email, password, navigate) => {
    return async dispatch => {
        try {
            $api.post('/user/registration', {name, email, password})
                .then(response => response.data)
                .then(data => {
                    dispatch(loginAuthAction(data.userData))
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

export const uploadAvatar = (file) => {
    return async dispatch => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            $api.post('/file/avatar', formData)
                .then(response => response.data)
                .then(data => {
                    dispatch(loginAuthAction(data))
                });
        } catch (e) {
            console.log(e);
        }
    }
}

export const deleteAvatar = () => {
    return async dispatch => {
        try {
            $api.delete('/file/avatar')
                .then(response => response.data)
                .then(data => {
                    dispatch(loginAuthAction(data))
                });
        } catch (e) {
            console.log(e);
        }
    }
}

export const updateUser = (name, email) => {
    return async dispatch => {
        try {
            $api.patch('/user/update', {name, email})
                .then(response => response.data)
                .then(data => {
                    dispatch(loginAuthAction(data.user))
                    alert(data.message);
                })
                .catch(e => console.log(e))
        } catch (e) {
            console.log(e);
        }
    }
}

export const updateUserPassword = (password, newPassword, hidePopup) => {
    try {
        return $api.patch('/user/update/password', {password, newPassword})
            .then(response => response.data)
            .then(data => {
                alert(data.message);
                hidePopup();
            })
            .catch(e => alert('Неверный старый пароль'))
    } catch (e) {
        console.log(e);
    }
}

export const deleteUser = (id, userId, navigate) => {
    return async dispatch => {
        try {
             $api.delete(`/user/delete?id=${id}`)
                .then(() => {
                    if (userId === id) {
                        localStorage.removeItem('token');
                        dispatch(logoutAuthAction());
                    }
                }).then(() => userId === id && navigate(MAIN_ROUTE))
                .catch(e => alert('Ошибка удаления пользователя'))
        } catch (e) {
            console.log(e);
        }
    }
}

export const getAllUsers = (setUsers) => {
    try {
        return $api.get(`/user/users`)
            .then((response) => response.data)
            .then((data) => setUsers(data))
            .catch(e => alert('Нет доступа'))
    } catch (e) {
        console.log(e);
    }
}