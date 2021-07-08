import React, { useState } from "react";

import { withStyles } from "@material-ui/styles";

import Container from "@material-ui/core/Container";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";

function styles(theme) {
    return {
        container: {
            padding: 0,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            "& .MuiFormControl-root": {
                margin: `0 ${theme.spacing(1)}px`
            },
            paddingBottom: theme.spacing(2),
            paddingTop: "4px"
        },
        filterTitle: {
            backgroundColor: theme.baseColors.secondary,
            color: theme.baseColors.light,
            padding: theme.spacing(1),
            cursor: "pointer",
            borderRadius: "4px"
        },
        iconContainer: {
            height: "15px"
        },
        button: {
            backgroundColor: theme.palette.background.accent
        }
    };
}

function CollapseableFilterContainer({
    classes,
    children,
    defaultState = false
}) {
    const [open, setOpen] = useState(defaultState);

    return (
        <div className={classes.filterContainer}>
            <Button
                fullWidth
                onClick={() => setOpen(!open)}
                className={classes.button}
            >
                <Grid container justifyContent="center">
                    <Grid item>
                        <Typography color="inherit" variant="button">
                            Filters
                        </Typography>
                    </Grid>
                    <Grid className={classes.iconContainer} item>
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </Grid>
                </Grid>
            </Button>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <Container className={classes.container}>{children}</Container>
            </Collapse>
        </div>
    );
}

export default withStyles(styles)(CollapseableFilterContainer);
