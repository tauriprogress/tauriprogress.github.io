import { select, takeEvery } from "redux-saga/effects";
import { getSearchQueryString } from "../../helpers";
import {
    RAIDFILTER_SET,
    RAIDBOSS_TAB_SET,
    CHARACTER_LEADERBOARD_FILTER_SET,
    CHARACTER_LEADERBOARD_TAB_SET,
    GUILD_LEADERBOARD_FILTER_SET,
    GUILD_LEADERBOARD_TAB_SET,
    HISTORY_PUSH,
    NAVIGATION_ITEM_SET,
} from "../actions";

import {
    raidFilterSelector,
    raidBossTabSelectedTabSelector,
    characterLeaderboardFilterSelector,
    characterLeaderboardTabSelector,
    guildLeaderboardFilterSelector,
    guildLeaderboardSelectedTabSelector,
} from "../selectors";

import { history } from "../";
import { getCurrentRealmGroupName } from "./helpers";

function* handeHistoryAction({ type, payload }) {
    switch (type) {
        case HISTORY_PUSH:
            const realmGroupName = payload.realmGroupName
                ? payload.realmGroupName
                : getCurrentRealmGroupName();
            history.push(`/${realmGroupName}${payload.path}`);
            break;
        case NAVIGATION_ITEM_SET:
        case RAIDFILTER_SET:
        case RAIDBOSS_TAB_SET:
            history.replace(
                `?${getSearchQueryString({
                    ...(yield select(raidFilterSelector)),
                    tab: yield select(raidBossTabSelectedTabSelector),
                })}`
            );
            break;

        case CHARACTER_LEADERBOARD_FILTER_SET:
        case CHARACTER_LEADERBOARD_TAB_SET:
            history.replace(
                `?${getSearchQueryString({
                    ...(yield select(characterLeaderboardFilterSelector)),
                    tab: yield select(characterLeaderboardTabSelector),
                })}`
            );
            break;
        case GUILD_LEADERBOARD_FILTER_SET:
        case GUILD_LEADERBOARD_TAB_SET:
            history.replace(
                `?${getSearchQueryString({
                    ...(yield select(guildLeaderboardFilterSelector)),
                    tab: yield select(guildLeaderboardSelectedTabSelector),
                })}`
            );
            break;
        default:
            yield true;
    }
}

export default function* historySaga() {
    yield takeEvery(
        [
            HISTORY_PUSH,
            RAIDFILTER_SET,
            RAIDBOSS_TAB_SET,
            CHARACTER_LEADERBOARD_FILTER_SET,
            CHARACTER_LEADERBOARD_TAB_SET,
            GUILD_LEADERBOARD_FILTER_SET,
            GUILD_LEADERBOARD_TAB_SET,
            NAVIGATION_ITEM_SET,
        ],
        handeHistoryAction
    );
}
