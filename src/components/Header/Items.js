import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { Link as RouterLink } from "react-router-dom";

import { push } from "connected-react-router";

import { withStyles } from "@material-ui/core/styles";

import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";

import {
    navigationToggle,
    environmentSetRealmGroup,
    environmentToggleSeason
} from "../../redux/actions";

import {
    environmentIsSeasonalSelector,
    environmentNextSeasonNameSelector,
    environmentSeasonNameSelector,
    environmentRealmGroupSelector,
    environmentHasSeasonalSelector
} from "../../redux/selectors";

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
        },
        seasonButton: {
            padding: 10,
            marginLeft: "10px",
            height: "100%",
            fontSize: `${18 / 16}rem`,
            position: "relative",
            "&:hover span": {
                "-webkit-text-fill-color": theme.palette.text.primary,
                "&:after": {
                    textShadow: "none"
                }
            }
        },
        seasonButtonText: {
            color: theme.palette.text.disabled
        },
        seasonButtonTextActive: {
            background:
                "-webkit-linear-gradient(top,#efd100,#e2a233 19%,#f0c328 30%,#fff1a3 43%,#ffe13e 50%,#fff 51%,#fff)",
            backgroundClip: "border-box",
            "-webkit-background-clip": "text",
            "-webkit-text-fill-color": "transparent",
            color: "#f8b700",
            position: "relative",
            "&:after": {
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
                content: "attr(data-text)",
                zIndex: -1,
                "-webkit-background-clip": "background",
                textShadow:
                    "0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000"
            }
        }
    };
}

function NavItems({ classes }) {
    const dispatch = useDispatch();
    const { realmGroup, hasSeasonal, seasonName, nextSeasonName, isSeasonal } =
        useSelector(
            state => ({
                realmGroup: environmentRealmGroupSelector(state),
                hasSeasonal: environmentHasSeasonalSelector(state),
                seasonName: environmentSeasonNameSelector(state),
                nextSeasonName: environmentNextSeasonNameSelector(state),
                isSeasonal: environmentIsSeasonalSelector(state)
            }),
            shallowEqual
        );

    function seasonalSwitch() {
        if (hasSeasonal) {
            if (isSeasonal) {
                dispatch(push("/"));
                dispatch(environmentToggleSeason());
            } else {
                dispatch(push("/seasonal/"));
                dispatch(environmentToggleSeason());
            }
        }
    }

    return (
        <Grid container className={classes.stretchHeight}>
            <Grid item className={classes.verticalCenter}>
                <div>
                    <Typography>
                        <IconButton
                            color="inherit"
                            className={classes.iconButton}
                            onClick={() => dispatch(navigationToggle())}
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
                                        environmentSetRealmGroup(
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
                                    alt={`Expansion ${
                                        realmGroup === "tauri" ? "MOP" : "WOTLK"
                                    }`}
                                    className={classes.expansionLogo}
                                />
                            </Link>
                        </Tooltip>
                    </Typography>
                </div>
            </Grid>
            {hasSeasonal && (seasonName || nextSeasonName) && (
                <Grid item className={classes.verticalCenter}>
                    <Button
                        className={classes.seasonButton}
                        onClick={seasonalSwitch}
                    >
                        <span
                            className={
                                isSeasonal
                                    ? classes.seasonButtonTextActive
                                    : classes.seasonButtonText
                            }
                            data-text={seasonName || nextSeasonName}
                            style={{}}
                        >
                            {seasonName || nextSeasonName}
                        </span>
                    </Button>
                </Grid>
            )}
        </Grid>
    );
}

export default withStyles(styles)(NavItems);
