import React from "react";
import { matchPath, useLocation, Redirect } from "react-router-dom";

import { getRealmGroupFromLocalStorage, validRealmGroup } from "../../helpers";

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

        return (
            <Redirect
                to={
                    location.pathname === "/"
                        ? `/${defaultRealmGroup}`
                        : location.pathname.replace(
                              realmGroupName,
                              defaultRealmGroup
                          )
                }
            />
        );
    } else {
        return children;
    }
}

export default ValidateRealmGroup;
