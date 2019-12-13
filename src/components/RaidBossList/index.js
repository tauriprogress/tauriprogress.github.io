import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { raidBossFetch, raidFetch } from "../../redux/actions";

function styles(theme) {
    return {
        container: {
            margin: "auto",
            display: "flex",
            justifyContent: "center"
        },
        card: {
            minWidth: "200px",
            maxWidth: "260px",
            margin: "0 10px 10px",
            flex: 1
        },
        title: {
            backgroundColor: theme.palette.primary.main,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            padding: theme.spacing(1),
            paddingTop: `${theme.spacing(1) + 7}px`,
            color: theme.baseColors.light,
            cursor: "pointer",
            "& p": {
                fontWeight: "bold"
            },
            "&:hover": {
                color: theme.palette.secondary.main
            }
        },
        listItem: {
            padding: theme.spacing(1.3),
            paddingLeft: theme.spacing(1.5)
        }
    };
}

function RaidBossList({ raid, classes, selected }) {
    const [open, setOpen] = useState(window.innerWidth > 600 ? true : false);

    const dispatch = useDispatch();

    return (
        <Container className={classes.container}>
            <Card className={classes.card}>
                <Grid
                    container
                    style={{
                        backgroundImage: "url(" + raid.picture + ")"
                    }}
                    justify="space-between"
                    className={classes.title}
                    onClick={() => setOpen(open ? false : true)}
                >
                    <Grid item>
                        <Typography>{raid.name}</Typography>
                    </Grid>
                    <Grid item>{open ? <ExpandLess /> : <ExpandMore />}</Grid>
                </Grid>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List disablePadding>
                        <Link
                            color="inherit"
                            component={RouterLink}
                            to={`/raid/${raid.name}`}
                            onClick={() => dispatch(raidFetch(raid.name))}
                        >
                            <Typography>
                                <ListItem
                                    component="li"
                                    button
                                    selected={selected === 0}
                                    className={classes.listItem}
                                    divider
                                >
                                    Summary
                                </ListItem>
                            </Typography>
                        </Link>
                        {raid.encounters.map((encounter, index) => {
                            let name = encounter.encounter_name;
                            let linkTo = `/raid/${raid.name}/${encounter.encounter_name}`;

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
                                                bossName:
                                                    encounter.encounter_name
                                            })
                                        )
                                    }
                                >
                                    <Typography>
                                        <ListItem
                                            component="li"
                                            button
                                            key={name}
                                            selected={selected === index + 1}
                                            className={classes.listItem}
                                            divider
                                        >
                                            {name}
                                        </ListItem>
                                    </Typography>
                                </Link>
                            );
                        })}
                    </List>
                </Collapse>
            </Card>
        </Container>
    );
}

export default withStyles(styles)(RaidBossList);
