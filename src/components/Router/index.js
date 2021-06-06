import React from "react";
import { BrowserRouter } from "react-router-dom";

import RouteSwitch from "./RouteSwitch";
import AppContainer from "../AppContainer";

function Router() {
    return (
        <BrowserRouter>
            <AppContainer>
                <RouteSwitch />
            </AppContainer>
        </BrowserRouter>
    );
}

export default Router;
