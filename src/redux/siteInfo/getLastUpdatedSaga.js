import { put, call, takeLatest } from "redux-saga/effects";
import {
    SITE_INFO_LAST_UPDATED_FETCH,
    siteInfoSetLoading,
    siteInfoFill,
    siteInfoSetError,
} from "./actions";

import { getServerUrl } from "../sagas/helpers";

async function getData(serverUrl) {
    return await fetch(`${serverUrl}/lastupdated`).then((res) => res.json());
}

function* fetchLastUpdated() {
    try {
        yield put(siteInfoSetLoading(true));

        const serverUrl = yield getServerUrl();
        const response = yield call(getData, serverUrl);

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(siteInfoFill(response.response));
        }
    } catch (err) {
        yield put(siteInfoSetError(err.message));
    }
}

export default function* getLastUpdatedSaga() {
    yield takeLatest(SITE_INFO_LAST_UPDATED_FETCH, fetchLastUpdated);
}
