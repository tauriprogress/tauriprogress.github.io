import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import AppContainer from "../AppContainer";

import ROUTES from "../../routes";
import { LOG_MODAL_ROUTE } from "../../routes";

function RouteSwitch() {
    const location = useLocation();

    const background = location.state && location.state.background;

    return (
        <AppContainer>
            <Switch location={background || location}>
                {ROUTES.map((route) => (
                    <Route
                        exact={route.exact}
                        key={route.name}
                        path={route.path}
                        component={route.component}
                    />
                ))}
            </Switch>
            {background && (
                <Route
                    exact={LOG_MODAL_ROUTE.exact}
                    path={LOG_MODAL_ROUTE.path}
                    component={LOG_MODAL_ROUTE.component}
                />
            )}
        </AppContainer>
    );
}

export default RouteSwitch;
