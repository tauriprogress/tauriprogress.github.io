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

import { categorizedLogDates } from "../../helpers";

function styles(theme) {
    return {
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
    const logDates = categorizedLogDates(logs);
    return (
        <List {...rest} component="div" disablePadding>
            {children}
            {logDates.map((date, index) => (
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
                                                className={classes.bossName}
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
    );
}

export default withStyles(styles)(LatestKills);
