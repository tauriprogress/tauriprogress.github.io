import React from "react";
import {
    Route,
    Switch,
    matchPath,
    useLocation,
    Redirect,
} from "react-router-dom";

import LogModal from "../Log/Modal";

import ROUTES from "../../routes";
import { getRealmGroupFromLocalStorage, validRealmGroup } from "../../helpers";

function RouteSwitch() {
    const location = useLocation();

    const background = location.state && location.state.background;

    const realmGroupName = matchPath(location.pathname, {
        path: "/:realmGroupName",
        exact: false,
        strict: false,
    }).params.realmGroupName;

    if (!validRealmGroup(realmGroupName)) {
        const defaultRealmGroup = getRealmGroupFromLocalStorage();

        return (
            <Redirect
                to={location.pathname.replace(
                    realmGroupName,
                    defaultRealmGroup
                )}
            />
        );
    }

    return (
        <React.Fragment>
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
        </React.Fragment>
    );
}

export default RouteSwitch;
