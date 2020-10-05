import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

import Header from "../Header";
import SideNavigation from "../SideNavigation";
import OverflowScroll from "../OverflowScroll";

function styles(theme) {
    return {
        container: {
            width: "100%",
            display: "flex"
        },
        content: {
            flex: 1,
            padding: theme.spacing(2)
        }
    };
}

function AppContainer({ classes, children }) {
    return (
        <React.Fragment>
            <Header />
            <Grid className={classes.container}>
                <SideNavigation />
                <OverflowScroll className={classes.content}>
                    <main>{children}</main>
                </OverflowScroll>
            </Grid>
        </React.Fragment>
    );
}

export default withStyles(styles)(AppContainer);
