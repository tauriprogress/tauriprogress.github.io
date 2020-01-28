import { difficultyLabels } from "tauriprogress-constants";
import React, { useEffect, useState } from "react";
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
import WithRealm from "../WithRealm";
import GuildListFilter from "./GuildListFilter";
import ConditionalWrapper from "../ConditionalWrapper";

import { guildsFetch } from "../../redux/actions";
import DisplayDate from "../DisplayDate";

import { filterGuildList } from "./helpers";
import { dateToString, getLatestWednesday } from "../../helpers";

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
        tableHead: {
            paddingTop: "0px",
            paddingLeft: theme.spacing(10)
        },
        progression: {
            fontWeight: "bold",
            fontSize: `${20 / 16}rem`,
            display: "inline-block",
            minWidth: "64px"
        },
        secondaryText: {
            color: theme.palette.text.secondary,
            fontSize: `${11 / 16}rem`,
            lineHeight: `${11 / 16}rem`
        },
        overallProgression: {
            fontSize: `${18 / 16}rem`,
            lineHeight: `${20 / 16}rem`
        },
        inactive: {
            color: theme.palette.error.light,
            fontSize: `${10 / 16}rem`,
            marginRight: "1px",
            textAlign: "left",
            fontWeight: "bold"
        }
    };
}

function GuildList({ theme, classes }) {
    const { factionColors, progStateColors } = theme.palette;
    const { data, loading, error } = useSelector(state => state.guildList);
    const week = 1000 * 60 * 60 * 24 * 7;
    const timeBoundary = getLatestWednesday(
        new Date(new Date().getTime() - week * 2)
    );
    const [filter, setFilter] = useState({
        realm: "",
        faction: "",
        difficulty: ""
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(guildsFetch());
    }, []);

    return (
        <React.Fragment>
            {loading && <Loading />}
            {error && <ErrorMessage message={error} />}
            {!loading && !error && data && (
                <React.Fragment>
                    <GuildListFilter filter={filter} setFilter={setFilter} />
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
                            {filterGuildList(filter, data).map(
                                (guild, index) => {
                                    let progress = {};
                                    for (let difficulty in guild.progression
                                        .completion) {
                                        let date =
                                            guild.progression.completion[
                                                difficulty
                                            ].completed * 1000;
                                        progress[difficulty] = {
                                            date: date
                                                ? dateToString(new Date(date))
                                                : false,
                                            bossesDefeated:
                                                guild.progression.completion[
                                                    difficulty
                                                ].progress
                                        };
                                    }

                                    let firstKill = guild.progression.completion
                                        .completed
                                        ? new Date(
                                              guild.progression.completion
                                                  .completed * 1000
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
                                                            {index + 1}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <WithRealm
                                                            realmName={
                                                                guild.realm
                                                            }
                                                        >
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
                                                        </WithRealm>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>

                                            <TableCell
                                                className={classes.cell}
                                                align="right"
                                            >
                                                <Grid
                                                    container
                                                    direction="column"
                                                >
                                                    {[6, 5].map(difficulty => (
                                                        <Grid
                                                            item
                                                            key={`${guild.guildName} ${difficulty}`}
                                                        >
                                                            {progress[
                                                                difficulty
                                                            ] ? (
                                                                <Typography variant="caption">
                                                                    {timeBoundary >
                                                                        guild
                                                                            .activity[
                                                                            difficulty
                                                                        ] *
                                                                            1000 && (
                                                                        <Tooltip
                                                                            title={`${guild.guildName} is not actively raiding in ${difficultyLabels[difficulty]} anymore`}
                                                                        >
                                                                            <span
                                                                                className={
                                                                                    classes.inactive
                                                                                }
                                                                            >
                                                                                Inactive
                                                                            </span>
                                                                        </Tooltip>
                                                                    )}
                                                                    <ConditionalWrapper
                                                                        condition={
                                                                            progress[
                                                                                difficulty
                                                                            ]
                                                                                .date
                                                                        }
                                                                        wrap={children => (
                                                                            <Tooltip
                                                                                title={
                                                                                    progress[
                                                                                        difficulty
                                                                                    ]
                                                                                        .date
                                                                                }
                                                                            >
                                                                                {
                                                                                    children
                                                                                }
                                                                            </Tooltip>
                                                                        )}
                                                                    >
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
                                                                    </ConditionalWrapper>
                                                                </Typography>
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
                                                            <Typography component="span">
                                                                <DateTooltip
                                                                    date={
                                                                        firstKill
                                                                    }
                                                                >
                                                                    <DisplayDate
                                                                        date={
                                                                            firstKill
                                                                        }
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
                                                                    guild
                                                                        .progression
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
                                }
                            )}
                        </TableBody>
                    </Table>
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

export default withStyles(styles)(withTheme(GuildList));
