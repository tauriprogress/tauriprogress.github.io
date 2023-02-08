import React from "react";
import { useSelector } from "react-redux";
import withStyles from "@mui/styles/withStyles";

import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

import CollapsableList from "../CollapseableList";
import LogLink from "../LogLink";

import { categorizedLogDates } from "../../helpers";

import { environmentDifficultyNamesSelector } from "../../redux/selectors";

function styles(theme) {
    return {
        listItem: {
            display: "block",
            padding: 0,
        },
        bossName: {
            fontWeight: "bold",
        },
    };
}

function RecentKills({ classes, logs, realm, children, ...rest }) {
    const logDates = categorizedLogDates(logs);

    const difficultyNames = useSelector(environmentDifficultyNamesSelector);
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
                        {date.kills.map((log) => (
                            <LogLink
                                color="inherit"
                                logId={log.id}
                                realm={realm}
                                key={log.id}
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
                                                {log.boss}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                variant="caption"
                                                color="textSecondary"
                                            >
                                                {
                                                    difficultyNames[
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
                            </LogLink>
                        ))}
                    </CollapsableList>
                </ListItem>
            ))}
        </List>
    );
}

export default withStyles(styles)(RecentKills);
