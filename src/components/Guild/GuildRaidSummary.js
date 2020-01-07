import React from "react";

import { withStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

function styles(theme) {
    return {
        defeated: {
            color: theme.palette.progStateColors.defeated
        },
        alive: {
            color: theme.palette.progStateColors.alive
        },
        container: {
            margin: "0 10px 10px",
            width: "260px",
            borderRadius: "4px"
        },
        tableCell: {
            padding: theme.spacing(0.3)
        },
        tableText: {
            fontSize: `${11 / 16}rem`
        },
        titleContainer: {
            backgroundColor: theme.palette.primary.main,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            color: theme.baseColors.light
        },
        title: {
            padding: theme.spacing(2),
            "& p": {
                cursor: "default"
            }
        },
        tableColumnTitle: {
            fontSize: `${13 / 16}rem`,
            fontWeight: "bold"
        },
        tooltip: {
            backgroundColor: theme.palette.background.tooltip,
            padding: 0
        },
        paper: {
            background: "transparent",
            padding: theme.spacing(1)
        },
        table: {
            width: "220px"
        }
    };
}

function GuildRaidSummary({ classes, data }) {
    return (
        <Card className={classes.container}>
            <Tooltip
                classes={{
                    tooltip: classes.tooltip
                }}
                title={
                    <Paper className={classes.paper} elevation={5}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableCell} />
                                    <TableCell
                                        className={classes.tableCell}
                                        align="center"
                                    >
                                        <Typography
                                            className={`${classes.tableText} ${classes.tableColumnTitle}`}
                                        >
                                            10
                                        </Typography>
                                    </TableCell>
                                    <TableCell
                                        className={classes.tableCell}
                                        align="center"
                                    >
                                        <Typography
                                            className={`${classes.tableText} ${classes.tableColumnTitle}`}
                                        >
                                            25
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.bosses.map(boss => (
                                    <TableRow key={boss.bossName}>
                                        <TableCell
                                            className={classes.tableCell}
                                        >
                                            <Typography
                                                className={classes.tableText}
                                            >
                                                {boss.bossName}
                                            </Typography>
                                        </TableCell>

                                        <TableCell
                                            className={classes.tableCell}
                                        >
                                            <Typography
                                                className={classes.tableText}
                                            >
                                                {boss[5] ? (
                                                    <span
                                                        className={
                                                            classes.defeated
                                                        }
                                                    >
                                                        Defeated
                                                    </span>
                                                ) : (
                                                    <span
                                                        className={
                                                            classes.alive
                                                        }
                                                    >
                                                        Alive
                                                    </span>
                                                )}
                                            </Typography>
                                        </TableCell>

                                        <TableCell
                                            className={classes.tableCell}
                                        >
                                            <Typography
                                                className={classes.tableText}
                                            >
                                                {boss[6] ? (
                                                    <span
                                                        className={
                                                            classes.defeated
                                                        }
                                                    >
                                                        Defeated
                                                    </span>
                                                ) : (
                                                    <span
                                                        className={
                                                            classes.alive
                                                        }
                                                    >
                                                        Alive
                                                    </span>
                                                )}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                }
            >
                <div
                    style={{
                        backgroundImage: `url(${data.picture})`
                    }}
                    className={classes.titleContainer}
                >
                    <Grid
                        className={classes.title}
                        container
                        justify={"space-between"}
                        wrap={"nowrap"}
                        style={{
                            background: `linear-gradient(to left, rgba(0, 0, 0, 0.7) ${100 -
                                (data.defeatedBosses / data.totalBosses) *
                                    100}%, rgba(0,0,0,0) ${100 -
                                (data.defeatedBosses / data.totalBosses) *
                                    100}%)`
                        }}
                    >
                        <Grid item>
                            <Typography>{data.raidName}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>
                                {`${data.defeatedBosses}/${data.totalBosses}`}{" "}
                                HC
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </Tooltip>
        </Card>
    );
}

export default withStyles(styles)(GuildRaidSummary);
