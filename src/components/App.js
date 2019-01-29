import React from "react";
import { connect } from "react-redux";

import { MuiThemeProvider } from "@material-ui/core/styles";

import Router from "./Router";

function App({ themes }) {
    return (
        <MuiThemeProvider theme={themes[themes.type]}>
            <Router />
        </MuiThemeProvider>
    );
}

function mapStatetoProps(state) {
    return {
        themes: state.themes
    };
}

export default connect(mapStatetoProps)(App);
