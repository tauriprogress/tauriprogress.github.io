import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";
import LeaderboardFilter from "./LeaderboardFilter";

import { fetchLeaderboardData } from "../../redux/actions";

import { raidNameToId } from "../../helpers";

function Leaderboard() {
    const dispatch = useDispatch();
    const { data, filter } = useSelector(state => state.leaderboard);
    const [combatMetric, selectCombatMetric] = useState("dps");
    let filteredData = [];
    let loading = false;
    let error = null;

    const dataId = `${raidNameToId(filter.raid)}${filter.spec}${combatMetric}`;
    if (!data[dataId]) {
        dispatch(
            fetchLeaderboardData({
                dataId
            })
        );
        filteredData = null;
    } else {
        filteredData = data[dataId][filter.difficulty];
        loading = data[dataId].loading;
        error = data[dataId].error;
    }

    return (
        <section>
            <LeaderboardFilter />

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

                    {!loading &&
                        !error &&
                        filteredData &&
                        JSON.stringify(filteredData)}
                </React.Fragment>
            )}
        </section>
    );
}

export default Leaderboard;
