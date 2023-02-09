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
    QUERY_FILTER_INIT,
    QUERY_FILTER_CLOSE,
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
import { FILTER_TYPE_RAID } from "../../components/RaidFilter";
import { FILTER_TYPE_CHARACTER_LB } from "../../components/CharacterLeaderboard/CharacterLeaderboardFilter";
import { FILTER_TYPE_GUILD_LB } from "../../components/GuildLeaderboard/GuildLeaderboardFilter";

function* handeHistoryAction({ type, payload }) {
    switch (type) {
        case HISTORY_PUSH:
            const realmGroupName = payload.realmGroupName
                ? payload.realmGroupName
                : getCurrentRealmGroupName();
            history.push(`/${realmGroupName}${payload.path}`);
            break;
        case QUERY_FILTER_INIT:
            switch (payload) {
                case FILTER_TYPE_RAID:
                    history.replace(
                        `?${getSearchQueryString({
                            ...(yield select(raidFilterSelector)),
                            tab: yield select(raidBossTabSelectedTabSelector),
                        })}`
                    );
                    break;
                case FILTER_TYPE_CHARACTER_LB:
                    history.replace(
                        `?${getSearchQueryString({
                            ...(yield select(
                                characterLeaderboardFilterSelector
                            )),
                            tab: yield select(characterLeaderboardTabSelector),
                        })}`
                    );
                    break;
                case FILTER_TYPE_GUILD_LB:
                    history.replace(
                        `?${getSearchQueryString({
                            ...(yield select(guildLeaderboardFilterSelector)),
                            tab: yield select(
                                guildLeaderboardSelectedTabSelector
                            ),
                        })}`
                    );
                    break;
                default:
                    break;
            }
            break;
        case QUERY_FILTER_CLOSE:
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
            QUERY_FILTER_INIT,
            QUERY_FILTER_CLOSE,
        ],
        handeHistoryAction
    );
}
