import React from "react";

import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

function styles(theme) {
    return {
        title: {
            backgroundColor: theme.palette.background.darker,
            padding: theme.spacing(1)
        },
        container: {
            margin: `0 ${theme.spacing(1)}px`,
            minWidth: "260px",
            maxWidth: "260px"
        }
    };
}

function TitledContainer({ classes, title, children, ...rest }) {
    return (
        <div {...rest} className={`${classes.container} ${rest.className}`}>
            <Typography className={classes.title}>{title}</Typography>
            {children}
        </div>
    );
}

export default withStyles(styles)(TitledContainer);
