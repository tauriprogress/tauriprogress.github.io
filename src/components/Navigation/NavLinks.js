import { raidName } from "tauriprogress-constants/currentContent";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link as RouterLink } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import { Typography } from "@material-ui/core";

import SearchBar from "../SearchBar";
import { navToggle, raidSelectBoss } from "../../redux/actions";

function styles(theme) {
    return {
        nav: {
            backgroundColor: theme.palette.primary.main
        },
        li: {
            color: theme.palette.primary.contrastText
        }
    };
}

function NavLinks({ classes, raidSelectBoss, navToggle }) {
    return (
        <nav className={classes.nav}>
            <ul>
                <li className={classes.li} onClick={() => navToggle(false)}>
                    <RouterLink to="/">
                        <Typography color="inherit" className="navOption">
                            <Link component="span" color="inherit">
                                Home
                            </Link>
                        </Typography>
                    </RouterLink>
                </li>
                <li className={classes.li}>
                    <RouterLink
                        to={`/raid/${raidName}`}
                        onClick={() => {
                            navToggle(false);
                            raidSelectBoss(0);
                        }}
                    >
                        <Typography color="inherit" className="navOption">
                            <Link component="span" color="inherit">
                                {raidName}
                            </Link>
                        </Typography>
                    </RouterLink>
                </li>
                <li className={classes.li}>
                    <Typography color="inherit" className="navOption">
                        <Link component="span" color="inherit">
                            <SearchBar />
                        </Link>
                    </Typography>
                </li>
            </ul>
        </nav>
    );
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ raidSelectBoss, navToggle }, dispatch);
}

export default connect(
    null,
    mapDispatchToProps
)(withStyles(styles)(NavLinks));
