import { serverUrl } from "tauriprogress-constants/urls";

import { put, call, takeEvery, select } from "redux-saga/effects";
import {
    playerLatestKillsLoading,
    playerLatestKillsFill,
    playerLatestKillsSetError
} from "../actions";

async function getData(playerName, realm) {
    return await fetch(`${serverUrl}/playerBossKills`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            playerName: playerName,
            realm: realm,
            limit: 13
        })
    }).then(res => res.json());
}

function* fetchLatestKillsOfPlayer({ payload }) {
    try {
        const { playerName, realm } = payload;

        const loading = yield select(state => state.player.latestKills.loading);

        if (loading) {
            return;
        }

        yield put(playerLatestKillsLoading(true));

        const response = yield call(getData, playerName, realm);

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(playerLatestKillsFill(response.response));
        }
    } catch (err) {
        yield put(playerLatestKillsSetError(err.message));
    }
}

export default function* getPlayerLatestKillsSaga() {
    yield takeEvery("PLAYER_DATA_FETCH", fetchLatestKillsOfPlayer);
}
