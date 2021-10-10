import { put, select, takeEvery } from "redux-saga/effects";
import { push, replace } from "connected-react-router";
import { isPathSeasonal, getSearchQueryString } from "../../helpers";
import {
    ENVIRONMENT_SEASON_TOGGLE,
    RAIDFILTER_SET,
    RAIDBOSS_TAB_SET,
    CHARACTER_LEADERBOARD_FILTER_SET,
    CHARACTER_LEADERBOARD_TAB_SET,
    GUILD_LEADERBOARD_FILTER_SET,
    GUILD_LEADERBOARD_TAB_SET,
    HISTORY_PUSH
} from "../actions";

import {
    raidFilterSelector,
    raidBossTabSelectedTabSelector,
    characterLeaderboardFilterSelector,
    characterLeaderboardTabSelector,
    guildLeaderboardFilterSelector,
    guildLeaderboardSelectedTabSelector
} from "../selectors";

function* handeHistoryAction({ type, payload }) {
    const { pathname, search } = yield select(state => state.router.location);
    const startOfNewPathName = isPathSeasonal(pathname) ? `/seasonal` : "";

    switch (type) {
        case HISTORY_PUSH:
            yield put(push(`${startOfNewPathName}${payload}`));
            break;
        case RAIDFILTER_SET:
        case RAIDBOSS_TAB_SET:
            yield put(
                replace(
                    `?${getSearchQueryString({
                        ...(yield select(raidFilterSelector)),
                        tab: yield select(raidBossTabSelectedTabSelector)
                    })}`
                )
            );
            break;

        case CHARACTER_LEADERBOARD_FILTER_SET:
        case CHARACTER_LEADERBOARD_TAB_SET:
            yield put(
                replace(
                    `?${getSearchQueryString({
                        ...(yield select(characterLeaderboardFilterSelector)),
                        tab: yield select(characterLeaderboardTabSelector)
                    })}`
                )
            );
            break;
        case GUILD_LEADERBOARD_FILTER_SET:
        case GUILD_LEADERBOARD_TAB_SET:
            yield put(
                replace(
                    `?${getSearchQueryString({
                        ...(yield select(guildLeaderboardFilterSelector)),
                        tab: yield select(guildLeaderboardSelectedTabSelector)
                    })}`
                )
            );
            break;
        case ENVIRONMENT_SEASON_TOGGLE:
            if (yield select(state => state.environment.seasonal.isSeasonal)) {
                yield put(push(`/seasonal${pathname}${search}`));
            } else {
                yield put(
                    push(`${pathname.replace("/seasonal", "")}${search}`)
                );
            }
            break;
        default:
            yield true;
    }
}

export default function* historySaga() {
    yield takeEvery(
        [
            HISTORY_PUSH,
            ENVIRONMENT_SEASON_TOGGLE,
            RAIDFILTER_SET,
            RAIDBOSS_TAB_SET,
            CHARACTER_LEADERBOARD_FILTER_SET,
            CHARACTER_LEADERBOARD_TAB_SET,
            GUILD_LEADERBOARD_FILTER_SET,
            GUILD_LEADERBOARD_TAB_SET
        ],
        handeHistoryAction
    );
}
