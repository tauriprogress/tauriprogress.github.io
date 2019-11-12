import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Card from "@material-ui/core/Card";

import { raidBossFetch, raidFetch } from "../../redux/actions";

function styles(theme) {
    return {
        listItem: {
            "&:hover *": {
                color: `${theme.palette.secondary.main} !important`
            }
        },
        listTitle: {
            backgroundColor: `${theme.palette.primary.main} !important`,
            "& *": {
                color: theme.palette.primary.contrastText
            }
        },
        container: {
            backgroundColor: theme.palette.backgroundAccent
        }
    };
}

function RaidBossList({ raid, classes, selected }) {
    const [open, setOpen] = useState(window.innerWidth > 600 ? true : false);

    const dispatch = useDispatch();

    return (
        <Card className={`${classes.container} raidBossList`}>
            <ListItem
                className={`raidBossListTitle ${classes.listItem} ${classes.listTitle}`}
                button
                onClick={() => setOpen(open ? false : true)}
                style={{
                    background: "url(" + raid.picture + ")"
                }}
            >
                <ListItemText inset primary={raid.name} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List disablePadding>
                    <ListItem
                        className={classes.listItem}
                        component="li"
                        button
                        selected={selected === 0}
                    >
                        <RouterLink
                            to={`/raid/${raid.name}`}
                            onClick={() => dispatch(raidFetch(raid.name))}
                        >
                            <ListItemText primary="Summary" />
                        </RouterLink>
                    </ListItem>
                    {raid.encounters.map((encounter, index) => {
                        let name = encounter.encounter_name;
                        let linkTo = `/raid/${raid.name}/${encounter.encounter_name}`;

                        return (
                            <ListItem
                                className={classes.listItem}
                                component="li"
                                button
                                key={name}
                                classes={{
                                    selected: classes.listItemSelected
                                }}
                                selected={selected === index + 1}
                            >
                                <RouterLink
                                    to={linkTo}
                                    onClick={() =>
                                        dispatch(
                                            raidBossFetch({
                                                raidName: raid.name,
                                                bossName:
                                                    encounter.encounter_name
                                            })
                                        )
                                    }
                                >
                                    <ListItemText primary={name} />
                                </RouterLink>
                            </ListItem>
                        );
                    })}
                </List>
            </Collapse>
        </Card>
    );
}

export default withStyles(styles)(RaidBossList);
