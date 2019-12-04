import React from "react";

import { withStyles } from "@material-ui/core/styles";

import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";

function styles(theme) {
    return {
        container: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
            display: "flex",
            justifyContent: "center",
            minWidth: "280px"
        }
    };
}

function Loading({ classes }) {
    return (
        <Container className={classes.container}>
            <CircularProgress
                className="additionalInfoLoader"
                color="secondary"
            />
        </Container>
    );
}

export default withStyles(styles)(Loading);
