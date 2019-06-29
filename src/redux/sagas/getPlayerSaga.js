import { raidName } from "tauriprogress-constants/currentContent";
import { serverUrl } from "tauriprogress-constants/urls";

import { put, call, takeEvery, select } from "redux-saga/effects";
import { playerLoading, playerFill, playerSetError } from "../actions";

async function getData(playerName, realm) {
    return await fetch(`${serverUrl}/getplayer`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            playerName: playerName,
            raidName: raidName,
            realm: realm
        })
    }).then(res => res.json());
}

function* fetchPlayer({ payload }) {
    try {
        const { playerName, realm } = payload;

        const loading = yield select(state => state.player.loading);
        const oldplayerName = yield select(state => state.player.playerName);
        const oldRealm = yield select(state => state.player.realm);

        if (loading && playerName === oldplayerName && realm === oldRealm) {
            return;
        }

        yield put(
            playerLoading({
                playerName,
                realm
            })
        );

        const response = yield call(getData, playerName, realm);

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(playerFill(response.response));
        }
    } catch (err) {
        yield put(playerSetError(err.message));
    }
}

export default function* getPlayerSaga() {
    yield takeEvery("PLAYER_FETCH", fetchPlayer);
}
