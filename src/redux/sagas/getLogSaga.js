import { put, call, takeLatest, select } from "redux-saga/effects";
import { fightLogLoading, fightLogFill, fightLogSetError } from "../actions";

async function getData(serverUrl, logId, realm) {
    return await fetch(`${serverUrl}/getlog`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            logId: logId,
            realm: realm
        })
    }).then(res => res.json());
}

function* fetchLog({ payload }) {
    try {
        const { logId, realm } = payload;

        yield put(fightLogLoading());

        const serverUrl = yield select(state => state.environment.serverUrl);
        const response = yield call(getData, serverUrl, logId, realm);

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(fightLogFill(response.response));
        }
    } catch (err) {
        yield put(fightLogSetError(err.message));
    }
}

export default function* getLogSaga() {
    yield takeLatest("FIGHT_LOG_FETCH", fetchLog);
}
