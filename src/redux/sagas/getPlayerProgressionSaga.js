import { serverUrl } from "tauriprogress-constants/urls";

import { put, call, takeEvery, select } from "redux-saga/effects";
import {
    playerProgressionLoading,
    playerProgressionFill,
    playerProgressionSetError
} from "../actions";

async function getData(playerName, realm, raidName, characterClass) {
    return await fetch(`${serverUrl}/getplayerperformance`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            playerName,
            raidName,
            realm,
            characterClass
        })
    }).then(res => res.json());
}

function* fetchPlayerProgression({ payload }) {
    try {
        const { playerName, realm, raidName, characterClass } = payload;

        const loading = yield select(state => state.player.progression.loading);

        if (loading) {
            return;
        }

        yield put(playerProgressionLoading());

        const response = yield call(
            getData,
            playerName,
            realm,
            raidName,
            characterClass
        );

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(playerProgressionFill(response.response));
        }
    } catch (err) {
        yield put(playerProgressionSetError(err.message));
    }
}

export default function* getPlayerProgressionSaga() {
    yield takeEvery("PLAYER_PROGRESSION_FETCH", fetchPlayerProgression);
}
