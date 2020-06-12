import { realms } from "tauriprogress-constants";
import React from "react";
import { Redirect } from "react-router-dom";

import { validRealm, getRealmFromLocation } from "../../helpers";

export function validateRealm(match, location, Component) {
    return !validRealm(getRealmFromLocation(location)) ? (
        <Redirect to={`${location.pathname}?realm=${realms["tauri"]}`} />
    ) : (
        <Component match={match} location={location} />
    );
}
