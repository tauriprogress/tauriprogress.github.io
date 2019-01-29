import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import ErrorIcon from "@material-ui/icons/Error";
import { Typography } from "@material-ui/core";

function styles(theme) {
    return {
        background: {
            backgroundColor: theme.palette.error.main
        },
        textColor: {
            color: theme.palette.primary.contrastText
        }
    };
}

function ErrorMessage({ message, classes }) {
    return (
        <div className="error">
            <Card className={`${classes.background} errorMessage`}>
                <ErrorIcon
                    className={`${classes.textColor} errorMessageIcon`}
                />
                <Typography className={`${classes.textColor}`}>
                    {message}
                </Typography>
            </Card>
        </div>
    );
}

export default withStyles(styles)(ErrorMessage);
