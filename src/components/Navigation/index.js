import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";

import MenuIcon from "@material-ui/icons/Menu";
import Brightness from "@material-ui/icons/Brightness4";
import Drawer from "@material-ui/core/Drawer";

import NavItems from "./NavItems";
import AdditionalInfo from "../AdditionalInfo";

import { navToggle, themeToggle } from "../../redux/actions";

function styles(theme) {
    return {
        iconButton: {
            margin: 8,
            padding: 3,
            "&:hover": {
                color: theme.palette.secondary.main
            }
        },
        drawerPaper: {
            backgroundColor: theme.baseColors.dark,
            color: theme.baseColors.light
        },
        appBar: {
            marginBottom: theme.spacing(4)
        },
        desktopNav: {
            paddingLeft: theme.spacing(4)
        }
    };
}

function Navigation({ classes }) {
    const showNav = useSelector(state => state.nav.showNav);
    const dispatch = useDispatch();

    return (
        <AppBar position="static" className={classes.appBar}>
            <Grid
                container
                justify="space-between"
                wrap="nowrap"
                component="nav"
            >
                <Grid item>
                    <Hidden smUp implementation="css">
                        <Typography>
                            <IconButton
                                color="inherit"
                                className={classes.iconButton}
                                onClick={() => dispatch(navToggle(true))}
                            >
                                <MenuIcon fontSize="large" />
                            </IconButton>
                        </Typography>
                    </Hidden>

                    <Drawer
                        anchor="top"
                        open={showNav}
                        onClose={() => dispatch(navToggle(false))}
                        classes={{
                            paper: classes.drawerPaper
                        }}
                    >
                        <NavItems />
                    </Drawer>

                    <Hidden xsDown implementation="css">
                        <Grid
                            container
                            implementation="css"
                            className={classes.desktopNav}
                        >
                            <NavItems />
                        </Grid>
                    </Hidden>
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
        </AppBar>
    );
}

export default withStyles(styles)(Navigation);
