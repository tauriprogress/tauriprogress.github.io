import { put, call, takeEvery, select } from "redux-saga/effects";
import {
    playerDataLoading,
    playerDataFill,
    playerDataSetError,
    playerProgressionFetch
} from "../actions";

async function getData(serverUrl, playerName, realm) {
    return await fetch(`${serverUrl}/getplayer`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            playerName: playerName,
            realm: realm
        })
    }).then(res => res.json());
}

function* fetchPlayer({ payload }) {
    try {
        const { playerName, realm } = payload;

        const loading = yield select(state => state.player.data.loading);

        if (loading) {
            return;
        }

        yield put(
            playerDataLoading({
                playerName,
                realm
            })
        );

        const serverUrl = yield select(state => state.environment.serverUrl);
        const response = yield call(getData, serverUrl, playerName, realm);

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(playerDataFill(response.response));
            let selectedRaid = yield select(
                state => state.player.progression.selectedRaid
            );
            yield put(
                playerProgressionFetch({
                    playerName,
                    characterClass: response.response.class,
                    realm,
                    raidName: selectedRaid
                })
            );
        }
    } catch (err) {
        yield put(playerDataSetError(err.message));
    }
}

export default function* getPlayerDataSaga() {
    yield takeEvery("PLAYER_DATA_FETCH", fetchPlayer);
}
