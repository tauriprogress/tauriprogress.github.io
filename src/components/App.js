import React from "react";

import { useSelector } from "react-redux";

import { MuiThemeProvider } from "@material-ui/core/styles";

import Router from "./Router";

function App() {
    const themes = useSelector(state => state.themes);
    return (
        <MuiThemeProvider theme={themes[themes.type]}>
            <Router />
        </MuiThemeProvider>
    );
}

export default App;
