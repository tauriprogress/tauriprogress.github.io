import React from "react";

import { withStyles, withTheme } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";

import Help from "@material-ui/icons/Help";

import {
    days as dayLabels,
    hours as hourLabels,
    shiftDays,
    colorWeight,
} from "../../helpers";

const hours = new Array(12).fill(0).map((value, index) => index * 2);
const days = [2, 3, 4, 5, 6, 0, 1];

function styles(theme) {
    return {
        container: {
            width: "280px",
            padding: theme.spacing(1),
            margin: `${theme.spacing(1)}px 0`,
            backgroundColor: theme.palette.background.darker,
        },
        title: {
            fontSize: `${16 / 16}rem`,
            margin: `${theme.spacing(1)}px 0`,
            paddingLeft: theme.spacing(1),
        },
        column: {
            flex: 1,
        },
        labelColumn: {
            width: "40px",
        },
        tile: {
            height: "14px",
            margin: "1px",
        },
        labelTile: {
            height: "28px",
            margin: "2px 0",
        },
        hoursLabel: {
            lineHeight: 1,
            textAlign: "right",
            paddingRight: "2px",
            fontSize: `${12 / 16}rem`,
        },
        day: {
            margin: `0 0 ${theme.spacing(1)}px`,
            lineHeight: 1,
            textAlign: "center",
        },
        icon: {
            transform: "translate(0, 2px)",
        },
    };
}

function GuildBossKillsChart({ classes, theme, data, title }) {
    const max = data.reduce((max, hours) => {
        max = hours.reduce((max, value) => (max > value ? max : value), max);
        return max;
    }, 0);

    return (
        <Card className={classes.container}>
            <Typography className={classes.title}>
                {title} boss kills{" "}
                {title === "Recent" && (
                    <Tooltip title={"Bosses killed in the last 2 weeks"}>
                        <Help
                            color="disabled"
                            fontSize="small"
                            className={classes.icon}
                        />
                    </Tooltip>
                )}
            </Typography>
            <Grid container wrap="nowrap" justifyContent="center">
                <Grid item className={classes.labelColumn}>
                    <Grid container direction="column">
                        {hours.map((hour) => (
                            <Grid item key={hour} className={classes.labelTile}>
                                <Typography className={classes.hoursLabel}>
                                    {hourLabels[hour]}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                {days.map((day) => (
                    <Grid item className={classes.column} key={day}>
                        <Grid container direction="column">
                            {data[day].map((killCount, index) => (
                                <Tooltip
                                    title={`${killCount} boss kills ${
                                        hourLabels[index]
                                    }, ${dayLabels[shiftDays(day)]}`}
                                    key={index}
                                >
                                    <Grid
                                        item
                                        className={classes.tile}
                                        style={{
                                            backgroundColor:
                                                theme.palette.weightColors[
                                                    colorWeight(killCount, max)
                                                ],
                                        }}
                                    />
                                </Tooltip>
                            ))}
                        </Grid>
                        <Typography className={classes.day}>
                            {dayLabels[shiftDays(day)].slice(0, 3)}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Card>
    );
}

export default withStyles(styles)(withTheme(GuildBossKillsChart));
