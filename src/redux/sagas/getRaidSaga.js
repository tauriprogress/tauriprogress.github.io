import { put, call, takeLatest } from "redux-saga/effects";
import { raidLoading, raidFill, raidSetError } from "../actions";
import { serverUrl } from "../../constants/urls";

async function getData(raidName) {
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
        yield put(raidLoading());

        const response = yield call(getData, raidName);

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
