import React, { useState, useEffect } from "react";

import { shallowEqual, useDispatch, useSelector } from "react-redux";

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

import Page from "../Page";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";
import WithRealm from "../WithRealm";
import PerformanceExplanation from "./PerformanceExplanation";
import AlignedRankDisplay from "../AlignedRankDisplay";
import OverflowScroll from "../OverflowScroll";

import CharacterLeaderboardFilter from "./CharacterLeaderboardFilter";

import CharacterName from "../CharacterName";

import {
    fetchCharacterLeaderboardData,
    selectCharacterLeaderboardTab
} from "../../redux/actions";

import { filterChars } from "./helpers";

import {
    raidNameToId,
    getSpecImg,
    shortRealmToFull,
    classImg,
    replaceUrlSearchQuery
} from "../../helpers";

function styles(theme) {
    return {
        uppercase: {
            textTransform: "uppercase"
        },
        cell: {
            padding: theme.spacing(1)
        },
        firstCellName: {
            paddingLeft: theme.spacing(10)
        },
        tableHead: {
            height: "58px"
        },
        tableRow: {
            height: "55px"
        }
    };
}

function CharacterLeaderboard({ classes, theme }) {
    const rowsPerPage = 30;

    const dispatch = useDispatch();

    const { data, filter, specs, characterClassNames, selectedTab } =
        useSelector(
            state => ({
                ...state.characterLeaderboard,
                specs: state.environment.specs,
                characterClassNames: state.environment.characterClassNames
            }),
            shallowEqual
        );

    const combatMetric = selectedTab === 0 ? "dps" : "hps";
    const [page, setPage] = useState(0);

    useEffect(() => {
        setPage(0);
    }, [combatMetric, data, filter]);

    const dataId = `${raidNameToId(filter.raid)}${
        filter.spec ? filter.spec : filter.role
    }${combatMetric}`;

    let filteredData = [];
    let loading = false;
    let error = null;

    useEffect(() => {
        dispatch(
            fetchCharacterLeaderboardData({
                dataId
            })
        );
    }, [dataId, dispatch]);

    if (!data[dataId]) {
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

    replaceUrlSearchQuery({ ...filter, tab: selectedTab });

    return (
        <Page title={`Character Leaderboard | Tauri Progress`}>
            <section>
                <CharacterLeaderboardFilter />

                <Tabs
                    value={selectedTab}
                    onChange={(e, value) =>
                        dispatch(selectCharacterLeaderboardTab(value))
                    }
                >
                    <Tab label="Dps" value={0} />
                    <Tab label="Hps" value={1} />
                </Tabs>

                {data[dataId] && (
                    <React.Fragment>
                        {data[dataId].loading && <Loading />}

                        {error && <ErrorMessage message={error} />}

                        {!loading && !error && filteredData && (
                            <React.Fragment>
                                <OverflowScroll>
                                    <Table>
                                        <TableHead
                                            className={classes.tableHead}
                                        >
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
                                            {filteredData
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
                                                            className={
                                                                classes.tableRow
                                                            }
                                                        >
                                                            <TableCell
                                                                className={
                                                                    classes.cell
                                                                }
                                                            >
                                                                <AlignedRankDisplay
                                                                    rank={
                                                                        index +
                                                                        1 +
                                                                        page *
                                                                            rowsPerPage
                                                                    }
                                                                >
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
                                                                </AlignedRankDisplay>
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
                                </OverflowScroll>

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
                                        onPageChange={(e, page) =>
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
