import React from "react";
import { useDispatch } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Divider from "@material-ui/core/Divider";

import Brightness from "@material-ui/icons/Brightness4";

import Items from "./Items";
import AdditionalInfo from "../AdditionalInfo";

import { themeToggle } from "../../redux/actions";

function styles(theme) {
    return {
        iconButton: {
            margin: 8,
            padding: 3,
            "&:hover": {
                color: theme.palette.secondary.main
            }
        }
    };
}

function Header({ classes }) {
    const dispatch = useDispatch();

    return (
        <React.Fragment>
            <Grid
                container
                justify="space-between"
                wrap="nowrap"
                component="header"
            >
                <Grid item>
                    <Items />
                </Grid>
                <Grid item>
                    <Grid container>
                        <Grid item>
                            <Typography>
                                <IconButton
                                    color="inherit"
                                    className={classes.iconButton}
                                    onClick={() => dispatch(themeToggle())}
                                >
                                    <Brightness fontSize="large" />
                                </IconButton>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography>
                                <IconButton
                                    color="inherit"
                                    className={classes.iconButton}
                                >
                                    <AdditionalInfo />
                                </IconButton>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Divider />
        </React.Fragment>
    );
}

export default withStyles(styles)(Header);
