import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import Collapse from "@material-ui/core/Collapse";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import ListIcon from "@material-ui/icons/List";

import SearchGuild from "../SearchGuild";
import SearchCharacter from "../SearchCharacter";
import RaidBossList from "./RaidBossList";
import Link from "../Link";

import { navigationToggle } from "../../redux/actions";

import { navigationOpenSelector } from "../../redux/selectors";

import { navBreakpoint } from "../../redux/navigation/reducer";

import { headerHeight } from "../Header";

function styles(theme) {
    const width = 240;
    return {
        aside: {
            width: `${width}px`,
            [`@media only screen and (max-width: ${navBreakpoint}px)`]: {
                display: "none"
            }
        },
        container: {
            position: "fixed",
            width: `${width}px`,
            height: `calc(100% - ${headerHeight})`,
            overflowX: "hidden"
        },
        nav: {
            height: "100%",
            width: `${width + 17}px`,
            overflowY: "scroll",
            backgroundColor: theme.palette.background.lighter,
            [`@media only screen and (max-width: ${navBreakpoint}px)`]: {
                width: `${width}px`
            },
            "& > ul": {
                marginBottom: "20px"
            }
        },
        nestedNavItem: {
            paddingLeft: theme.spacing(5)
        }
    };
}

function NavigationContainer({ classes }) {
    const open = useSelector(navigationOpenSelector);

    const dispatch = useDispatch();

    return open ? (
        <React.Fragment>
            <aside className={classes.aside}>
                <div className={classes.container}>
                    <Navigation
                        classes={{
                            container: classes.nav,
                            nestedNavItem: classes.nestedNavItem
                        }}
                    />
                </div>
            </aside>
            {window.innerWidth < navBreakpoint && (
                <Drawer
                    open={open}
                    onClose={() => dispatch(navigationToggle(false))}
                    anchor="left"
                >
                    <Navigation
                        classes={{
                            container: classes.nav,
                            nestedNavItem: classes.nestedNavItem
                        }}
                    />
                </Drawer>
            )}
        </React.Fragment>
    ) : null;
}

function Navigation({ classes = {} }) {
    const [searchOpen, setSearchOpen] = React.useState(false);
    const [leaderboardOpen, setLeaderboardOpen] = React.useState(false);

    const dispatch = useDispatch();

    const searchClick = () => {
        setSearchOpen(!searchOpen);
    };

    const leaderboardClick = () => {
        setLeaderboardOpen(!leaderboardOpen);
    };

    function toggleNav() {
        window.innerWidth < navBreakpoint && dispatch(navigationToggle(false));
    }

    return (
        <nav className={classes.container}>
            <List>
                <Link to={`/`} onClick={toggleNav}>
                    <ListItem button>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                </Link>

                <ListItem button onClick={leaderboardClick}>
                    <ListItemIcon>
                        <ListIcon />
                    </ListItemIcon>
                    <ListItemText primary="Leaderboard" />
                    {leaderboardOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={leaderboardOpen} timeout="auto" unmountOnExit>
                    <Link onClick={toggleNav} to={`/leaderboard/character`}>
                        <ListItem button className={classes.nestedNavItem}>
                            <ListItemText primary="Character" />
                        </ListItem>
                    </Link>
                    <Link onClick={toggleNav} to={`/leaderboard/guild`}>
                        <ListItem button className={classes.nestedNavItem}>
                            <ListItemText primary="Guild" />
                        </ListItem>
                    </Link>
                </Collapse>

                <ListItem button onClick={searchClick}>
                    <ListItemIcon>
                        <SearchIcon />
                    </ListItemIcon>
                    <ListItemText primary="Search" />
                    {searchOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={searchOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem className={classes.nestedNavItem}>
                            <SearchGuild />
                        </ListItem>
                        <ListItem className={classes.nestedNavItem}>
                            <SearchCharacter />
                        </ListItem>
                    </List>
                </Collapse>

                <DisplayRaidLists />
            </List>
        </nav>
    );
}

function DisplayRaidLists() {
    const raids = useSelector(state => state.environment.currentContent.raids);

    return raids.map(raid => <RaidBossList raid={raid} key={raid.name} />);
}

export default withStyles(styles)(NavigationContainer);
