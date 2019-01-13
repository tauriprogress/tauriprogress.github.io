import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import SearchBar from "../SearchBar";
import AdditionalInfo from "../AdditionalInfo";

import { raidName } from "../../constants/currentContent";

import { navToggle } from "../../redux/actions";

function Navigation({ nav, navToggle }) {
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
                <nav className={showNav ? "showNav" : "hide"}>
                    <ul>
                        <li>
                            <Link
                                to="/"
                                onClick={() => linkClick(showNav, navToggle)}
                                className="navOption"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`/raid/${raidName}`}
                                onClick={() => linkClick(showNav, navToggle)}
                                className="navOption"
                            >
                                {raidName}
                            </Link>
                        </li>
                        <li>
                            <SearchBar />
                        </li>
                    </ul>
                </nav>
                <AdditionalInfo />
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
    return bindActionCreators({ navToggle }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navigation);
