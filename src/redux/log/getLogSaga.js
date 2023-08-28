import { put, select, call, takeLatest } from "redux-saga/effects";
import { isSameLog } from "../../components/Log/helpers";
import { getServerUrl } from "../sagas/helpers";
import { logSetLoading, logSetError, logFill, LOG_FETCH } from "./actions";
import { logDataSelector } from "./selectors";

async function getData(serverUrl, logId, realm) {
    return await fetch(`${serverUrl}/log`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            logId: Number(logId),
            realm: realm,
        }),
    }).then((res) => res.json());
}

function* fetchLog({ payload }) {
    try {
        const { logId, realm } = payload;

        if (isSameLog(logId, realm, yield select(logDataSelector))) {
            return;
        }

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
