import React from "react";

import { withStyles } from "@material-ui/core/styles";
import ErrorIcon from "@material-ui/icons/Error";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import SnackbarContent from "@material-ui/core/SnackbarContent";

function styles(theme) {
    return {
        container: {
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            display: "block",
            maxWidth: "280px !important",
            margin: "0 auto"
        },
        message: {
            backgroundColor: theme.palette.error.dark,
            color: theme.palette.primary.contrastText,
            maxWidth: "100%",
            minWidth: "0"
        },
        icon: {
            marginRight: "4px"
        }
    };
}

function ErrorMessage({ message, classes }) {
    return (
        <Container className={classes.container}>
            <SnackbarContent
                className={classes.message}
                message={
                    <Grid container wrap="nowrap">
                        <Grid item>
                            <ErrorIcon className={classes.icon} />
                        </Grid>
                        <Grid item>
                            <Typography>{message}</Typography>
                        </Grid>
                    </Grid>
                }
            />
        </Container>
    );
}

export default withStyles(styles)(ErrorMessage);
