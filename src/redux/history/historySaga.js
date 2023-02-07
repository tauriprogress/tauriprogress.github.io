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
} from "./actions";

import {
    raidFilterSelector,
    raidBossTabSelectedTabSelector,
    characterLeaderboardFilterSelector,
    characterLeaderboardTabSelector,
    guildLeaderboardFilterSelector,
    guildLeaderboardSelectedTabSelector,
} from "../selectors";

import { history } from "./historySaga";
import { matchPath } from "react-router-dom";

function* handeHistoryAction({ type, payload }) {
    const realmGroupName = matchPath("/:realmGroupName", {
        path: history.location.pathname,
        exact: false,
        strict: false,
    }).params.realmGroupName;

    switch (type) {
        case HISTORY_PUSH:
            history.push(`/${realmGroupName}${payload}`);
            break;
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
        ],
        handeHistoryAction
    );
}
