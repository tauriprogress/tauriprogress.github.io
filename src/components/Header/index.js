import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";

import Brightness from "@material-ui/icons/Brightness4";

import Items from "./Items";
import AdditionalInfo from "../AdditionalInfo";

import discordIcon from "../../assets/social/discord.svg";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

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
                backgroundColor: theme.palette.background.lighter
            }
        },
        iconButton: {
            "&:hover": {
                color: theme.palette.secondary.main
            }
        },
        stretchHeight: {
            height: "100%"
        },
        verticalCenter: {
            display: "flex",
            alignItems: "center"
        },
        textItem: {
            fontWeight: "500",
            position: "relative"
        },
        customLink: {
            color: "inherit",
            textDecoration: "none",
            marginLeft: "26px"
        },
        discordLogo: {
            position: "absolute",
            left: 0,
            width: "24px",
            height: "24px",
            marginRight: "4px",
            transform: "translate(0, -2px)"
        },
        rightNavExtended: {
            [`@media(max-width: ${rightNavBreakpoint})`]: {
                display: "none"
            }
        },
        rightNavCompact: {
            [`@media(min-width: ${rightNavBreakpoint})`]: {
                display: "none"
            }
        },
        moreHorizIcon: {
            width: "30px",
            height: "30px"
        },
        horizontalCenter: {
            display: "flex",
            justifyContent: "center"
        },
        compactDiscord: {
            margin: "30px 10px 10px"
        }
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
                    justify="space-between"
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
                                        >
                                            <Brightness fontSize="large" />
                                        </IconButton>
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item className={classes.verticalCenter}>
                                <div>
                                    <Typography>
                                        <IconButton
                                            color="inherit"
                                            className={classes.iconButton}
                                        >
                                            <AdditionalInfo />
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
                                        >
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
                                        >
                                            <Brightness fontSize="large" />
                                        </IconButton>
                                    </Grid>
                                    <Grid
                                        item
                                        className={classes.horizontalCenter}
                                    >
                                        <Typography>
                                            <IconButton color="inherit">
                                                <AdditionalInfo />
                                            </IconButton>
                                        </Typography>
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
