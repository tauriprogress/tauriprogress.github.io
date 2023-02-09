import React from "react";
import RouteSwitch from "./RouteSwitch";
import { Router as BrowserRouter } from "react-router-dom";
import { history } from "../../redux";
import ValidateRealmGroup from "./validateRealmGroup";

function Router() {
    return (
        <BrowserRouter history={history}>
            <ValidateRealmGroup>
                <RouteSwitch />
            </ValidateRealmGroup>
        </BrowserRouter>
    );
}

export default Router;
