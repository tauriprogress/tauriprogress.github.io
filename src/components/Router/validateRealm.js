import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import queryString from "query-string";

import {
    validRealm,
    realmOfRealmGroup,
    getRealmGroupOfRealm,
} from "../../helpers";

import { environmentSetRealmGroup } from "../../redux/actions";

import { environmentRealmsSelector } from "../../redux/selectors";

function validateRealm() {
    return (Component) => {
        const ValidateRealm = React.forwardRef(
            ({ innerRef, ...otherprops }, ref) => {
                const location = useSelector((state) => state.router.location);

                const realms = useSelector(environmentRealmsSelector);
                const currentRealm = queryString.parse(location.search).realm;
                const dispatch = useDispatch();

                if (validRealm(currentRealm)) {
                    if (!realmOfRealmGroup(currentRealm, realms)) {
                        dispatch(
                            environmentSetRealmGroup(
                                getRealmGroupOfRealm(currentRealm)
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
                    <Redirect to={`${location.pathname}?realm=${realms[0]}`} />
                );
            }
        );

        return ValidateRealm;
    };
}

export default validateRealm;
