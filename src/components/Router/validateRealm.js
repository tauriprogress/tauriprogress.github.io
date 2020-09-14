import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";

import { validRealm, getRealmFromLocation } from "../../helpers";

function validateRealm() {
    return Component => {
        const ValidateRealm = React.forwardRef(
            ({ innerRef, ...otherprops }, ref) => {
                const location = useLocation();
                const realms = useSelector(state => state.environment.realms);

                return !validRealm(getRealmFromLocation(location)) ? (
                    <Redirect
                        to={`${location.pathname}?realm=${realms["tauri"]}`}
                    />
                ) : (
                    <Component
                        ref={innerRef || ref}
                        location={location}
                        {...otherprops}
                    />
                );
            }
        );

        return ValidateRealm;
    };
}

export default validateRealm;
