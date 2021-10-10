import {
    CHARACTER_LEADERBOARD_ROUTE,
    GUILD_LEADERBOARD_ROUTE,
    RAID_ROUTE
} from "../../routes";
import {
    environmentIsSeasonalSelector,
    environmentRealmGroupSelector,
    raidFilterSelector,
    raidBossTabSelectedTabSelector,
    characterLeaderboardFilterSelector,
    characterLeaderboardTabSelector,
    guildLeaderboardFilterSelector,
    guildLeaderboardSelectedTabSelector
} from "../selectors";

import { getSearchQueryString } from "../../helpers";

const updateHistoryStateMiddleware = history => store => next => action => {
    if (action.type === "@@router/LOCATION_CHANGE") {
        const state = store.getState();
        // on location change, set the location state to include the environment.
        if (action.payload.action !== "POP") {
            history.location.state = {
                ...history.location.state,
                environment: {
                    realmGroup: environmentRealmGroupSelector(state),
                    isSeasonal: environmentIsSeasonalSelector(state)
                }
            };
        }

        if (
            RAID_ROUTE.isCurrentRoute(history.location.pathname) &&
            action.payload.action !== "REPLACE"
        ) {
            const filter = raidFilterSelector(state);
            const selectedTab = raidBossTabSelectedTabSelector(state);
            history.replace(
                `?${getSearchQueryString({ ...filter, tab: selectedTab })}`
            );
        }

        if (
            CHARACTER_LEADERBOARD_ROUTE.isCurrentRoute(
                history.location.pathname
            ) &&
            action.payload.action !== "REPLACE"
        ) {
            const filter = characterLeaderboardFilterSelector(state);
            const selectedTab = characterLeaderboardTabSelector(state);

            history.replace(
                `?${getSearchQueryString({ ...filter, tab: selectedTab })}`
            );
        }

        if (
            GUILD_LEADERBOARD_ROUTE.isCurrentRoute(history.location.pathname) &&
            action.payload.action !== "REPLACE"
        ) {
            const filter = guildLeaderboardFilterSelector(state);
            const selectedTab = guildLeaderboardSelectedTabSelector(state);

            history.replace(
                `?${getSearchQueryString({ ...filter, tab: selectedTab })}`
            );
        }
    }

    return next(action);
};

export default updateHistoryStateMiddleware;
