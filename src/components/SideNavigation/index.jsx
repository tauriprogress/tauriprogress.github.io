import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/system";

import Collapse from "@mui/material/Collapse";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Cookie from "@mui/icons-material/Cookie";
import SearchIcon from "@mui/icons-material/Search";
import ListIcon from "@mui/icons-material/List";
import HomeIcon from "../HomeIcon";

import SearchGuild from "../SearchGuild";
import SearchCharacter from "../SearchCharacter";
import RaidBossList from "./RaidBossList";
import Link from "../Link";

import { navigationToggle } from "../../redux/actions";

import {
    navigationOpenSelector,
    environmentRaidsSelector,
} from "../../redux/selectors";

import { navBreakpoint } from "../../redux/navigation/reducer";

import { headerHeight } from "../Header";

const width = 240;

const Aside = styled("aside")({
    width: `${width}px`,
    [`@media only screen and (max-width: ${navBreakpoint}px)`]: {
        display: "none",
    },
});

const NavContainer = styled("div")({
    position: "fixed",
    width: `${width}px`,
    height: `calc(100% - ${headerHeight})`,
    overflowX: "hidden",
});

const Nav = styled("nav")(({ theme }) => ({
    height: "100%",
    width: width,
    overflowY: "scroll",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
        display: "none",
    },
    backgroundColor: theme.palette.background.darker,
    [`@media only screen and (max-width: ${navBreakpoint}px)`]: {
        width: `${width}px`,
    },
    "& > ul": {
        marginBottom: "20px",
    },
}));

const NestedListItem = styled(ListItem)(({ theme }) => ({
    paddingLeft: theme.spacing(5),
}));

export const NestedListItemButton = styled(ListItemButton)(({ theme }) => ({
    paddingLeft: theme.spacing(5),
}));

function NavigationContainer({ classes }) {
    const open = useSelector(navigationOpenSelector);

    const dispatch = useDispatch();

    return open ? (
        <React.Fragment>
            <Aside>
                <NavContainer>
                    <Navigation />
                </NavContainer>
            </Aside>
            {window.innerWidth < navBreakpoint && (
                <Drawer
                    open={open}
                    onClose={() => dispatch(navigationToggle(false))}
                    anchor="left"
                >
                    <Navigation />
                </Drawer>
            )}
        </React.Fragment>
    ) : null;
}

function Navigation() {
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
        <Nav>
            <List disablePadding>
                <Link to={`/`} onClick={toggleNav}>
                    <ListItemButton>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </Link>

                <Link to={`/guilds`} onClick={toggleNav}>
                    <ListItemButton>
                        <ListItemIcon>
                            <Cookie />
                        </ListItemIcon>
                        <ListItemText primary="Guilds" />
                    </ListItemButton>
                </Link>

                <ListItemButton onClick={leaderboardClick}>
                    <ListItemIcon>
                        <ListIcon />
                    </ListItemIcon>
                    <ListItemText primary="Leaderboard" />
                    {leaderboardOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={leaderboardOpen} timeout="auto" unmountOnExit>
                    <Link onClick={toggleNav} to={`/leaderboard/character`}>
                        <NestedListItemButton>
                            <ListItemText primary="Character" />
                        </NestedListItemButton>
                    </Link>
                    <Link onClick={toggleNav} to={`/leaderboard/guild`}>
                        <NestedListItemButton>
                            <ListItemText primary="Guild" />
                        </NestedListItemButton>
                    </Link>
                </Collapse>

                <ListItemButton onClick={searchClick}>
                    <ListItemIcon>
                        <SearchIcon />
                    </ListItemIcon>
                    <ListItemText primary="Search" />
                    {searchOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={searchOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <NestedListItem>
                            <SearchGuild />
                        </NestedListItem>
                        <NestedListItem>
                            <SearchCharacter />
                        </NestedListItem>
                    </List>
                </Collapse>

                <DisplayRaidLists />
            </List>
        </Nav>
    );
}

function DisplayRaidLists() {
    const raids = useSelector(environmentRaidsSelector);

    return raids.map((raid) => <RaidBossList raid={raid} key={raid.name} />);
}

export default NavigationContainer;
