import { difficultyLabels } from "tauriprogress-constants";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link as RouterLink } from "react-router-dom";

import { withTheme, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Link from "@material-ui/core/Link";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";
import DateTooltip from "../DateTooltip";

import { guildsFetch } from "../../redux/actions";
import DisplayDate from "../DisplayDate";

import { dateToString } from "../../helpers";

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
        secondaryText: {
            color: theme.palette.text.secondary,
            fontSize: `${10 / 16}rem`,
            lineHeight: `${11 / 16}rem`
        },
        overallProgression: {
            fontSize: `${18 / 16}rem`,
            lineHeight: `${20 / 16}rem`
        }
    };
}

function GuildList({ theme, classes }) {
    const { factionColors, progStateColors } = theme.palette;
    const { data, loading, error } = useSelector(state => state.guildList);
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
                                align="center"
                                className={classes.tableHead}
                                colSpan="2"
                            >
                                Progression
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(guild => {
                            let progress = {};
                            for (let difficulty in guild.progression
                                .completion) {
                                let date =
                                    guild.progression.completion[difficulty]
                                        .completed * 1000;
                                progress[difficulty] = {
                                    date: date
                                        ? dateToString(new Date(date))
                                        : false,
                                    bossesDefeated:
                                        guild.progression.completion[difficulty]
                                            .progress
                                };
                            }

                            let firstKill = guild.progression.completion
                                .completed
                                ? new Date(
                                      guild.progression.completion.completed *
                                          1000
                                  )
                                : false;

                            return (
                                <TableRow key={guild.guildName} hover>
                                    <TableCell className={classes.cell}>
                                        <Grid container wrap="nowrap">
                                            <Grid
                                                item
                                                className={`${classes.rank} rank`}
                                            >
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
                                                            classes.secondaryText
                                                        }
                                                    >
                                                        <Typography
                                                            variant="caption"
                                                            className={
                                                                classes.secondaryText
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
                                        <Grid container direction="column">
                                            {[6, 5].map(difficulty => (
                                                <Grid
                                                    item
                                                    key={`${guild.guildname} ${difficulty}`}
                                                >
                                                    {progress[difficulty] ? (
                                                        progress[difficulty]
                                                            .date ? (
                                                            <Tooltip
                                                                title={
                                                                    progress[
                                                                        difficulty
                                                                    ].date
                                                                }
                                                            >
                                                                <Typography variant="caption">
                                                                    <span
                                                                        className={`${classes.secondaryText} ${classes.progression}`}
                                                                    >
                                                                        {
                                                                            progress[
                                                                                difficulty
                                                                            ]
                                                                                .bossesDefeated
                                                                        }
                                                                        /14{" "}
                                                                        {
                                                                            difficultyLabels[
                                                                                difficulty
                                                                            ]
                                                                        }
                                                                    </span>
                                                                </Typography>
                                                            </Tooltip>
                                                        ) : (
                                                            <Typography variant="caption">
                                                                <span
                                                                    className={`${classes.secondaryText} ${classes.progression}`}
                                                                >
                                                                    {
                                                                        progress[
                                                                            difficulty
                                                                        ]
                                                                            .bossesDefeated
                                                                    }
                                                                    /14{" "}
                                                                    {
                                                                        difficultyLabels[
                                                                            difficulty
                                                                        ]
                                                                    }
                                                                </span>
                                                            </Typography>
                                                        )
                                                    ) : (
                                                        <Typography variant="caption">
                                                            <span
                                                                className={`${classes.secondaryText} ${classes.progression}`}
                                                            >
                                                                0/14{" "}
                                                                {
                                                                    difficultyLabels[
                                                                        difficulty
                                                                    ]
                                                                }
                                                            </span>
                                                        </Typography>
                                                    )}
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </TableCell>

                                    <TableCell
                                        className={classes.cell}
                                        align="right"
                                    >
                                        <Typography
                                            className={
                                                classes.overallProgression
                                            }
                                        >
                                            <React.Fragment>
                                                {firstKill && (
                                                    <Typography variant="caption">
                                                        <DateTooltip
                                                            date={firstKill}
                                                        >
                                                            <DisplayDate
                                                                date={firstKill}
                                                            />
                                                        </DateTooltip>
                                                    </Typography>
                                                )}

                                                <span
                                                    className={
                                                        classes.progression
                                                    }
                                                >
                                                    <span
                                                        style={{
                                                            color:
                                                                firstKill &&
                                                                progStateColors.defeated
                                                        }}
                                                    >
                                                        {
                                                            guild.progression
                                                                .completion
                                                                .bossesDefeated
                                                        }
                                                    </span>

                                                    <span
                                                        className={
                                                            classes.secondaryText
                                                        }
                                                    >
                                                        / 14
                                                    </span>
                                                </span>
                                            </React.Fragment>
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
