import React from "react";

import { useSelector } from "react-redux";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

import Router from "./Router";

import { themesSelector } from "../redux/selectors";

function App() {
    const themes = useSelector(themesSelector);
    return (
        <MuiThemeProvider theme={themes[themes.type]}>
            <CssBaseline />
            <Router />
        </MuiThemeProvider>
    );
}

export default App;
