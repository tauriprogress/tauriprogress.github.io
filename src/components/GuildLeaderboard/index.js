import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { guildLeaderboardFetch } from "../../redux/actions";

import Page from "../Page";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";
import GuildLeaderboardFilter from "./GuildLeaderboardFilter";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

function GuildLeaderboard() {
    const { data, loading, error, realmGroup, filter } = useSelector(state => ({
        ...state.guildLeaderboard,
        realmGroup: state.environment.realmGroup
    }));

    const dispatch = useDispatch();

    const [tab, setTab] = useState("fullClear");

    useEffect(() => {
        dispatch(guildLeaderboardFetch(realmGroup));
    }, [realmGroup]);

    return (
        <Page title={"Guild Leaderboard | Tauri Progress"}>
            {loading && <Loading />}
            {error && <ErrorMessage message={error} />}
            {!loading && !error && data && (
                <section>
                    <GuildLeaderboardFilter />
                    <Tabs value={tab} onChange={(e, value) => setTab(value)}>
                        <Tab label="FULL CLEAR" value={"fullClear"} />
                        <Tab label="BEST KILLS" value={"fastestKills"} />
                    </Tabs>
                    {JSON.stringify(data)}
                </section>
            )}
        </Page>
    );
}

export default GuildLeaderboard;
