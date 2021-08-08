import React from "react";
import { ConnectedRouter } from "connected-react-router";
import RouteSwitch from "./RouteSwitch";
import AppContainer from "../AppContainer";

import { history } from "../../redux";

function Router() {
    return (
        <ConnectedRouter history={history}>
            <AppContainer>
                <RouteSwitch />
            </AppContainer>
        </ConnectedRouter>
    );
}

export default Router;
