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

import { environmentSetEnvironment } from "../actions";

import { getSearchQueryString } from "../../helpers";

const updateHistoryStateMiddleware = history => store => next => action => {
    if (
        action.type === "@@router/LOCATION_CHANGE" &&
        action.payload.action === "POP"
    ) {
        const realmGroup =
            action.payload.location.state &&
            action.payload.location.state.environment &&
            action.payload.location.state.environment.realmGroup;
        const isSeasonal =
            action.payload.location.state &&
            action.payload.location.state.environment &&
            action.payload.location.state.environment.isSeasonal;

        if (realmGroup && isSeasonal !== undefined) {
            const state = store.getState();
            const oldRealmGroup = environmentRealmGroupSelector(state);
            const oldIsSeasonal = environmentIsSeasonalSelector(state);
            if (realmGroup !== oldRealmGroup || isSeasonal !== oldIsSeasonal) {
                store.dispatch(
                    environmentSetEnvironment({
                        realmGroup,
                        isSeasonal,
                        location: action.payload.location
                    })
                );
            }
        }
    }

    if (
        (action.type === "@@router/LOCATION_CHANGE" &&
            action.payload.action === "PUSH") ||
        (action.type === "@@router/LOCATION_CHANGE" &&
            action.payload.isFirstRendering)
    ) {
        const state = store.getState();
        const locationState = {
            ...(history.location.state || {}),
            environment: {
                realmGroup: environmentRealmGroupSelector(state),
                isSeasonal: environmentIsSeasonalSelector(state)
            }
        };
        let path = action.payload.location.pathname;

        if (RAID_ROUTE.isCurrentRoute(history.location.pathname)) {
            const filter = raidFilterSelector(state);
            const selectedTab = raidBossTabSelectedTabSelector(state);

            path = `${action.payload.location.pathname}?${getSearchQueryString({
                ...filter,
                tab: selectedTab
            })}`;
        } else if (
            CHARACTER_LEADERBOARD_ROUTE.isCurrentRoute(
                history.location.pathname
            )
        ) {
            const filter = characterLeaderboardFilterSelector(state);
            const selectedTab = characterLeaderboardTabSelector(state);
            path = `?${getSearchQueryString({
                ...filter,
                tab: selectedTab
            })}`;
        } else if (
            GUILD_LEADERBOARD_ROUTE.isCurrentRoute(history.location.pathname)
        ) {
            const filter = guildLeaderboardFilterSelector(state);
            const selectedTab = guildLeaderboardSelectedTabSelector(state);
            path = `?${getSearchQueryString({
                ...filter,
                tab: selectedTab
            })}`;
        } else if (action.payload.location.search) {
            path = `${path}${action.payload.location.search}`;
        }
        history.replace(path, locationState);
    } else {
        return next(action);
    }
};

export default updateHistoryStateMiddleware;
