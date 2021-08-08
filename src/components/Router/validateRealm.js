import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Redirect } from "react-router-dom";
import queryString from "query-string";

import { validRealm, realmOfRealmGroup } from "../../helpers";

import { changeEnvironmentRealmGroup } from "../../redux/actions";

function validateRealm() {
    return Component => {
        const ValidateRealm = React.forwardRef(
            ({ innerRef, ...otherprops }, ref) => {
                const location = useSelector(state => state.router.location);

                const { realms, realmGroup } = useSelector(
                    state => ({
                        realms: state.environment.realms,
                        realmGroup: state.environment.realmGroup
                    }),
                    shallowEqual
                );
                const currentRealm = queryString.parse(location.search).realm;
                const dispatch = useDispatch();

                if (validRealm(currentRealm)) {
                    if (!realmOfRealmGroup(currentRealm, realms)) {
                        dispatch(
                            changeEnvironmentRealmGroup(
                                realmGroup === "tauri" ? "crystalsong" : "tauri"
                            )
                        );
                    }
                    return (
                        <Component
                            ref={innerRef || ref}
                            location={location}
                            {...otherprops}
                        />
                    );
                }
                return (
                    <Redirect
                        to={`${location.pathname}?realm=${
                            realmGroup === "tauri"
                                ? realms["tauri"]
                                : realms[Object.keys(realms)[0]]
                        }`}
                    />
                );
            }
        );

        return ValidateRealm;
    };
}

export default validateRealm;
