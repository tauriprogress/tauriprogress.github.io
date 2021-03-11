import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { guildLeaderboardFetch } from "../../redux/actions";

import Page from "../Page";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

function GuildLeaderboard() {
    const { data, loading, error, realmGroup } = useSelector(state => ({
        ...state.guildLeaderboard,
        realmGroup: state.environment.realmGroup
    }));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(guildLeaderboardFetch(realmGroup));
    }, [realmGroup]);
    return (
        <Page title={"Guild Leaderboard | Tauri Progress"}>
            {loading && <Loading />}
            {error && <ErrorMessage message={error} />}
            {!loading && !error && data && JSON.stringify(data)}
        </Page>
    );
}

export default GuildLeaderboard;
