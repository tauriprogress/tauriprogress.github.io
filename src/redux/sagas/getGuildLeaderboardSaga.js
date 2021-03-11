import { put, call, takeEvery, select } from "redux-saga/effects";
import {
    guildLeaderboardSetError,
    guildLeaderboardLoad,
    guildLeaderboardFill
} from "../actions";

async function getData(serverUrl) {
    return await fetch(`${serverUrl}/leaderboard/guild`).then(res =>
        res.json()
    );
}

function* fetchGuildLeaderboard({ payload }) {
    try {
        const { requested, realmGroup, loading } = yield select(state => ({
            requested: !!state.guildLeaderboard.data,
            realmGroup: state.guildLeaderboard.realmGroup,
            loading: state.guildLeaderboard.loading
        }));

        if (
            (requested && realmGroup === payload) ||
            (loading && realmGroup === payload)
        ) {
            return;
        }
        yield put(guildLeaderboardLoad());

        const serverUrl = yield select(state => state.environment.urls.server);

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
    yield takeEvery("GUILD_LEADERBOARD_FETCH", fetchGuildLeaderboard);
}
