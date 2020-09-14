import { put, call, takeLatest, select } from "redux-saga/effects";
import {
    raidLoading,
    raidFill,
    raidSetError,
    raidChangeRaidData,
    raidSelectBoss
} from "../actions";

async function getData(serverUrl, raidName) {
    return await fetch(`${serverUrl}/getraid`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            raidName: raidName
        })
    }).then(res => res.json());
}

function* fetchRaid({ payload: raidName }) {
    try {
        yield put(raidLoading(raidName));
        yield put(raidChangeRaidData(raidName));
        yield put(raidSelectBoss(0));

        const serverUrl = yield select(state => state.environment.serverUrl);
        const response = yield call(getData, serverUrl, raidName);

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(raidFill(response.response));
        }
    } catch (err) {
        yield put(raidSetError(err.message));
    }
}

export default function* getRaidSaga() {
    yield takeLatest("RAID_FETCH", fetchRaid);
}
