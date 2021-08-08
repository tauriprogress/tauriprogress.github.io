import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import ModalFightLog from "../FightLog/Modal";

import ROUTES from "../../routes";

function RouteSwitch() {
    const location = useSelector(state => state.router.location);

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
