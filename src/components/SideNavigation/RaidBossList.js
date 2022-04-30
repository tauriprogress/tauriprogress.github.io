import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import withStyles from "@mui/styles/withStyles";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItemText from "@mui/material/ListItemText";

import Link from "../Link";

import { getRaidImg } from "../../helpers";

import { navigationToggle } from "../../redux/actions";

import { navBreakpoint } from "../../redux/navigation/reducer";

import { navigationItemSelector } from "../../redux/selectors";

function styles(theme) {
    return {
        title: {
            color: theme.palette.primary.contrastText,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundColor: theme.palette.primary.main,
        },
        nestedNavItem: {
            padding: theme.spacing(0.5),
            paddingLeft: theme.spacing(5),
        },
    };
}

function RaidBossList({ raid, classes }) {
    const [open, setOpen] = useState(true);
    const selected = useSelector(navigationItemSelector);
    const dispatch = useDispatch();

    return (
        <React.Fragment>
            <ListItem
                className={classes.title}
                onClick={() => setOpen(open ? false : true)}
                style={{
                    backgroundImage: `url("${getRaidImg(raid.image)}")`,
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
                        to={`/raid/${raid.name}`}
                        onClick={() => {
                            if (window.innerWidth < navBreakpoint) {
                                dispatch(navigationToggle(false));
                            }
                        }}
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
                    {raid.bosses.map((boss) => {
                        let linkTo = `/raid/${raid.name}/${boss.name}`;

                        return (
                            <Link
                                key={boss.name}
                                color="inherit"
                                to={linkTo}
                                onClick={() => {
                                    if (window.innerWidth < navBreakpoint) {
                                        dispatch(navigationToggle(false));
                                    }
                                }}
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

export default withStyles(styles)(React.memo(RaidBossList));
