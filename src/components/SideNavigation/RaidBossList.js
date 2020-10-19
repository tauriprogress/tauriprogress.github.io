import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Link from "@material-ui/core/Link";
import ListItemText from "@material-ui/core/ListItemText";

import { raidImg } from "../../helpers";

import { toggleNavigation } from "../../redux/actions";

import { navBreakpoint } from "../../redux/reducers/navigationReducer";

function styles(theme) {
    return {
        title: {
            color: theme.palette.primary.contrastText,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
        },
        nestedNavItem: {
            padding: theme.spacing(0.5),
            paddingLeft: theme.spacing(5)
        }
    };
}

function RaidBossList({ raid, classes }) {
    const [open, setOpen] = useState(true);
    const selected = useSelector(state => state.navigation.selected);
    const dispatch = useDispatch();

    return (
        <React.Fragment>
            <ListItem
                className={classes.title}
                onClick={() => setOpen(open ? false : true)}
                style={{
                    backgroundImage: `url("${raidImg(raid.image)}")`
                }}
                button
            >
                <ListItemText primary={raid.name} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto">
                <List disablePadding>
                    <Link
                        color="inherit"
                        component={RouterLink}
                        to={`/raid/${raid.name}`}
                        onClick={() =>
                            window.innerWidth < navBreakpoint &&
                            dispatch(toggleNavigation(false))
                        }
                    >
                        <ListItem
                            component="li"
                            button
                            selected={selected === raid.name}
                            className={classes.nestedNavItem}
                        >
                            <ListItemText primary={"Summary"} />
                        </ListItem>
                    </Link>
                    {raid.bosses.map((a, index) => {
                        const boss =
                            raid.bosses[raid.bosses.length - 1 - index];
                        let linkTo = `/raid/${raid.name}/${boss.name}`;

                        return (
                            <Link
                                key={boss.name}
                                color="inherit"
                                component={RouterLink}
                                to={linkTo}
                                onClick={() =>
                                    window.innerWidth < navBreakpoint &&
                                    dispatch(toggleNavigation(false))
                                }
                            >
                                <ListItem
                                    button
                                    selected={selected === boss.name}
                                    className={classes.nestedNavItem}
                                >
                                    <ListItemText primary={boss.name} />
                                </ListItem>
                            </Link>
                        );
                    })}
                </List>
            </Collapse>
        </React.Fragment>
    );
}

export default withStyles(styles)(RaidBossList);
