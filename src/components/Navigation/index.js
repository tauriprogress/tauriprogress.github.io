import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Brightness from "@material-ui/icons/Brightness4";
import Fab from "@material-ui/core/Fab";
import Drawer from "@material-ui/core/Drawer";

import NavLinks from "./NavLinks";
import AdditionalInfo from "../AdditionalInfo";
import { navToggle, themeToggle } from "../../redux/actions";

function styles(theme) {
    return {
        nav: {
            backgroundColor: theme.palette.primary.main
        }
    };
}

class Navigation extends React.Component {
    render() {
        const { showNav, themeToggle, navToggle } = this.props;
        return (
            <AppBar position="static">
                <Toolbar className="navToolBar">
                    <IconButton
                        color="inherit"
                        aria-label="Menu"
                        className="burger"
                        onClick={() => navToggle(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div className="desktopNav">
                        <NavLinks />
                    </div>
                    <Drawer
                        anchor="top"
                        open={showNav}
                        onClose={() => navToggle(false)}
                    >
                        <NavLinks />
                    </Drawer>
                    <div className="navToolBarIcons">
                        <div className="navToolBarIconContainer">
                            <Tooltip title="Toggle theme">
                                <Fab
                                    color="primary"
                                    size="small"
                                    onClick={themeToggle}
                                >
                                    <Brightness fontSize="large" />
                                </Fab>
                            </Tooltip>
                        </div>
                        <div className="navToolBarIconContainer">
                            <AdditionalInfo />
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

function mapStateToProps(state) {
    return {
        showNav: state.nav.showNav
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ themeToggle, navToggle }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Navigation));
