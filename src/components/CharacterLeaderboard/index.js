import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { withTheme, withStyles } from "@material-ui/core/styles";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import Page from "../Page";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";
import WithRealm from "../WithRealm";
import PerformanceExplanation from "./PerformanceExplanation";

import CharacterLeaderboardFilter from "./CharacterLeaderboardFilter";

import CharacterName from "../CharacterName";

import { fetchCharacterLeaderboardData } from "../../redux/actions";

import { filterChars } from "./helpers";

import {
    raidNameToId,
    getSpecImg,
    shortRealmToFull,
    classImg
} from "../../helpers";

function styles(theme) {
    return {
        uppercase: {
            textTransform: "uppercase"
        },
        cell: {
            padding: theme.spacing(1)
        },
        rank: {
            minWidth: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
            padding: `0 ${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
            fontWeight: "bold"
        },
        firstCellName: {
            paddingLeft: theme.spacing(10)
        },
        containerGrid: {
            height: "40px"
        },
        tableHead: {
            height: "58px"
        }
    };
}

function CharacterLeaderboard({ classes, theme }) {
    const rowsPerPage = 30;
    const dispatch = useDispatch();
    const { data, filter } = useSelector(state => state.characterLeaderboard);
    const [combatMetric, selectCombatMetric] = useState("dps");
    const [page, setPage] = useState(0);
    const { specs, characterClassNames } = useSelector(state => ({
        specs: state.environment.specs,
        characterClassNames: state.environment.characterClassNames
    }));

    useEffect(() => {
        setPage(0);
    }, [combatMetric, data, filter]);

    let filteredData = [];
    let loading = false;
    let error = null;

    const dataId = `${raidNameToId(filter.raid)}${
        filter.spec ? filter.spec : filter.role
    }${combatMetric}`;
    if (!data[dataId]) {
        dispatch(
            fetchCharacterLeaderboardData({
                dataId
            })
        );
        filteredData = null;
    } else {
        filteredData = filterChars(
            filter,
            data[dataId][filter.difficulty],
            specs
        );

        loading = data[dataId].loading;
        error = data[dataId].error;
    }

    return (
        <Page title={`Character Leaderboard | Tauri Progress`}>
            <section>
                <CharacterLeaderboardFilter />

                <Tabs
                    value={combatMetric}
                    onChange={(e, value) => selectCombatMetric(value)}
                >
                    <Tab label="Dps" value={"dps"} />
                    <Tab label="Hps" value={"hps"} />
                </Tabs>

                {data[dataId] && (
                    <React.Fragment>
                        {data[dataId].loading && <Loading />}

                        {error && <ErrorMessage message={error} />}

                        {!loading && !error && filteredData && (
                            <React.Fragment>
                                <Table>
                                    <TableHead className={classes.tableHead}>
                                        <TableRow>
                                            <TableCell
                                                className={
                                                    classes.firstCellName
                                                }
                                            >
                                                Name
                                            </TableCell>
                                            <TableCell>
                                                <PerformanceExplanation />
                                            </TableCell>
                                            <TableCell>Ilvl</TableCell>
                                            <TableCell>Faction</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredData &&
                                            filteredData
                                                .slice(
                                                    page * rowsPerPage,
                                                    (page + 1) * rowsPerPage
                                                )
                                                .map((char, index) => {
                                                    const realmName =
                                                        shortRealmToFull(
                                                            char.realm
                                                        );
                                                    return (
                                                        <TableRow
                                                            key={index}
                                                            hover
                                                        >
                                                            <TableCell
                                                                className={
                                                                    classes.cell
                                                                }
                                                            >
                                                                <Grid
                                                                    container
                                                                    className={
                                                                        classes.containerGrid
                                                                    }
                                                                >
                                                                    <Grid
                                                                        item
                                                                        className={
                                                                            classes.rank
                                                                        }
                                                                    >
                                                                        {index +
                                                                            1 +
                                                                            page *
                                                                                rowsPerPage}
                                                                        .
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <WithRealm
                                                                            realmName={
                                                                                realmName
                                                                            }
                                                                        >
                                                                            <Typography color="inherit">
                                                                                <CharacterName
                                                                                    character={
                                                                                        char
                                                                                    }
                                                                                    realmName={
                                                                                        realmName
                                                                                    }
                                                                                    specIcon={
                                                                                        filter.spec !==
                                                                                        ""
                                                                                            ? getSpecImg(
                                                                                                  specs[
                                                                                                      char
                                                                                                          .spec
                                                                                                  ]
                                                                                                      .image
                                                                                              )
                                                                                            : classImg(
                                                                                                  char.class
                                                                                              )
                                                                                    }
                                                                                    specIconTitle={
                                                                                        filter.spec !==
                                                                                        ""
                                                                                            ? specs[
                                                                                                  char
                                                                                                      .spec
                                                                                              ]
                                                                                                  .label ||
                                                                                              "No spec"
                                                                                            : characterClassNames[
                                                                                                  char
                                                                                                      .class
                                                                                              ]
                                                                                    }
                                                                                />
                                                                            </Typography>
                                                                        </WithRealm>
                                                                    </Grid>
                                                                </Grid>
                                                            </TableCell>
                                                            <TableCell
                                                                className={`${classes.bold} ${classes.cell}`}
                                                            >
                                                                {char.topPercent.toFixed(
                                                                    1
                                                                )}
                                                                %
                                                            </TableCell>
                                                            <TableCell
                                                                className={` ${classes.cell}`}
                                                            >
                                                                {char.ilvl}
                                                            </TableCell>
                                                            <TableCell
                                                                className={`${classes.cell}`}
                                                            >
                                                                {!char.f ? (
                                                                    <span
                                                                        style={{
                                                                            color: theme
                                                                                .palette
                                                                                .factionColors
                                                                                .alliance
                                                                        }}
                                                                    >
                                                                        Alliance
                                                                    </span>
                                                                ) : (
                                                                    <span
                                                                        style={{
                                                                            color: theme
                                                                                .palette
                                                                                .factionColors
                                                                                .horde
                                                                        }}
                                                                    >
                                                                        Horde
                                                                    </span>
                                                                )}
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                    </TableBody>
                                </Table>
                                {filteredData && (
                                    <TablePagination
                                        rowsPerPageOptions={[]}
                                        component="div"
                                        count={filteredData.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        backIconButtonProps={{
                                            "aria-label": "Previous Page"
                                        }}
                                        nextIconButtonProps={{
                                            "aria-label": "Next Page"
                                        }}
                                        onChangePage={(e, page) =>
                                            setPage(page)
                                        }
                                    />
                                )}
                            </React.Fragment>
                        )}
                    </React.Fragment>
                )}
            </section>
        </Page>
    );
}

export default withStyles(styles)(withTheme(CharacterLeaderboard));
