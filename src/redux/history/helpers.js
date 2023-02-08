import { history } from "../";
import { matchPath } from "react-router-dom";

export function getCurrentRealmGroupName() {
    const path = matchPath(history.location.pathname, {
        path: "/:realmGroupName",
        exact: false,
        strict: false,
    });

    const realmGroupName =
        path && path.params && path.params.realmGroupName
            ? path.params.realmGroupName
            : "";

    return realmGroupName;
}
