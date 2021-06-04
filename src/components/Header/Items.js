import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link as RouterLink } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";

import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import {
    toggleNavigation,
    changeEnvironmentRealmGroup
} from "../../redux/actions";

import wotlkIcon from "../../assets/expansionIcon/wotlk.png";
import mopIcon from "../../assets/expansionIcon/mop.png";

function styles(theme) {
    return {
        iconButton: {
            "&:hover": {
                color: theme.palette.secondary.main
            }
        },
        textItem: {
            fontWeight: "500",
            position: "relative"
        },
        verticalCenter: {
            display: "flex",
            alignItems: "center"
        },
        stretchHeight: {
            height: "100%"
        },
        expansionLogo: {
            height: "35px",
            marginLeft: "10px"
        }
    };
}

function NavItems({ classes }) {
    const dispatch = useDispatch();
    const realmGroup = useSelector(state => state.environment.realmGroup);

    return (
        <Grid container className={classes.stretchHeight}>
            <Grid item className={classes.verticalCenter}>
                <div>
                    <Typography>
                        <IconButton
                            color="inherit"
                            className={classes.iconButton}
                            onClick={() => dispatch(toggleNavigation())}
                        >
                            <MenuIcon fontSize="large" />
                        </IconButton>
                    </Typography>
                </div>
            </Grid>

            <Grid item className={classes.verticalCenter}>
                <div>
                    <Typography className={classes.textItem}>
                        <Tooltip
                            title={
                                realmGroup === "tauri"
                                    ? "Switch to WOTLK"
                                    : "Switch to MOP"
                            }
                        >
                            <Link
                                component={RouterLink}
                                to={`/`}
                                onClick={() =>
                                    dispatch(
                                        changeEnvironmentRealmGroup(
                                            realmGroup === "tauri"
                                                ? "crystalsong"
                                                : "tauri"
                                        )
                                    )
                                }
                            >
                                <img
                                    src={
                                        realmGroup === "tauri"
                                            ? mopIcon
                                            : wotlkIcon
                                    }
                                    alt="expansion"
                                    className={classes.expansionLogo}
                                />
                            </Link>
                        </Tooltip>
                    </Typography>
                </div>
            </Grid>
        </Grid>
    );
}

export default withStyles(styles)(NavItems);
