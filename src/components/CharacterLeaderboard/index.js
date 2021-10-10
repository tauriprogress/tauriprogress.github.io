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
    characterLeaderboardFetchData,
    characterLeaderboardSetTab
} from "../../redux/actions";
import {
    characterLeaderboardTabSelector,
    characterLeaderboardDataSelector,
    characterLeaderboardFilterSelector,
    environmentCharacterSpecsSelector,
    environmentCharacterClassNamesSelector,
    environmentIsSeasonalSelector
} from "../../redux/selectors";

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
    const dispatch = useDispatch();

    const { filter, selectedTab } = useSelector(
        state => ({
            filter: characterLeaderboardFilterSelector(state),
            selectedTab: characterLeaderboardTabSelector(state)
        }),
        shallowEqual
    );

    const rowsPerPage = 30;

    const combatMetric = selectedTab === 0 ? "dps" : "hps";

    const dataId = `${raidNameToId(filter.raid)}${
        filter.spec ? filter.spec : filter.role
    }${combatMetric}`;

    const { data, specs, characterClassNames, isSeasonal } = useSelector(
        state => ({
            data: characterLeaderboardDataSelector(state, dataId),
            specs: environmentCharacterSpecsSelector(state),
            characterClassNames: environmentCharacterClassNamesSelector(state),
            isSeasonal: environmentIsSeasonalSelector
        }),
        shallowEqual
    );

    const [page, setPage] = useState(0);

    useEffect(() => {
        setPage(0);
    }, [combatMetric, data, filter]);

    useEffect(() => {
        dispatch(characterLeaderboardFetchData(dataId));
    }, [dataId, data, isSeasonal, dispatch]);

    const characters = data
        ? filterChars(filter, data[filter.difficulty], specs)
        : undefined;

    return (
        <Page title={`Character Leaderboard | Tauri Progress`}>
            <section>
                <CharacterLeaderboardFilter />

                <Tabs
                    value={selectedTab}
                    onChange={(e, value) =>
                        dispatch(characterLeaderboardSetTab(value))
                    }
                >
                    <Tab label="Dps" value={0} />
                    <Tab label="Hps" value={1} />
                </Tabs>

                {data && (
                    <React.Fragment>
                        {data.loading && <Loading />}

                        {data.error && (
                            <ErrorMessage
                                message={data.error}
                                refresh={() =>
                                    dispatch(
                                        characterLeaderboardFetchData({
                                            dataId
                                        })
                                    )
                                }
                            />
                        )}

                        {!data.loading && !data.error && characters && (
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
                                            {characters
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

                                {characters && (
                                    <TablePagination
                                        rowsPerPageOptions={[]}
                                        component="div"
                                        count={characters.length}
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

export default withStyles(styles)(withTheme(React.memo(CharacterLeaderboard)));
