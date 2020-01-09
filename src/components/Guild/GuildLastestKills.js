import { difficultyLabels } from "tauriprogress-constants";
import React from "react";

import { withStyles } from "@material-ui/core/styles";

import { Link as RouterLink } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import CollapsableList from "../CollapseableList";

import { useSelector } from "react-redux";
import {
    days,
    getLatestWednesday,
    dateTextByWeek,
    dateToString,
    dateTextHours
} from "../../helpers";

function styles(theme) {
    return {
        listItem: {
            display: "block"
        },
        container: {
            maxWidth: "600px",
            margin: "auto",
            padding: theme.spacing(1)
        },
        bold: {
            fontWeight: "bold"
        },
        bossNameContainer: {
            paddingRight: theme.spacing(1)
        }
    };
}

function GuildLastestKills({ classes }) {
    const { latestKills, realm } = useSelector(state => ({
        latestKills: state.guild.data.progression.latestKills,
        realm: state.guild.data.realm
    }));

    const currentTime = new Date().getTime();
    const week = 1000 * 60 * 60 * 24 * 7;

    let dates = {};
    let dateArray = [];

    for (let log of latestKills) {
        const logDate = new Date(log.killtime * 1000);
        const latestWednesDay = getLatestWednesday(logDate);
        const weeksAgo = Math.floor(
            (currentTime - latestWednesDay.getTime()) / week
        );
        const dateText = dateTextByWeek(weeksAgo);

        if (!dates[dateText])
            dates[dateText] = {
                text: dateText,
                kills: []
            };

        dates[dateText].kills.push({
            ...log,
            dateText: dateToString(logDate),
            dateDay: days[logDate.getDay()],
            dateHours: dateTextHours(logDate)
        });
    }

    for (let date in dates) {
        dateArray.push(dates[date]);
    }

    return (
        <section className={classes.container}>
            <Typography variant="h4">Latest kills</Typography>
            <List component="div" disablePadding>
                {dateArray.map(date => (
                    <ListItem
                        component="div"
                        className={classes.listItem}
                        key={date.text}
                        disableGutters
                    >
                        <CollapsableList
                            listTitle={
                                <Typography
                                    variant="button"
                                    className={classes.title}
                                >
                                    {date.text}
                                </Typography>
                            }
                        >
                            {date.kills.map(log => (
                                <Link
                                    component={RouterLink}
                                    color="inherit"
                                    to={`/log/${log.log_id}?realm=${realm}`}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    key={log.log_id}
                                >
                                    <ListItem component="li" disableGutters>
                                        <Grid
                                            container
                                            wrap="nowrap"
                                            direction="column"
                                        >
                                            <Grid item>
                                                <Typography
                                                    className={classes.bold}
                                                >
                                                    {`${log.dateDay} ${log.dateHours}`}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography
                                                    variant="caption"
                                                    color="textSecondary"
                                                >
                                                    {log.dateText}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            container
                                            wrap="nowrap"
                                            direction="column"
                                            className={
                                                classes.bossNameContainer
                                            }
                                        >
                                            <Grid item>
                                                <Typography
                                                    align="right"
                                                    className={classes.bold}
                                                >
                                                    {
                                                        log.encounter_data
                                                            .encounter_name
                                                    }
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography
                                                    variant="caption"
                                                    color="textSecondary"
                                                    align="right"
                                                    component="p"
                                                >
                                                    {
                                                        difficultyLabels[
                                                            log.difficulty
                                                        ]
                                                    }
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                </Link>
                            ))}
                        </CollapsableList>
                    </ListItem>
                ))}
            </List>
        </section>
    );
}

export default withStyles(styles)(GuildLastestKills);
