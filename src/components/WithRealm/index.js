import React from "react";

import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

function styles(theme) {
    return {
        secondaryText: {
            color: theme.palette.text.secondary,
            fontSize: `${11 / 16}rem`,
            lineHeight: `${11 / 16}rem`
        }
    };
}

function WithRealm({ classes, children, realmName }) {
    return (
        <Grid container direction="column">
            <Grid item>{children}</Grid>
            <Grid item className={classes.secondaryText}>
                <Typography variant="caption" className={classes.secondaryText}>
                    {realmName}
                </Typography>
            </Grid>
        </Grid>
    );
}

export default withStyles(styles)(WithRealm);
