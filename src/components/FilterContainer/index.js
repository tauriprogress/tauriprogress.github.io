import React, { useState } from "react";

import { withStyles } from "@material-ui/styles";

import Container from "@material-ui/core/Container";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

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
            backgroundColor: theme.baseColors.dark,
            color: theme.baseColors.light,
            padding: theme.spacing(1),
            cursor: "pointer",
            borderRadius: "4px"
        },
        filterContainer: {
            backgroundColor: theme.palette.background.accent,
            marginBottom: theme.spacing(1),
            borderRadius: "4px",
            marginTop: theme.spacing(1)
        },
        iconContainer: {
            height: "15px"
        }
    };
}

function FilterContainer({ classes, children, defaultState = false }) {
    const [open, setOpen] = useState(defaultState);

    return (
        <div className={classes.filterContainer}>
            <Grid
                container
                justify={"center"}
                onClick={() => setOpen(!open)}
                className={classes.filterTitle}
            >
                <Grid item>
                    <Typography color="inherit" variant="button">
                        Filters
                    </Typography>
                </Grid>
                <Grid className={classes.iconContainer} item>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </Grid>
            </Grid>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <Container className={classes.container}>{children}</Container>
            </Collapse>
        </div>
    );
}

export default withStyles(styles)(FilterContainer);
