import { put, call, takeLatest } from "redux-saga/effects";
import { getServerUrl } from "../sagas/helpers";
import { logSetLoading, logSetError, logFill, LOG_FETCH } from "./actions";

async function getData(serverUrl, logId, realm) {
    return await fetch(`${serverUrl}/getlog`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            logId: Number(logId),
            realm: realm
        })
    }).then(res => res.json());
}

function* fetchLog({ payload }) {
    try {
        const { logId, realm } = payload;

        yield put(logSetLoading());

        const serverUrl = yield getServerUrl();
        const response = yield call(getData, serverUrl, logId, realm);

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(logFill(response.response));
        }
    } catch (err) {
        yield put(logSetError(err.message));
    }
}

export default function* getLogSaga() {
    yield takeLatest(LOG_FETCH, fetchLog);
}
