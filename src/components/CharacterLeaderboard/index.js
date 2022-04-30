import React, { useEffect } from "react";

import { shallowEqual, useDispatch, useSelector } from "react-redux";

import withTheme from "@mui/styles/withTheme";
import withStyles from "@mui/styles/withStyles";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";

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
    characterLeaderboardSetTab,
    characterLeaderboardSetPage,
} from "../../redux/actions";
import {
    characterLeaderboardErrorSelector,
    characterLeaderboardLoadingSelector,
    characterLeaderboardTabSelector,
    characterLeaderboardDataSelector,
    characterLeaderboardFilterSelector,
    characterLeaderboardItemCountSelector,
    characterLeaderboardPageSelector,
    environmentCharacterClassNamesSelector,
    environmentIsSeasonalSelector,
} from "../../redux/selectors";

import { getClassImg } from "../../helpers";

function styles(theme) {
    return {
        uppercase: {
            textTransform: "uppercase",
        },
        cell: {
            padding: theme.spacing(1),
        },
        firstCellName: {
            paddingLeft: theme.spacing(10),
        },
        tableHead: {
            height: "58px",
        },
        tableRow: {
            height: "55px",
        },
    };
}

function CharacterLeaderboard({ classes, theme }) {
    const dispatch = useDispatch();

    const { filter, selectedTab } = useSelector(
        (state) => ({
            filter: characterLeaderboardFilterSelector(state),
            selectedTab: characterLeaderboardTabSelector(state),
        }),
        shallowEqual
    );

    const pageSize = 30;

    const combatMetric = selectedTab === 0 ? "dps" : "hps";

    const {
        loading,
        error,
        data,
        characterClassNames,
        isSeasonal,
        itemCount,
        page,
    } = useSelector(
        (state) => ({
            loading: characterLeaderboardLoadingSelector(state),
            error: characterLeaderboardErrorSelector(state),

            data: characterLeaderboardDataSelector(state),
            itemCount: characterLeaderboardItemCountSelector(state),
            characterClassNames: environmentCharacterClassNamesSelector(state),
            isSeasonal: environmentIsSeasonalSelector,
            page: characterLeaderboardPageSelector(state),
        }),
        shallowEqual
    );
    useEffect(() => {
        dispatch(
            characterLeaderboardFetchData({
                combatMetric,
                filters: filter,
                page,
                pageSize,
            })
        );
    }, [combatMetric, filter, page, pageSize, isSeasonal, dispatch]);

    return (
        <Page title={`Character Leaderboard | Tauri Progress`}>
            <section>
                <CharacterLeaderboardFilter />

                <Tabs
                    value={selectedTab}
                    onChange={(e, value) =>
                        dispatch(characterLeaderboardSetTab(value))
                    }
                    textColor="secondary"
                    indicatorColor="secondary"
                >
                    <Tab label="Dps" value={0} />
                    <Tab label="Hps" value={1} />
                </Tabs>

                {loading && <Loading />}

                {error && (
                    <ErrorMessage
                        message={error}
                        refresh={() =>
                            dispatch(
                                characterLeaderboardFetchData({
                                    combatMetric,
                                    filters: filter,
                                    page,
                                    pageSize,
                                })
                            )
                        }
                    />
                )}

                {!loading && !error && data && (
                    <React.Fragment>
                        <OverflowScroll>
                            <Table>
                                <TableHead className={classes.tableHead}>
                                    <TableRow>
                                        <TableCell
                                            className={classes.firstCellName}
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
                                    {data.map((char, index) => {
                                        const realmName = char.realm;
                                        return (
                                            <TableRow
                                                key={index}
                                                hover
                                                className={classes.tableRow}
                                            >
                                                <TableCell
                                                    className={classes.cell}
                                                >
                                                    <AlignedRankDisplay
                                                        rank={
                                                            index +
                                                            1 +
                                                            page * pageSize
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
                                                                    specIcon={getClassImg(
                                                                        char.class
                                                                    )}
                                                                    specIconTitle={
                                                                        characterClassNames[
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
                                                    {Math.floor(char.score)}
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
                                                                    .alliance,
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
                                                                    .horde,
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

                        <TablePagination
                            rowsPerPageOptions={[]}
                            component="div"
                            count={itemCount}
                            rowsPerPage={pageSize}
                            page={page}
                            backIconButtonProps={{
                                "aria-label": "Previous Page",
                            }}
                            nextIconButtonProps={{
                                "aria-label": "Next Page",
                            }}
                            onPageChange={(e, page) =>
                                dispatch(characterLeaderboardSetPage(page))
                            }
                        />
                    </React.Fragment>
                )}
            </section>
        </Page>
    );
}

export default withStyles(styles)(withTheme(React.memo(CharacterLeaderboard)));
