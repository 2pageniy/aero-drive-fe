import {
    LOGIN_ROUTE,
    MAIN_ROUTE,
    PROFILE_ROUTE,
    REGISTRATION_ROUTE,
} from "./routes";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Main from "../pages/Main";
import Profile from "../pages/Profile";

export const publicRoutes = [
    {path: MAIN_ROUTE, element: <Main/>, exact: false},
    {path: LOGIN_ROUTE, element: <Login/>, exact: false},
    {path: REGISTRATION_ROUTE, element: <Registration/>, exact: false},
];

export const privateRoutes = [
    {path: MAIN_ROUTE, element: <Main/>, exact: false},
    {path: PROFILE_ROUTE, element: <Profile/>, exact: false},
];