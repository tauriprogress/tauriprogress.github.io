import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { guildLeaderboardFetch } from "../../redux/actions";

import Page from "../Page";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";
import GuildLeaderboardFilter from "./GuildLeaderboardFilter";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { filterGuilds } from "./helpers";
import { convertFightLength } from "./../../helpers";

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
                    {filterGuilds(filter, tab, data).map((guild, index) => (
                        <p key={index}>
                            {index}. {guild.name},{" "}
                            {convertFightLength(
                                guild.ranking[filter.raid][filter.difficulty][
                                    tab
                                ].time
                            )}
                        </p>
                    ))}
                </section>
            )}
        </Page>
    );
}

export default GuildLeaderboard;
