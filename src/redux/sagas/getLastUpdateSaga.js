import { put, call, takeLatest } from "redux-saga/effects";
import {
    additionalInfoLoading,
    additionalInfoFill,
    additionalInfoSetError
} from "../actions";
import { getServerUrl } from "./helpers";

async function getData(serverUrl) {
    return await fetch(`${serverUrl}/lastupdated`).then(res => res.json());
}

function* fetchLastUpdated() {
    try {
        yield put(additionalInfoLoading());

        const serverUrl = yield getServerUrl();
        const response = yield call(getData, serverUrl);

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(additionalInfoFill(response.response));
        }
    } catch (err) {
        yield put(additionalInfoSetError(err.message));
    }
}

export default function* getLastUpdateSaga() {
    yield takeLatest("LAST_UPDATED_FETCH", fetchLastUpdated);
}
