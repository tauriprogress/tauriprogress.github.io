import React from "react";
import RouteSwitch from "./RouteSwitch";
import AppContainer from "../AppContainer";
import { Router as BrowserRouter } from "react-router-dom";
import { history } from "../../redux";
import ValidateRealmGroup from "./validateRealmGroup";

function Router() {
    return (
        <BrowserRouter history={history}>
            <RouteSwitch />
        </BrowserRouter>
    );
}

export default Router;
