import React from "react";
import { BrowserRouter } from "react-router-dom";

import RouteSwitch from "./RouteSwitch";

function Router() {
    return (
        <BrowserRouter>
            <RouteSwitch />
        </BrowserRouter>
    );
}

export default Router;
