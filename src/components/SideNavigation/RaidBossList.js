import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Link from "@material-ui/core/Link";
import ListItemText from "@material-ui/core/ListItemText";

import { raidBossFetch, raidFetch } from "../../redux/actions";

import { raidImg } from "../../helpers";

function styles(theme) {
    return {
        title: {
            color: theme.palette.primary.contrastText,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
        },
        nestedNavItem: {
            paddingLeft: theme.spacing(4)
        }
    };
}

function RaidBossList({ raid, classes, selected }) {
    const [open, setOpen] = useState(true);

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
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List disablePadding>
                    <Link
                        color="inherit"
                        component={RouterLink}
                        to={`/raid/${raid.name}`}
                        onClick={() => dispatch(raidFetch(raid.name))}
                    >
                        <ListItem
                            component="li"
                            button
                            selected={selected === 0}
                            className={classes.nestedNavItem}
                        >
                            <ListItemText primary={"Summary"} />
                        </ListItem>
                    </Link>
                    {raid.bosses.reverse().map((boss, index) => {
                        let name = boss.name;
                        let linkTo = `/raid/${raid.name}/${boss.name}`;

                        return (
                            <Link
                                key={name}
                                color="inherit"
                                component={RouterLink}
                                to={linkTo}
                                onClick={() =>
                                    dispatch(
                                        raidBossFetch({
                                            raidName: raid.name,
                                            bossName: boss.name
                                        })
                                    )
                                }
                            >
                                <ListItem
                                    button
                                    key={name}
                                    selected={selected === index + 1}
                                    className={classes.nestedNavItem}
                                >
                                    <ListItemText primary={name} />
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
