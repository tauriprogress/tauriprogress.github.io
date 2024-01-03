import React from "react";
import { matchPath, useLocation, Redirect } from "react-router-dom";

import { getRealmGroupFromLocalStorage, validRealmGroup } from "../../helpers";

import routes from "../../routes";

function ValidateRealmGroup({ children }) {
    const location = useLocation();

    const path = matchPath(location.pathname, {
        path: "/:realmGroupName",
        exact: false,
        strict: false,
    });

    const realmGroupName = path ? path.params.realmGroupName : false;

    if (!validRealmGroup(realmGroupName)) {
        const defaultRealmGroup = getRealmGroupFromLocalStorage();

        let match = false;

        for (let route of routes) {
            let currentMatch = matchPath(location.pathname, {
                path: route.path,
                exact: route.exact,
            });

            if (currentMatch && currentMatch.path !== "/") {
                match = true;
            }
        }

        return (
            <Redirect
                to={
                    location.pathname === "/"
                        ? `/${defaultRealmGroup}`
                        : !match
                        ? `/${defaultRealmGroup}${location.pathname}`
                        : `${location.pathname.replace(
                              realmGroupName,
                              defaultRealmGroup
                          )}${location.search}`
                }
            />
        );
    } else {
        return children;
    }
}

export default ValidateRealmGroup;
