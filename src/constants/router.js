import {
    DISK_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    PROFILE_ROUTE,
    REGISTRATION_ROUTE,
    NOT_FOUND_ROUTE, LINK_ROUTE, USERS_ROUTE
} from "./routes";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Main from "../pages/Main";
import Profile from "../pages/Profile";
import Disk from "../components/Disk/Disk";
import NotFound from "../pages/NotFound";
import Link from "../pages/Link";
import Users from "../pages/Users";

export const publicRoutes = [
    {path: MAIN_ROUTE, element: <Main/>, exact: false},
    {path: LOGIN_ROUTE, element: <Login/>, exact: false},
    {path: REGISTRATION_ROUTE, element: <Registration/>, exact: false},
    {path: LINK_ROUTE, element: <Link/>, exact: false},
    {path: NOT_FOUND_ROUTE, element: <NotFound/>, exact: false},
];

export const privateRoutes = [
    {path: DISK_ROUTE, element: <Disk/>, exact: true},
    {path: PROFILE_ROUTE, element: <Profile/>, exact: false},
    {path: LINK_ROUTE, element: <Link/>, exact: false},
    {path: NOT_FOUND_ROUTE, element: <NotFound/>, exact: false},
];

export const adminRoutes = [
    ...privateRoutes,
    {path: USERS_ROUTE, element: <Users />, exact: false},
]