import React from "react";
import { useSelector, useDispatch } from "react-redux";

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

function Navigation(props) {
    const showNav = useSelector(state => state.nav.showNav);
    const dispatch = useDispatch();

    return (
        <AppBar position="static">
            <Toolbar className="navToolBar">
                <IconButton
                    color="inherit"
                    aria-label="Menu"
                    className="burger"
                    onClick={() => dispatch(navToggle(true))}
                >
                    <MenuIcon />
                </IconButton>
                <div className="desktopNav">
                    <NavLinks />
                </div>
                <Drawer
                    anchor="top"
                    open={showNav}
                    onClose={() => dispatch(navToggle(false))}
                >
                    <NavLinks />
                </Drawer>
                <div className="navToolBarIcons">
                    <div className="navToolBarIconContainer">
                        <Tooltip title="Toggle theme">
                            <Fab
                                color="primary"
                                size="small"
                                onClick={() => dispatch(themeToggle())}
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

export default withStyles(styles)(Navigation);
