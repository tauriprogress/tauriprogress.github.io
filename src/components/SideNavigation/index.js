import React from "react";
import { useDispatch, useSelector } from "react-redux";

import withStyles from '@mui/styles/withStyles';

import Collapse from "@mui/material/Collapse";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ListIcon from "@mui/icons-material/List";

import SearchGuild from "../SearchGuild";
import SearchCharacter from "../SearchCharacter";
import RaidBossList from "./RaidBossList";
import Link from "../Link";

import { navigationToggle } from "../../redux/actions";

import {
    navigationOpenSelector,
    environmentRaidsSelector
} from "../../redux/selectors";

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
    const raids = useSelector(environmentRaidsSelector);

    return raids.map(raid => <RaidBossList raid={raid} key={raid.name} />);
}

export default withStyles(styles)(NavigationContainer);
