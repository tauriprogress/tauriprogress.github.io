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

function styles(theme) {
    return {
        navItem: {
            margin: theme.spacing(2),
            fontWeight: "500"
        },
        customLink: {
            color: "inherit",
            textDecoration: "none"
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
                        Discord
                    </a>
                </Typography>
            </Grid>
        </React.Fragment>
    );
}

export default withStyles(styles)(NavItems);
