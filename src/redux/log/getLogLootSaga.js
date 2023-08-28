import { put, select, call, takeLatest } from "redux-saga/effects";
import { getServerUrl } from "../sagas/helpers";
import {
    logLootSetLoading,
    logLootSetError,
    logLootFill,
    LOG_LOOT_FETCH,
} from "./actions";
import { logLootEntireSelector } from "./selectors";

async function getData(serverUrl, items, realm) {
    return await fetch(`${serverUrl}/items`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            items: items,
            realm: realm,
            isEntry: true,
        }),
    }).then((res) => res.json());
}

function* fetchLogLoot({ payload }) {
    try {
        const { items, realm } = payload;

        const { data } = yield select(logLootEntireSelector);

        if (data) return;

        yield put(logLootSetLoading());

        const serverUrl = yield getServerUrl();
        const response = yield call(getData, serverUrl, items, realm);

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(logLootFill(response.response));
        }
    } catch (err) {
        yield put(logLootSetError(err.message));
    }
}

export default function* getLogLootSaga() {
    yield takeLatest(LOG_LOOT_FETCH, fetchLogLoot);
}
