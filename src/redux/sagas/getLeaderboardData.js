import { put, call, takeEvery, select } from "redux-saga/effects";
import {
    setLeaderboardLoading,
    setLeaderboardError,
    fillLeaderboard
} from "../actions";

async function getData(serverUrl, dataId) {
    return await fetch(`${serverUrl}/getleaderboard`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            dataId: dataId
        })
    }).then(res => res.json());
}

function* fetchLeaderboard({ payload }) {
    const { dataId } = payload;
    try {
        yield put(setLeaderboardLoading(dataId));

        const serverUrl = yield select(state => state.environment.urls.server);
        const response = yield call(getData, serverUrl, dataId);

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(fillLeaderboard({ dataId, data: response.response }));
        }
    } catch (err) {
        yield put(
            setLeaderboardError({
                dataId: dataId,
                error: err.message
            })
        );
    }
}

export default function* getLeaderboardDataSaga() {
    yield takeEvery("LEADERBOARD_DATA_FETCH", fetchLeaderboard);
}
