import { raidName } from "tauriprogress-constants/currentContent";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link as RouterLink } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Brightness from "@material-ui/icons/Brightness4";
import Fab from "@material-ui/core/Fab";
import Link from "@material-ui/core/Link";
import { Typography } from "@material-ui/core";

import SearchBar from "../SearchBar";
import AdditionalInfo from "../AdditionalInfo";
import { navToggle, themeToggle, raidSelectBoss } from "../../redux/actions";

function styles(theme) {
    return {
        nav: {
            backgroundColor: theme.palette.primary.main
        }
    };
}

function Navigation({ nav, navToggle, themeToggle, classes, raidSelectBoss }) {
    const { showNav } = nav;
    return (
        <AppBar position="static">
            <Toolbar className="navToolBar">
                <IconButton
                    color="inherit"
                    aria-label="Menu"
                    className="burger"
                    onClick={() => navToggle()}
                >
                    <MenuIcon />
                </IconButton>
                <nav
                    className={
                        showNav
                            ? `${classes.nav} showNav`
                            : `${classes.nav} hide`
                    }
                >
                    <ul>
                        <li>
                            <RouterLink
                                to="/"
                                onClick={() => linkClick(showNav, navToggle)}
                                className="navOption"
                            >
                                <Typography color="inherit">
                                    <Link component="span" color="inherit">
                                        Home
                                    </Link>
                                </Typography>
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                to={`/raid/${raidName}`}
                                onClick={() => {
                                    raidSelectBoss(0);
                                    linkClick(showNav, navToggle);
                                }}
                                className="navOption"
                            >
                                <Typography color="inherit">
                                    <Link component="span" color="inherit">
                                        {raidName}
                                    </Link>
                                </Typography>
                            </RouterLink>
                        </li>
                        <li>
                            <Typography color="inherit">
                                <Link component="span" color="inherit">
                                    <SearchBar />
                                </Link>
                            </Typography>
                        </li>
                    </ul>
                </nav>
                <div className="navToolBarIcons">
                    <Tooltip title="Toggle theme">
                        <Fab color="primary" size="small" onClick={themeToggle}>
                            <Brightness fontSize="large" />
                        </Fab>
                    </Tooltip>

                    <AdditionalInfo />
                </div>
                {showNav && (
                    <div className="cover" onClick={() => navToggle()} />
                )}
            </Toolbar>
        </AppBar>
    );
}

function linkClick(showNav, navToggle) {
    if (showNav) {
        navToggle(false);
    }
}

function mapStateToProps(state) {
    return {
        nav: state.nav
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        { navToggle, themeToggle, raidSelectBoss },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Navigation));
