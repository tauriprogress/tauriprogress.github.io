import { raidName } from "tauriprogress-constants/currentContent";
import React from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import SearchBar from "../SearchBar";

import { navToggle, raidSelectBoss } from "../../redux/actions";

import discordIcon from "../../assets/social/discord.svg";

function styles(theme) {
    return {
        navItem: {
            margin: theme.spacing(2),
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
            top: 0,
            left: 0,
            width: "24px",
            height: "24px",
            marginRight: "4px",
            transform: "translate(0, -2px)"
        }
    };
}

function NavItems({ classes }) {
    const dispatch = useDispatch();

    return (
        <React.Fragment>
            <Grid item>
                <Typography className={classes.navItem}>
                    <Link
                        component={RouterLink}
                        to="/"
                        onClick={() => {
                            dispatch(navToggle(false));
                        }}
                        color="inherit"
                    >
                        Home
                    </Link>
                </Typography>
            </Grid>

            <Grid item>
                <Typography className={classes.navItem}>
                    <Link
                        component={RouterLink}
                        to={`/raid/${raidName}`}
                        onClick={() => {
                            dispatch(navToggle(false));
                            dispatch(raidSelectBoss(0));
                        }}
                        color="inherit"
                    >
                        {raidName}
                    </Link>
                </Typography>
            </Grid>
            <Grid item>
                <Typography className={classes.navItem}>
                    <Link color="inherit">
                        <SearchBar />
                    </Link>
                </Typography>
            </Grid>
            <Grid item>
                <Typography className={classes.navItem}>
                    <a
                        href="https://discordapp.com/invite/3RWayqd"
                        target="_blank"
                        rel="noreferrer noopener"
                        className={classes.customLink}
                    >
                        <img
                            src={discordIcon}
                            alt="discord"
                            className={classes.discordLogo}
                        />
                        Discord
                    </a>
                </Typography>
            </Grid>
        </React.Fragment>
    );
}

export default withStyles(styles)(NavItems);
