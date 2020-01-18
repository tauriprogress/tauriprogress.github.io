import React from "react";

import { withStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

function styles(theme) {
    return {
        title: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            borderRadius: "4px",
            padding: theme.spacing(1)
        },
        container: {
            margin: `0 ${theme.spacing(1)}px`,
            minWidth: "260px",
            maxWidth: "260px"
        }
    };
}

function SideCard({ classes, title, children, ...rest }) {
    return (
        <Card {...rest} className={`${classes.container} ${rest.className}`}>
            <Typography className={classes.title}>{title}</Typography>
            {children}
        </Card>
    );
}

export default withStyles(styles)(SideCard);
