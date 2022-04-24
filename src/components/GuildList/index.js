import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import withTheme from '@mui/styles/withTheme';
import withStyles from '@mui/styles/withStyles';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";
import DateTooltip from "../DateTooltip";
import WithRealm from "../WithRealm";
import GuildListFilter from "./GuildListFilter";
import ConditionalWrapper from "../ConditionalWrapper";
import OverflowScroll from "../OverflowScroll";
import DisplayDate from "../DisplayDate";
import AlignedRankDisplay from "../AlignedRankDisplay";
import Link from "../Link";

import { filterGuildList } from "./helpers";
import { dateToString, guildActivityBoundary } from "../../helpers";

import { guildListFetch } from "../../redux/actions";
import {
    guildListEntireSelector,
    environmentDifficultyNamesSelector,
    environmentBossCountSelector,
    environmentDifficultiesSelector,
    environmentRealmGroupSelector,
    environmentIsSeasonalSelector,
} from "../../redux/selectors";

function styles(theme) {
    return {
        cell: {
            padding: theme.spacing(1),
        },
        rank: {
            "& p": {
                fontSize: `${18 / 16}rem`,
            },
        },
        name: {
            fontSize: `${18 / 16}rem`,
            lineHeight: `${20 / 16}rem`,
        },
        tableHead: {
            paddingTop: "0px",
            paddingLeft: theme.spacing(10),
        },
        progression: {
            fontWeight: "bold",
            fontSize: `${20 / 16}rem`,
            display: "inline-block",
            minWidth: "64px",
        },
        secondaryText: {
            color: theme.palette.text.secondary,
            fontSize: `${11 / 16}rem`,
            lineHeight: `${11 / 16}rem`,
        },
        overallProgression: {
            fontSize: `${18 / 16}rem`,
            lineHeight: `${20 / 16}rem`,
        },
        inactive: {
            color: theme.palette.error.light,
            fontSize: `${10 / 16}rem`,
            marginRight: "1px",
            textAlign: "left",
            fontWeight: "bold",
        },
        active: {
            color: theme.palette.progStateColors.defeated,
            fontSize: `${10 / 16}rem`,
            marginRight: "1px",
            textAlign: "left",
            fontWeight: "bold",
        },
        loader: {
            width: "100vw",
        },
    };
}

function GuildList({ theme, classes }) {
    const { factionColors, progStateColors } = theme.palette;
    const {
        data,
        loading,
        error,
        difficultyNames,
        bossCount,
        difficulties,
        realmGroup,
        isSeasonal,
    } = useSelector(
        (state) => ({
            ...guildListEntireSelector(state),
            difficultyNames: environmentDifficultyNamesSelector(state),
            bossCount: environmentBossCountSelector(state),
            difficulties: environmentDifficultiesSelector(state),
            realmGroup: environmentRealmGroupSelector(state),
            isSeasonal: environmentIsSeasonalSelector(state),
        }),
        shallowEqual
    );

    const timeBoundary = guildActivityBoundary();

    const [filter, setFilter] = useState({
        realm: "",
        f: "",
        difficulty: "",
        activity: "",
    });

    const [showActivity, setShowActivity] = useState(false);
    function toggleActivity() {
        setShowActivity(!showActivity);
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(guildListFetch(realmGroup));
    }, [isSeasonal, realmGroup, dispatch]);

    return (
        <React.Fragment>
            {loading && <Loading className={classes.loader} />}
            {error && (
                <ErrorMessage
                    message={error}
                    refresh={() => dispatch(guildListFetch(realmGroup))}
                />
            )}
            {!loading && !error && data && (
                <React.Fragment>
                    <GuildListFilter filter={filter} setFilter={setFilter} />
                    <OverflowScroll>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableHead}>
                                        Guild
                                    </TableCell>
                                    <TableCell
                                        className={classes.tableHead}
                                        align="right"
                                    >
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={showActivity}
                                                    onChange={toggleActivity}
                                                    inputProps={{
                                                        "aria-label":
                                                            "primary checkbox",
                                                    }}
                                                    color="secondary"
                                                />
                                            }
                                            label="Activity"
                                        />
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        className={classes.tableHead}
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
                                            .completion.difficulties) {
                                            let date =
                                                guild.progression.completion
                                                    .difficulties[difficulty]
                                                    .completed * 1000;
                                            progress[difficulty] = {
                                                date: date
                                                    ? new Date(date)
                                                    : false,
                                                bossesDefeated:
                                                    guild.progression.completion
                                                        .difficulties[
                                                        difficulty
                                                    ].bossesDefeated,
                                            };
                                        }

                                        let firstKill = guild.progression
                                            .completion.completed
                                            ? new Date(
                                                  guild.progression.completion
                                                      .completed * 1000
                                              )
                                            : false;
                                        return (
                                            <TableRow key={guild._id} hover>
                                                <TableCell
                                                    className={classes.cell}
                                                >
                                                    <AlignedRankDisplay
                                                        rank={index + 1}
                                                        className={classes.rank}
                                                    >
                                                        <WithRealm
                                                            realmName={
                                                                guild.realm
                                                            }
                                                        >
                                                            <Typography
                                                                className={
                                                                    classes.name
                                                                }
                                                            >
                                                                <Link
                                                                    style={{
                                                                        color: guild.f
                                                                            ? factionColors.horde
                                                                            : factionColors.alliance,
                                                                    }}
                                                                    to={`/guild/${guild.name}?realm=${guild.realm}`}
                                                                >
                                                                    {guild.name}
                                                                </Link>
                                                            </Typography>
                                                        </WithRealm>
                                                    </AlignedRankDisplay>
                                                </TableCell>

                                                <TableCell
                                                    className={classes.cell}
                                                    align="right"
                                                >
                                                    <Grid
                                                        container
                                                        direction="column"
                                                    >
                                                        {difficulties.map(
                                                            (difficulty) => (
                                                                <Grid
                                                                    item
                                                                    key={`${guild.name} ${difficulty}`}
                                                                >
                                                                    {progress[
                                                                        difficulty
                                                                    ] ? (
                                                                        <Typography variant="caption">
                                                                            {showActivity &&
                                                                                (timeBoundary >
                                                                                guild
                                                                                    .activity[
                                                                                    difficulty
                                                                                ] *
                                                                                    1000 ? (
                                                                                    <Tooltip
                                                                                        title={`${guild.name} is not actively raiding in ${difficultyNames[difficulty]} anymore`}
                                                                                    >
                                                                                        <span
                                                                                            className={
                                                                                                classes.inactive
                                                                                            }
                                                                                        >
                                                                                            Inactive
                                                                                        </span>
                                                                                    </Tooltip>
                                                                                ) : (
                                                                                    <Tooltip
                                                                                        title={`${guild.name} is raiding in ${difficultyNames[difficulty]}`}
                                                                                    >
                                                                                        <span
                                                                                            className={
                                                                                                classes.active
                                                                                            }
                                                                                        >
                                                                                            Active
                                                                                        </span>
                                                                                    </Tooltip>
                                                                                ))}
                                                                            <ConditionalWrapper
                                                                                condition={
                                                                                    progress[
                                                                                        difficulty
                                                                                    ]
                                                                                        .date
                                                                                }
                                                                                wrap={(
                                                                                    children
                                                                                ) => (
                                                                                    <Tooltip
                                                                                        title={dateToString(
                                                                                            progress[
                                                                                                difficulty
                                                                                            ]
                                                                                                .date
                                                                                        )}
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

                                                                                    /
                                                                                    {
                                                                                        bossCount
                                                                                    }{" "}
                                                                                    {
                                                                                        difficultyNames[
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
                                                                                0/
                                                                                {
                                                                                    bossCount
                                                                                }{" "}
                                                                                {
                                                                                    difficultyNames[
                                                                                        difficulty
                                                                                    ]
                                                                                }
                                                                            </span>
                                                                        </Typography>
                                                                    )}
                                                                </Grid>
                                                            )
                                                        )}
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
                                                            {filter.difficulty
                                                                ? progress[
                                                                      filter
                                                                          .difficulty
                                                                  ].date && (
                                                                      <Typography component="span">
                                                                          <DateTooltip
                                                                              date={
                                                                                  progress[
                                                                                      filter
                                                                                          .difficulty
                                                                                  ]
                                                                                      .date
                                                                              }
                                                                          >
                                                                              <DisplayDate
                                                                                  date={
                                                                                      progress[
                                                                                          filter
                                                                                              .difficulty
                                                                                      ]
                                                                                          .date
                                                                                  }
                                                                              />
                                                                          </DateTooltip>
                                                                      </Typography>
                                                                  )
                                                                : firstKill && (
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
                                                                {filter.difficulty ? (
                                                                    <span
                                                                        style={{
                                                                            color:
                                                                                progress[
                                                                                    filter
                                                                                        .difficulty
                                                                                ]
                                                                                    .date &&
                                                                                progStateColors.defeated,
                                                                        }}
                                                                    >
                                                                        {
                                                                            progress[
                                                                                filter
                                                                                    .difficulty
                                                                            ]
                                                                                .bossesDefeated
                                                                        }
                                                                    </span>
                                                                ) : (
                                                                    <span
                                                                        style={{
                                                                            color:
                                                                                firstKill &&
                                                                                progStateColors.defeated,
                                                                        }}
                                                                    >
                                                                        {
                                                                            guild
                                                                                .progression
                                                                                .completion
                                                                                .bossesDefeated
                                                                        }
                                                                    </span>
                                                                )}

                                                                <span
                                                                    className={
                                                                        classes.secondaryText
                                                                    }
                                                                >
                                                                    /{" "}
                                                                    {bossCount}
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
                    </OverflowScroll>
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

export default withStyles(styles)(withTheme(GuildList));
