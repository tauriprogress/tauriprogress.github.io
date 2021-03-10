import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { guildLeaderboardFetch } from "../../redux/actions";

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
        <div>
            <p>{error}</p>
            <p>{loading}</p>
            <p>{JSON.stringify(data)}</p>
        </div>
    );
}

export default GuildLeaderboard;
