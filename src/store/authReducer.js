
const initialState = {
    currentUser: {},
    isAuth: false,
}

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {...state, user: action.payload, isAuth: true}

        case LOGOUT:
            return {...state, user: {}, isAuth: false}

        default:
            return state;
    }
}

export const loginAuthAction = (user) => ({type: LOGIN, payload: user});
export const logoutAuthAction = () => ({type: LOGOUT});