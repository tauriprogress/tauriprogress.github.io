import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

import Header from "../Header";
import SideNavigation from "../SideNavigation";

function styles() {
    return {
        container: {
            display: "flex",
            width: "100%",
            "& main": {
                flex: 1,
                paddingTop: "10px"
            }
        }
    };
}

function AppContainer({ classes, children }) {
    return (
        <React.Fragment>
            <Header />
            <Grid className={classes.container}>
                <SideNavigation />
                <main>{children}</main>
            </Grid>
        </React.Fragment>
    );
}

export default withStyles(styles)(AppContainer);
