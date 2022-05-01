import React, { useEffect } from "react";

import { shallowEqual, useDispatch, useSelector } from "react-redux";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";

import Page from "../Page";
import ErrorMessage from "../ErrorMessage";
import PerformanceExplanation from "./PerformanceExplanation";
import OverflowScroll from "../OverflowScroll";
import TablePaginationActions from "../TablePaginationActions";
import CharacterLeaderboardFilter from "./CharacterLeaderboardFilter";
import CharacterLeaderboardList from "./CharacterLeaderboardList";

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
    environmentIsSeasonalSelector,
} from "../../redux/selectors";

import ElevatedLinearProgress from "../ElevatedLinearProgress";

function CharacterLeaderboard() {
    const dispatch = useDispatch();

    const { filter, selectedTab } = useSelector(
        (state) => ({
            filter: characterLeaderboardFilterSelector(state),
            selectedTab: characterLeaderboardTabSelector(state),
        }),
        shallowEqual
    );

    const pageSize = 25;

    const combatMetric = selectedTab === 0 ? "dps" : "hps";

    const { loading, error, data, isSeasonal, itemCount, page } = useSelector(
        (state) => ({
            loading: characterLeaderboardLoadingSelector(state),
            error: characterLeaderboardErrorSelector(state),

            data: characterLeaderboardDataSelector(state),
            itemCount: characterLeaderboardItemCountSelector(state),
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

                {loading && <ElevatedLinearProgress top="40px" />}

                <OverflowScroll>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox" align="right">
                                    Rank
                                </TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>
                                    <PerformanceExplanation />
                                </TableCell>
                                <TableCell>Item level</TableCell>
                                <TableCell>Faction</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <CharacterLeaderboardList data={data} />
                        </TableBody>
                    </Table>
                </OverflowScroll>

                <TablePagination
                    rowsPerPageOptions={[]}
                    component="div"
                    count={itemCount}
                    rowsPerPage={pageSize}
                    page={page}
                    onPageChange={(e, page) =>
                        dispatch(characterLeaderboardSetPage(page))
                    }
                    ActionsComponent={TablePaginationActions}
                />

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
            </section>
        </Page>
    );
}

export default React.memo(CharacterLeaderboard);
