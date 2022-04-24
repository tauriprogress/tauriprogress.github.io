import React from "react";

import { useSelector } from "react-redux";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import Router from "./Router";

import { themesSelector } from "../redux/selectors";

function App() {
    const themes = useSelector(themesSelector);
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes[themes.type]}>
                <CssBaseline />
                <Router />
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default App;
