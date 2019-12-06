import { specToClass, specs } from "tauriprogress-constants";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import { withTheme, withStyles } from "@material-ui/core/styles";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import LogLink from "../LogLink";
import Filters from "./Filters";
import SelectDifficulty from "../SelectDifficulty";
import OverflowScroll from "../OverflowScroll";

import { applyFilter } from "./helpers";

import { convertFightTime, getSpecImg } from "../../helpers";

import { raidFetch, raidInfoChangeDiff } from "../../redux/actions";
import SpecImg from "../SpecImg";

function useFilter(initialState) {
    const [filter, setFilter] = useState(initialState);

    function changeFilter(filterOptions) {
        setFilter({
            ...filter,
            spec: filterOptions.filterName === "class" ? "" : filter.spec,
            [filterOptions.filterName]: filterOptions.value
        });
    }

    return [filter, changeFilter];
}

function styles(theme) {
    return {
        boldText: {
            fontWeight: "bold"
        },
        cell: {
            padding: theme.spacing(1)
        }
    };
}

function Raid({ classes, match, theme }) {
    const {
        palette: { classColors, factionColors }
    } = theme;

    const { loading, error, raidName, raidData, data, diff } = useSelector(
        state => {
            return {
                ...state.raidInfo.raid,
                diff: state.raidInfo.selectedDiff
            };
        }
    );

    const [filter, changeFilter] = useFilter({
        realm: "",
        faction: "",
        class: "",
        spec: ""
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (raidName !== match.params.raidName || (!data && !loading))
            dispatch(raidFetch(match.params.raidName));
    }, []);

    let filteredData = null;
    if (!loading && data !== null) {
        filteredData = applyFilter(data[diff], raidData, filter);
    }

    return (
        <React.Fragment>
            {loading && <Loading />}
            {error && <ErrorMessage message={error} />}
            {!loading && !error && filteredData && raidData && (
                <React.Fragment>
                    <SelectDifficulty
                        difficulty={diff}
                        onChange={(e, value) =>
                            dispatch(raidInfoChangeDiff(value))
                        }
                    />
                    <Filters filter={filter} changeFilter={changeFilter} />
                    <OverflowScroll>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Boss name</TableCell>
                                    <TableCell>Fastest</TableCell>
                                    <TableCell>Dps</TableCell>
                                    <TableCell>Hps</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {raidData.encounters.map((boss, index) => {
                                    const currentBoss =
                                        filteredData[boss.encounter_name];
                                    return (
                                        <TableRow
                                            key={currentBoss.bossName}
                                            hover
                                        >
                                            <TableCell className={classes.cell}>
                                                <Typography color="inherit">
                                                    <Link
                                                        component={RouterLink}
                                                        color="inherit"
                                                        to={`/raid/${raidName}/${currentBoss.bossName}`}
                                                        className={
                                                            classes.boldText
                                                        }
                                                    >
                                                        {currentBoss.bossName}
                                                    </Link>
                                                </Typography>
                                            </TableCell>

                                            <TableCell className={classes.cell}>
                                                {currentBoss.fastestKills
                                                    .guilddata ? (
                                                    <Typography color="inherit">
                                                        <LogLink
                                                            logId={
                                                                currentBoss
                                                                    .fastestKills
                                                                    .log_id
                                                            }
                                                            realm={
                                                                currentBoss
                                                                    .fastestKills
                                                                    .realm
                                                            }
                                                        />
                                                        <span
                                                            className={
                                                                classes.boldText
                                                            }
                                                        >
                                                            {" "}
                                                            {convertFightTime(
                                                                currentBoss
                                                                    .fastestKills
                                                                    .fight_time
                                                            )}{" "}
                                                        </span>

                                                        {currentBoss
                                                            .fastestKills
                                                            .guilddata.name ? (
                                                            <Link
                                                                component={
                                                                    RouterLink
                                                                }
                                                                style={{
                                                                    color: currentBoss
                                                                        .fastestKills
                                                                        .guilddata
                                                                        .faction
                                                                        ? factionColors.horde
                                                                        : factionColors.alliance
                                                                }}
                                                                to={`/guild/${currentBoss.fastestKills.guilddata.name}?realm=${currentBoss.fastestKills.realm}`}
                                                            >
                                                                {
                                                                    currentBoss
                                                                        .fastestKills
                                                                        .guilddata
                                                                        .name
                                                                }
                                                            </Link>
                                                        ) : (
                                                            "Random"
                                                        )}
                                                    </Typography>
                                                ) : (
                                                    <Typography>
                                                        No data
                                                    </Typography>
                                                )}
                                            </TableCell>

                                            <TableCell className={classes.cell}>
                                                {currentBoss.bestDps.name ? (
                                                    <Grid
                                                        container
                                                        direction="column"
                                                    >
                                                        <Grid item>
                                                            <Typography
                                                                color="inherit"
                                                                className={
                                                                    classes.boldText
                                                                }
                                                            >
                                                                {new Intl.NumberFormat().format(
                                                                    Math.round(
                                                                        currentBoss
                                                                            .bestDps
                                                                            .dps
                                                                    )
                                                                )}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography color="inherit">
                                                                {
                                                                    currentBoss
                                                                        .bestDps
                                                                        .ilvl
                                                                }{" "}
                                                                <SpecImg
                                                                    src={getSpecImg(
                                                                        specs[
                                                                            currentBoss
                                                                                .bestDps
                                                                                .spec
                                                                        ].image
                                                                    )}
                                                                    title={
                                                                        specs[
                                                                            currentBoss
                                                                                .bestDps
                                                                                .spec
                                                                        ].label
                                                                    }
                                                                />
                                                                <Link
                                                                    component={
                                                                        RouterLink
                                                                    }
                                                                    style={{
                                                                        color:
                                                                            classColors[
                                                                                specToClass[
                                                                                    currentBoss
                                                                                        .bestDps
                                                                                        .spec
                                                                                ]
                                                                            ]
                                                                    }}
                                                                    to={`/player/${currentBoss.bestDps.name}?realm=${currentBoss.bestDps.realm}`}
                                                                >
                                                                    {
                                                                        currentBoss
                                                                            .bestDps
                                                                            .name
                                                                    }
                                                                </Link>
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                ) : (
                                                    <Typography>
                                                        No data
                                                    </Typography>
                                                )}
                                            </TableCell>

                                            <TableCell className={classes.cell}>
                                                {currentBoss.bestHps.name ? (
                                                    <Grid
                                                        container
                                                        direction="column"
                                                    >
                                                        <Grid item>
                                                            <Typography
                                                                color="inherit"
                                                                className={
                                                                    classes.boldText
                                                                }
                                                            >
                                                                {new Intl.NumberFormat().format(
                                                                    Math.round(
                                                                        currentBoss
                                                                            .bestHps
                                                                            .hps
                                                                    )
                                                                )}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography color="inherit">
                                                                {
                                                                    currentBoss
                                                                        .bestHps
                                                                        .ilvl
                                                                }{" "}
                                                                <SpecImg
                                                                    src={getSpecImg(
                                                                        specs[
                                                                            currentBoss
                                                                                .bestHps
                                                                                .spec
                                                                        ].image
                                                                    )}
                                                                    title={
                                                                        specs[
                                                                            currentBoss
                                                                                .bestHps
                                                                                .spec
                                                                        ].label
                                                                    }
                                                                />
                                                                <Link
                                                                    component={
                                                                        RouterLink
                                                                    }
                                                                    style={{
                                                                        color:
                                                                            classColors[
                                                                                specToClass[
                                                                                    currentBoss
                                                                                        .bestHps
                                                                                        .spec
                                                                                ]
                                                                            ]
                                                                    }}
                                                                    to={`/player/${currentBoss.bestHps.name}?realm=${currentBoss.bestHps.realm}`}
                                                                >
                                                                    {
                                                                        currentBoss
                                                                            .bestHps
                                                                            .name
                                                                    }
                                                                </Link>
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                ) : (
                                                    <Typography>
                                                        No data
                                                    </Typography>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </OverflowScroll>
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

export default withStyles(styles)(withTheme(Raid));
