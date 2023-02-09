import { matchPath, useLocation } from "react-router-dom";

export function withRealmGroupName(Component) {
    return ({ ...props }) => {
        const location = useLocation();

        const path = matchPath(location.pathname, {
            path: "/:realmGroupName",
            exact: false,
            strict: false,
        });

        const realmGroupName =
            path && path.params && path.params.realmGroupName
                ? path.params.realmGroupName
                : "";

        return <Component realmGroupName={realmGroupName} {...props} />;
    };
}
