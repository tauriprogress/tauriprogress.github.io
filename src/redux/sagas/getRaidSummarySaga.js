import { put, call, takeLatest, select } from "redux-saga/effects";
import {
    setRaidSummaryLoading,
    setRaidSummaryError,
    fillRaidSummary
} from "../actions";

async function getData(serverUrl, raidId) {
    return await fetch(`${serverUrl}/getraidsummary`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            raidId: raidId
        })
    }).then(res => res.json());
}

function* fetchRaidSummary({ payload: raidId }) {
    try {
        yield put(setRaidSummaryLoading(true));

        const serverUrl = yield select(state => state.environment.urls.server);
        const response = yield call(getData, serverUrl, raidId);

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(fillRaidSummary(response.response));
        }
    } catch (err) {
        yield put(setRaidSummaryError(err.message));
    }
}

export default function* getRaidSummarySaga() {
    yield takeLatest("RAIDSUMMARY_FETCH", fetchRaidSummary);
}
