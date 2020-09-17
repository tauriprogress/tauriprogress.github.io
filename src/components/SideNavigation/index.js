import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import Drawer from "@material-ui/core/Drawer";

import { navToggle } from "../../redux/actions";

import { navBreakpoint } from "../../redux/reducers/navReducer";

function styles() {
    const width = "250px";
    return {
        aside: {
            width: width,
            [`@media only screen and (max-width: ${navBreakpoint}px)`]: {
                display: "none"
            }
        },
        container: {
            position: "fixed",
            width: width
        },
        nav: {
            width: width
        }
    };
}

function NavigationContainer({ classes }) {
    const open = useSelector(state => state.navigation.open);

    const dispatch = useDispatch();

    return open ? (
        <React.Fragment>
            <aside className={classes.aside}>
                <div className={classes.container}>
                    <Navigation />
                </div>
            </aside>
            {window.innerWidth < navBreakpoint && (
                <Drawer
                    open={open}
                    onClose={() => dispatch(navToggle(false))}
                    anchor="left"
                >
                    <Navigation classes={{ container: classes.nav }} />
                </Drawer>
            )}
        </React.Fragment>
    ) : null;
}

function Navigation({ classes = {} }) {
    return (
        <nav className={classes.container}>
            this is the side navigation with some longer than usual text that
            takes most of the available space
        </nav>
    );
}

export default withStyles(styles)(NavigationContainer);
