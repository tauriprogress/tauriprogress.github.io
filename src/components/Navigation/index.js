import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { raidName } from "../../constants/currentContent";

import { toggleNav } from "../../redux/actions";

function Navigation({ nav, toggleNav }) {
    const { showNav } = nav;

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="Menu"
                    className="burger"
                    onClick={() => toggleNav()}
                >
                    <MenuIcon />
                </IconButton>
                <nav className={showNav ? "showNav" : "hide"}>
                    <ul>
                        <li>
                            <Link
                                to="/"
                                onClick={() => linkClick(showNav, toggleNav)}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`/raid/${raidName}`}
                                onClick={() => linkClick(showNav, toggleNav)}
                            >
                                {raidName}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/guild"
                                onClick={() => linkClick(showNav, toggleNav)}
                            >
                                Guild
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/player"
                                onClick={() => linkClick(showNav, toggleNav)}
                            >
                                Player
                            </Link>
                        </li>
                    </ul>
                </nav>
                {showNav && (
                    <div className="cover" onClick={() => toggleNav()} />
                )}
            </Toolbar>
        </AppBar>
    );
}

function linkClick(showNav, toggleNav) {
    if (showNav) {
        toggleNav(false);
    }
}

function mapStateToProps(state) {
    return {
        nav: state.nav
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ toggleNav }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navigation);
