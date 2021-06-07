import React from "react";

import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

function styles(theme) {
    return {
        rank: {
            minWidth: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
            padding: `0 ${theme.spacing(3)}px 0 ${theme.spacing(2)}px`
        }
    };
}

function AlignedRankDisplay({ classes, children, rank, className }) {
    return (
        <Grid container wrap="nowrap" className={className}>
            <Grid item className={`${classes.rank}`}>
                <Typography color="inherit">{rank}.</Typography>
            </Grid>
            <Grid item>{children}</Grid>
        </Grid>
    );
}

export default withStyles(styles)(AlignedRankDisplay);
