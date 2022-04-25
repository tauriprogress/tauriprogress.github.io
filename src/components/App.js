import React from "react";

import { useSelector } from "react-redux";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import Router from "./Router";

import { themeSelector } from "../redux/selectors";

function App() {
    const theme = useSelector(themeSelector);
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router />
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default App;
