import { put, call, takeLatest, select } from "redux-saga/effects";
import { setFightLogLoading, fillFightLog, setFightLogError } from "../actions";

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

        yield put(setFightLogLoading());

        const serverUrl = yield select(state => state.environment.urls.server);
        const response = yield call(getData, serverUrl, logId, realm);

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(fillFightLog(response.response));
        }
    } catch (err) {
        yield put(setFightLogError(err.message));
    }
}

export default function* getLogSaga() {
    yield takeLatest("FIGHTLOG_FETCH", fetchLog);
}
