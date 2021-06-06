import { put, call, takeEvery, select } from "redux-saga/effects";
import {
    setCharacterLeaderboardLoading,
    setCharacterLeaderboardError,
    fillCharacterLeaderboard
} from "../actions";

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
    const { dataId } = payload;
    try {
        const dataExists = yield select(state =>
            state.characterLeaderboard.data[dataId] ? true : false
        );

        if (dataExists) return;

        yield put(setCharacterLeaderboardLoading(dataId));

        const serverUrl = yield select(state => state.environment.urls.server);
        const response = yield call(getData, serverUrl, dataId);

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(
                fillCharacterLeaderboard({ dataId, data: response.response })
            );
        }
    } catch (err) {
        yield put(
            setCharacterLeaderboardError({
                dataId: dataId,
                error: err.message
            })
        );
    }
}

export default function* getLeaderboardDataSaga() {
    yield takeEvery(
        "CHARACTER_LEADERBOARD_DATA_FETCH",
        fetchCharacterLeaderboard
    );
}
