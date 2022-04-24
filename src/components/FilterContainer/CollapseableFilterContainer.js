import React, { useState } from "react";

import { withStyles } from "@mui/styles";

import Container from "@mui/material/Container";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

function styles(theme) {
    return {
        container: {
            padding: 0,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            "& .MuiFormControl-root": {
                margin: `0 ${theme.spacing(1)}`
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
