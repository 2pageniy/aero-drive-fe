import React from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../constants/router";
import {MAIN_ROUTE} from "../constants/routes";

const AppRoute = () => {
    const isAuth = false;

    return (
        <Routes>
            {isAuth ?
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
            {/*TODO 404*/}
            <Route
                path='*'
                element=<Navigate to={MAIN_ROUTE} replace />
            exact={false}
            />
        </Routes>
    );
};

export default AppRoute;