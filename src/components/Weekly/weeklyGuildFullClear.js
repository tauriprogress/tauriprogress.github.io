import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { weeklyGuildFullClearEntireSelector } from "../../redux/selectors";
import GuildLeaderboardList from "../GuildLeaderboardList";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import { weeklyGuildFullClearFetch } from "../../redux/actions";
import { useEffect } from "react";
import { transformGuilds } from "./helpers";

function WeeklyGuildFullClear() {
    const { loading, guilds, error } = useSelector(
        weeklyGuildFullClearEntireSelector
    );
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(weeklyGuildFullClearFetch());
    }, [dispatch]);

    return (
        <React.Fragment>
            {loading && <Loading />}
            {guilds && (
                <GuildLeaderboardList guilds={transformGuilds(guilds)} />
            )}
            {error && (
                <ErrorMessage
                    message={error}
                    refresh={() => dispatch(weeklyGuildFullClearFetch())}
                />
            )}
        </React.Fragment>
    );
}

export default React.memo(WeeklyGuildFullClear);
