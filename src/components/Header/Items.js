import React from "react";
import { useDispatch } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";

import { navToggle } from "../../redux/actions";

import discordIcon from "../../assets/social/discord.svg";

function styles(theme) {
    return {
        iconButton: {
            margin: 8,
            padding: 3,
            "&:hover": {
                color: theme.palette.secondary.main
            }
        },
        textItem: {
            margin: theme.spacing(2) + 2,
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
        <Grid container>
            <Grid item>
                <Typography>
                    <IconButton
                        color="inherit"
                        className={classes.iconButton}
                        onClick={() => dispatch(navToggle())}
                    >
                        <MenuIcon fontSize="large" />
                    </IconButton>
                </Typography>
            </Grid>
            <Grid item>
                <Typography className={classes.textItem}>
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
        </Grid>
    );
}

export default withStyles(styles)(NavItems);
