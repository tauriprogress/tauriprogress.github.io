import { difficultyLabels } from "tauriprogress-constants";
import React from "react";

import { withStyles } from "@material-ui/core/styles";

import { Link as RouterLink } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import CollapsableList from "../CollapseableList";

import {
    days,
    getLatestWednesday,
    dateTextByWeek,
    dateToString,
    dateTextHours
} from "../../helpers";
import SideCard from "../SideCard";

function styles(theme) {
    return {
        container: {
            display: "flex",
            flexDirection: "column"
        },
        list: {
            flex: 1,
            overflowY: "scroll"
        },
        listItem: {
            display: "block",
            padding: 0
        },
        bossName: {
            fontWeight: "bold"
        }
    };
}

function LatestKills({ classes, logs, realm, children, ...rest }) {
    const currentTime = new Date().getTime();
    const week = 1000 * 60 * 60 * 24 * 7;

    let dates = {};
    let dateArray = [];

    for (let log of logs) {
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
        <SideCard
            {...rest}
            title={"Latest Kills"}
            className={`${classes.container} ${rest.className}`}
        >
            {children ? (
                children
            ) : (
                <List component="div" disablePadding className={classes.list}>
                    {dateArray.map((date, index) => (
                        <ListItem
                            component="div"
                            className={classes.listItem}
                            key={date.text}
                            disableGutters
                        >
                            <CollapsableList
                                defaultState={!index ? true : false}
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
                                                        className={
                                                            classes.bossName
                                                        }
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
                                                    >
                                                        {
                                                            difficultyLabels[
                                                                log.difficulty
                                                            ]
                                                        }
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid
                                                container
                                                wrap="nowrap"
                                                direction="column"
                                            >
                                                <Grid item>
                                                    <Typography align="right">
                                                        {log.dateDay}
                                                        <br />
                                                        {log.dateHours}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography
                                                        variant="caption"
                                                        color="textSecondary"
                                                        align="right"
                                                        component="p"
                                                    >
                                                        {log.dateText}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                        <Divider />
                                    </Link>
                                ))}
                            </CollapsableList>
                        </ListItem>
                    ))}
                </List>
            )}
        </SideCard>
    );
}

export default withStyles(styles)(LatestKills);
