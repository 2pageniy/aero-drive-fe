import React from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import {adminRoutes, privateRoutes, publicRoutes} from "../constants/router";
import {NOT_FOUND_ROUTE} from "../constants/routes";
import {useSelector} from "react-redux";

const AppRoute = () => {
    const isAuth = useSelector(state => state.auth.isAuth);
    const user = useSelector(state => state.auth.user);

    return (
        <Routes>
            {isAuth ?
                user.roles.includes('admin') ?
                    adminRoutes.map(({path, element, exact}) =>
                        <Route
                            key={path}
                            path={path}
                            element={element}
                            exact={exact}
                        />
                    )
                    :
                    privateRoutes.map(({path, element, exact}) =>
                        <Route
                            key={path}
                            path={path}
                            element={element}
                            exact={exact}
                        />
                    )
                :
                publicRoutes.map(({path, element, exact}) =>
                    <Route
                        key={path}
                        path={path}
                        element={element}
                        exact={exact}
                    />
                )
            }
            <Route
                path='*'
                element=<Navigate to={NOT_FOUND_ROUTE} replace />
            exact={false}
            />
        </Routes>
    );
};

export default AppRoute;