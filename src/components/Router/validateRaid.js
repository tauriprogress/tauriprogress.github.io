import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    validRaidNameOfEnv,
    isRaidName,
    getRealmGroupOfRaidName,
} from "../../helpers";

import { environmentSetRealmGroup } from "../../redux/actions";

import {
    environmentIsSeasonalSelector,
    environmentRealmGroupSelector,
} from "../../redux/selectors";

function validateRaid() {
    return (Component) => {
        const ValidateRaid = React.forwardRef(
            ({ innerRef, ...otherprops }, ref) => {
                const dispatch = useDispatch();
                const location = useSelector((state) => state.router.location);

                const realmGroup = useSelector(environmentRealmGroupSelector);
                const isSeasonal = useSelector(environmentIsSeasonalSelector);

                let regex = /\/raid\/[^/]*/;
                let result = regex.exec(location.pathname);
                if (result && result[0]) {
                    const raidName = result[0].replace("/raid/", "");
                    if (
                        isRaidName(raidName) &&
                        !validRaidNameOfEnv(raidName, realmGroup, isSeasonal)
                    ) {
                        const newRealmGroup = getRealmGroupOfRaidName(raidName);
                        dispatch(environmentSetRealmGroup(newRealmGroup));
                    }
                }

                return (
                    <Component
                        ref={innerRef || ref}
                        location={location}
                        {...otherprops}
                    />
                );
            }
        );

        return ValidateRaid;
    };
}

export default validateRaid;
