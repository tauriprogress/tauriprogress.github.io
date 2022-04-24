import React from "react";

import withStyles from '@mui/styles/withStyles';

import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";

function styles(theme) {
    return {
        container: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
            display: "flex",
            justifyContent: "center",
            maxWidth: "280px !important",
            margin: "0 auto"
        }
    };
}

function Loading({ classes, className = "" }) {
    return (
        <Container className={`${classes.container} ${className}`}>
            <CircularProgress color="secondary" />
        </Container>
    );
}

export default withStyles(styles)(Loading);
