import { put, call, takeLatest, select } from "redux-saga/effects";

import {
    RAIDSUMMARY_FETCH,
    raidSummarySetLoading,
    raidSummaryFill,
    raidSummarySetError
} from "./actions";

import { getServerUrl } from "../sagas/helpers";

import { raidSummaryRaidIdSelector } from "./selectors";

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
        const oldRaidId = yield select(raidSummaryRaidIdSelector);
        if (raidId === oldRaidId) return;

        yield put(
            raidSummarySetLoading({
                raidId: raidId,
                loading: true
            })
        );

        const serverUrl = yield getServerUrl();
        const response = yield call(getData, serverUrl, raidId);

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(raidSummaryFill(response.response));
        }
    } catch (err) {
        yield put(raidSummarySetError(err.message));
    }
}

export default function* getRaidSummarySaga() {
    yield takeLatest(RAIDSUMMARY_FETCH, fetchRaidSummary);
}
