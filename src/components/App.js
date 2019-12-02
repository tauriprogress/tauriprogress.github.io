import React from "react";

import { useSelector } from "react-redux";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

import Router from "./Router";

function App() {
    const themes = useSelector(state => state.themes);
    return (
        <MuiThemeProvider theme={themes[themes.type]}>
            <CssBaseline />
            <Router />
        </MuiThemeProvider>
    );
}

export default App;
