import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import Router from "./Router";
import ErrorBoundary from "./ErrorBoundary";

import { themeSelector } from "../redux/selectors";
import { getCurrentRealmGroupName } from "../redux/history/helpers";
import { validRealmGroup } from "../helpers";
import { initalizeApp } from "../redux/actions";

(function () {
    let realmGroupName = getCurrentRealmGroupName();
    if (validRealmGroup(realmGroupName)) {
        localStorage.setItem("realmGroup", realmGroupName);
    }
})();

function App() {
    const theme = useSelector(themeSelector);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initalizeApp());
    }, [dispatch]);
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ErrorBoundary>
                    <Router />
                </ErrorBoundary>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default App;
