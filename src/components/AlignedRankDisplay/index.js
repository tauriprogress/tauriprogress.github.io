import React from "react";

import withStyles from '@mui/styles/withStyles';

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

function styles(theme) {
    return {
        rank: {
            minWidth: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
            padding: `0 ${theme.spacing(3)} 0 ${theme.spacing(2)}`
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
