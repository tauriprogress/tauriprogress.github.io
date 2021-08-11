import { CHARACTER_LEADERBOARD_DATA_FETCH } from "./actions";
import { put, call, takeEvery, select } from "redux-saga/effects";
import {
    characterLeaderboardSetLoading,
    characterLeaderboardSetError,
    characterLeaderboardFill
} from "./actions";
import { characterLeaderboardDataExistsSelector } from "./selectors";
import { getServerUrl } from "../sagas/helpers";

async function getData(serverUrl, dataId) {
    return await fetch(`${serverUrl}/leaderboard/character`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            dataId: dataId
        })
    }).then(res => res.json());
}

function* fetchCharacterLeaderboard({ payload }) {
    try {
        const dataExists = yield select(state =>
            characterLeaderboardDataExistsSelector(state, payload)
        );

        if (dataExists) return;

        yield put(characterLeaderboardSetLoading(payload));

        const serverUrl = yield getServerUrl();
        const response = yield call(getData, serverUrl, payload);

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(
                characterLeaderboardFill({
                    dataId: payload,
                    data: response.response
                })
            );
        }
    } catch (err) {
        yield put(
            characterLeaderboardSetError({
                dataId: payload,
                error: err.message
            })
        );
    }
}

export default function* getLeaderboardDataSaga() {
    yield takeEvery(
        CHARACTER_LEADERBOARD_DATA_FETCH,
        fetchCharacterLeaderboard
    );
}
