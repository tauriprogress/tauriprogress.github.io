import React from "react";
import AppContainer from "../AppContainer";
import ValidateRealmGroup from "./validateRealmGroup";

export default function routeWrapper(Component) {
    return () => {
        return (
            <ValidateRealmGroup>
                <AppContainer>
                    <Component />
                </AppContainer>
            </ValidateRealmGroup>
        );
    };
}
