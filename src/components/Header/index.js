import React, { useState } from "react";
import { useDispatch } from "react-redux";

import withStyles from '@mui/styles/withStyles';

import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";

import Brightness from "@mui/icons-material/Brightness4";

import Items from "./Items";

import discordIcon from "../../assets/social/discord.svg";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { themeToggle } from "../../redux/actions";

export const headerHeight = "55px";
const rightNavBreakpoint = "500px";

function styles(theme) {
    return {
        container: {
            height: headerHeight,
            "& header": {
                height: headerHeight,
                width: "100%",
                position: "fixed",
                zIndex: 1000,
                backgroundColor: theme.palette.background.lighter,
            },
        },
        iconButton: {
            "&:hover": {
                color: theme.palette.secondary.main,
            },
        },
        stretchHeight: {
            height: "100%",
        },
        verticalCenter: {
            display: "flex",
            alignItems: "center",
        },
        textItem: {
            fontWeight: "500",
            position: "relative",
        },
        customLink: {
            color: "inherit",
            textDecoration: "none",
            marginLeft: "26px",
        },
        discordLogo: {
            position: "absolute",
            left: 0,
            width: "24px",
            height: "24px",
            marginRight: "4px",
            transform: "translate(0, -2px)",
        },
        rightNavExtended: {
            [`@media(max-width: ${rightNavBreakpoint})`]: {
                display: "none",
            },
        },
        rightNavCompact: {
            [`@media(min-width: ${rightNavBreakpoint})`]: {
                display: "none",
            },
        },
        moreHorizIcon: {
            width: "30px",
            height: "30px",
        },
        horizontalCenter: {
            display: "flex",
            justifyContent: "center",
        },
        compactDiscord: {
            margin: "30px 10px 10px",
        },
    };
}

function Header({ classes }) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    return (
        <div className={classes.container}>
            <header>
                <Grid
                    container
                    justifyContent="space-between"
                    wrap="nowrap"
                    alignContent="center"
                    className={classes.stretchHeight}
                >
                    <Grid item className={classes.stretchHeight}>
                        <Items />
                    </Grid>
                    <Grid item>
                        <Grid
                            container
                            className={`${classes.rightNavExtended} ${classes.stretchHeight}`}
                        >
                            <Grid item className={classes.verticalCenter}>
                                <div>
                                    <Typography className={classes.textItem}>
                                        <a
                                            href="https://discordapp.com/invite/3RWayqd"
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            className={classes.customLink}
                                        >
                                            <img
                                                src={discordIcon}
                                                alt="Discord"
                                                className={classes.discordLogo}
                                            />
                                            Discord
                                        </a>
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item className={classes.verticalCenter}>
                                <div>
                                    <Typography>
                                        <IconButton
                                            color="inherit"
                                            className={classes.iconButton}
                                            onClick={() =>
                                                dispatch(themeToggle())
                                            }
                                            size="large">
                                            <Brightness fontSize="large" />
                                        </IconButton>
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.rightNavCompact}>
                            <Grid item className={classes.verticalCenter}>
                                <div>
                                    <Typography>
                                        <IconButton
                                            color="inherit"
                                            className={classes.iconButton}
                                            onClick={() => setOpen(!open)}
                                            size="large">
                                            <MoreHorizIcon
                                                className={
                                                    classes.moreHorizIcon
                                                }
                                            />
                                        </IconButton>
                                    </Typography>
                                </div>
                            </Grid>
                            <Drawer
                                open={open}
                                onClose={() => setOpen(false)}
                                anchor="right"
                            >
                                <Grid container direction="column">
                                    <Grid
                                        item
                                        className={`${classes.compactDiscord} ${classes.horizontalCenter} ${classes.verticalCenter}`}
                                    >
                                        <div>
                                            <Typography
                                                className={classes.textItem}
                                            >
                                                <a
                                                    href="https://discordapp.com/invite/3RWayqd"
                                                    target="_blank"
                                                    rel="noreferrer noopener"
                                                    className={
                                                        classes.customLink
                                                    }
                                                >
                                                    <img
                                                        src={discordIcon}
                                                        alt="Discord"
                                                        className={
                                                            classes.discordLogo
                                                        }
                                                    />
                                                    Discord
                                                </a>
                                            </Typography>
                                        </div>
                                    </Grid>
                                    <Grid
                                        item
                                        className={classes.horizontalCenter}
                                    >
                                        <IconButton
                                            color="inherit"
                                            onClick={() =>
                                                dispatch(themeToggle())
                                            }
                                            size="large">
                                            <Brightness fontSize="large" />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Drawer>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider />
            </header>
        </div>
    );
}
/*
;*/

export default withStyles(styles)(Header);
