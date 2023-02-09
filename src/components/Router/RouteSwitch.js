import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import LogModal from "../Log/Modal";
import AppContainer from "../AppContainer";

import ROUTES from "../../routes";

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
                    exact
                    path={["/log/:logId", "/seasonal/log/:logId"]}
                    component={LogModal}
                />
            )}
        </AppContainer>
    );
}

export default RouteSwitch;
