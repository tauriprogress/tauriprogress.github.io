import { put, call, takeEvery, select } from "redux-saga/effects";
import {
    GUILD_LEADERBOARD_FETCH,
    guildLeaderboardSetLoading,
    guildLeaderboardSetError,
    guildLeaderboardFill
} from "./actions";
import {
    guildLeaderboardDataExistsSelector,
    guildLeaderboardRealmGroupSelector,
    guildLeaderboardLoadingSelector
} from "./selectors";
import { getServerUrl } from "../sagas/helpers";

async function getData(serverUrl) {
    return await fetch(`${serverUrl}/leaderboard/guild`).then(res =>
        res.json()
    );
}

function* fetchGuildLeaderboard({ payload }) {
    try {
        const { requested, realmGroup, loading } = yield select(state => ({
            requested: guildLeaderboardDataExistsSelector(state),
            realmGroup: guildLeaderboardRealmGroupSelector(state),
            loading: guildLeaderboardLoadingSelector(state)
        }));

        if (
            (requested && realmGroup === payload) ||
            (loading && realmGroup === payload)
        ) {
            return;
        }
        yield put(guildLeaderboardSetLoading());

        const serverUrl = yield getServerUrl();

        const response = yield call(getData, serverUrl);
        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(
                guildLeaderboardFill({
                    data: response.response,
                    realmGroup: payload
                })
            );
        }
    } catch (err) {
        yield put(guildLeaderboardSetError(err.message));
    }
}

export default function* getGuildsSaga() {
    yield takeEvery(GUILD_LEADERBOARD_FETCH, fetchGuildLeaderboard);
}
