import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { guildSelectBoss } from "../../redux/actions";

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
            margin: `0 ${theme.spacing(1)}px ${theme.spacing(1)}px`,
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
            "&:hover *": {
                color: `${theme.palette.secondary.main} !important`
            },
            padding: theme.spacing(0.5),
            paddingLeft: theme.spacing(1.5)
        },
        bossDefeated: {
            borderLeft: `8px solid ${theme.palette.progStateColors.defeated}`
        },
        bossAlive: {
            borderLeft: `8px solid ${theme.palette.progStateColors.alive}`
        }
    };
}

function GuildRaidBossList({ raid, classes }) {
    const [open, setOpen] = useState(window.innerWidth > 600 ? true : false);
    const selectedBossName = useSelector(state => state.guild.selectedBossName);
    const dispatch = useDispatch();

    return (
        <Container className={classes.container}>
            <Card className={classes.card}>
                <Grid
                    container
                    onClick={() => setOpen(open ? false : true)}
                    className={classes.title}
                    style={{
                        backgroundImage: "url(" + raid.picture + ")"
                    }}
                    justify="space-between"
                >
                    <Grid item>
                        <Typography>{raid.name}</Typography>
                    </Grid>
                    <Grid item>{open ? <ExpandLess /> : <ExpandMore />}</Grid>
                </Grid>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List disablePadding>
                        {raid.encounters.map((encounter, index) => (
                            <Typography key={encounter.encounter_name}>
                                <ListItem
                                    component="li"
                                    button
                                    className={`${classes.listItem} ${
                                        encounter.defeated
                                            ? classes.bossDefeated
                                            : classes.bossAlive
                                    }`}
                                    selected={
                                        selectedBossName ===
                                        encounter.encounter_name
                                    }
                                    onClick={() =>
                                        dispatch(
                                            guildSelectBoss({
                                                selectedRaidName: raid.name,
                                                selectedBossName:
                                                    encounter.encounter_name
                                            })
                                        )
                                    }
                                >
                                    {encounter.encounter_name}
                                </ListItem>
                            </Typography>
                        ))}
                    </List>
                </Collapse>
            </Card>
        </Container>
    );
}

export default withStyles(styles)(GuildRaidBossList);
