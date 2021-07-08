import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import ModalFightLog from "../FightLog/Modal";

import ROUTES from "../../routes";

function RouteSwitch() {
    const location = useLocation();
    const background = location.state && location.state.background;

    return (
        <React.Fragment>
            <Switch location={background || location}>
                {ROUTES.map(route => (
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
                    component={ModalFightLog}
                />
            )}
        </React.Fragment>
    );
}

export default RouteSwitch;
