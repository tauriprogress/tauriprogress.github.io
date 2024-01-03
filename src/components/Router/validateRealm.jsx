import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useLocation, useParams } from "react-router-dom";
import queryString from "query-string";

import {
    validRealm,
    realmOfRealmGroup,
    getRealmGroupOfRealm,
} from "../../helpers";
import { environmentRealmsSelector } from "../../redux/selectors";

export function validateRealm() {
    return (Component) =>
        React.forwardRef(({ innerRef, ...props }, ref) => {
            const location = useLocation();
            const realms = useSelector(environmentRealmsSelector);
            const { realmGroupName } = useParams();
            const currentRealm = queryString.parse(location.search).realm;

            if (validRealm(currentRealm)) {
                if (!realmOfRealmGroup(currentRealm, realms)) {
                    const redirectToRealmGroup =
                        getRealmGroupOfRealm(currentRealm);
                    return (
                        <Redirect
                            to={`${location.pathname.replace(
                                realmGroupName,
                                redirectToRealmGroup
                            )}${location.search}`}
                        />
                    );
                }
                return (
                    <Component
                        ref={innerRef || ref}
                        location={location}
                        {...props}
                    />
                );
            }
            return <Redirect to={`${location.pathname}?realm=${realms[0]}`} />;
        });
}
