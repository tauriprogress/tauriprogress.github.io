import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";

import {
    validRealm,
    realmOfRealmGroup,
    getRealmFromLocation
} from "../../helpers";

import { changeEnvironmentRealmGroup } from "../../redux/actions";

function validateRealm() {
    return Component => {
        const ValidateRealm = React.forwardRef(
            ({ innerRef, ...otherprops }, ref) => {
                const location = useLocation();
                const { realms, realmGroup } = useSelector(state => ({
                    realms: state.environment.realms,
                    realmGroup: state.environment.realmGroup
                }));
                const currentRealm = getRealmFromLocation(location);

                if (validRealm(currentRealm)) {
                    if (!realmOfRealmGroup(currentRealm, realms)) {
                        const dispatch = useDispatch();
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
