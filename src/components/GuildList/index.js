import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link as RouterLink } from "react-router-dom";

import { withTheme, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Link from "@material-ui/core/Link";
import { Typography, Grid } from "@material-ui/core";

import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";
import DateTooltip from "../DateTooltip";

import { guildsFetch } from "../../redux/actions";
import DisplayDate from "../DisplayDate";

function styles(theme) {
    return {
        cell: {
            padding: theme.spacing(1)
        },
        rank: {
            minWidth: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
            padding: `0 ${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
            "& p": {
                fontSize: `${18 / 16}rem`
            }
        },
        guildName: {
            fontSize: `${18 / 16}rem`,
            lineHeight: `${20 / 16}rem`
        },
        table: {
            maxWidth: "1000px"
        },
        tableHead: {
            paddingTop: "0px",
            paddingLeft: theme.spacing(10)
        },
        progression: {
            fontWeight: "bold",
            paddingLeft: theme.spacing(1)
        },
        realm: {
            color: theme.palette.text.secondary,
            fontSize: `${10 / 16}rem`,
            lineHeight: `${11 / 16}rem`
        }
    };
}

function GuildList({ theme, classes }) {
    const { factionColors, progStateColors } = theme.palette;
    const { data, loading, error } = useSelector(state => state.guilds);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(guildsFetch());
    }, []);

    return (
        <React.Fragment>
            {loading && <Loading />}
            {error && <ErrorMessage message={error} />}
            {!loading && !error && data && (
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHead}>
                                Guild
                            </TableCell>
                            <TableCell
                                align="right"
                                className={classes.tableHead}
                            >
                                25 HC
                            </TableCell>
                            <TableCell
                                align="right"
                                className={classes.tableHead}
                            >
                                10 HC
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(guild => {
                            let date = null;

                            if (guild.progression.completed)
                                date = new Date(
                                    guild.progression.completed * 1000
                                );

                            let randomDate = new Date();

                            return (
                                <TableRow key={guild.guildName} hover>
                                    <TableCell className={classes.cell}>
                                        <Grid container wrap="nowrap">
                                            <Grid item className={classes.rank}>
                                                <Typography color="inherit">
                                                    {guild.rank}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Grid
                                                    container
                                                    direction="column"
                                                >
                                                    <Grid item>
                                                        <Typography
                                                            className={
                                                                classes.guildName
                                                            }
                                                        >
                                                            <Link
                                                                component={
                                                                    RouterLink
                                                                }
                                                                style={{
                                                                    color: guild.gFaction
                                                                        ? factionColors.horde
                                                                        : factionColors.alliance
                                                                }}
                                                                to={`/guild/${guild.guildName}?realm=${guild.realm}`}
                                                            >
                                                                {
                                                                    guild.guildName
                                                                }
                                                            </Link>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        className={
                                                            classes.realm
                                                        }
                                                    >
                                                        <Typography
                                                            variant="caption"
                                                            className={
                                                                classes.realm
                                                            }
                                                        >
                                                            {guild.realm}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                    <TableCell
                                        className={classes.cell}
                                        align="right"
                                    >
                                        <Typography>
                                            <Typography variant="caption">
                                                <DateTooltip date={randomDate}>
                                                    <span
                                                        style={{
                                                            color:
                                                                progStateColors.defeated
                                                        }}
                                                    >
                                                        <DisplayDate
                                                            date={randomDate}
                                                            align="right"
                                                        />
                                                    </span>
                                                </DateTooltip>
                                            </Typography>
                                            <span
                                                className={classes.progression}
                                            >
                                                0/14
                                            </span>
                                        </Typography>
                                    </TableCell>
                                    <TableCell
                                        className={classes.cell}
                                        align="right"
                                    >
                                        <Typography>
                                            <Typography variant="caption">
                                                <DateTooltip date={randomDate}>
                                                    <span
                                                        style={{
                                                            color:
                                                                progStateColors.defeated
                                                        }}
                                                    >
                                                        <DisplayDate
                                                            date={randomDate}
                                                            align="right"
                                                        />
                                                    </span>
                                                </DateTooltip>
                                            </Typography>
                                            <span
                                                className={classes.progression}
                                            >
                                                {
                                                    guild.progression
                                                        .currentBossesDefeated
                                                }
                                                /14
                                            </span>
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            )}
        </React.Fragment>
    );
}

export default withStyles(styles)(withTheme(GuildList));
