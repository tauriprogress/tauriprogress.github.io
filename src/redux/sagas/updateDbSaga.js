import { serverUrl } from "tauriprogress-constants/urls";
import { put, call, takeLatest } from "redux-saga/effects";
import {
    additionalInfoLoading,
    additionalInfoFill,
    additionalInfoSetError
} from "../actions";

async function getData() {
    return await fetch(`${serverUrl}/update`).then(res => res.json());
}

function* fetchUpdateDb() {
    try {
        yield put(additionalInfoLoading());

        const response = yield call(getData);

        if (!response.success) {
            if (response.lastUpdated)
                yield put(additionalInfoFill(response.lastUpdated));

            throw new Error(response.errorstring);
        } else {
            yield put(additionalInfoFill(response.response));
        }
    } catch (err) {
        yield put(additionalInfoSetError(err.message));
    }
}

export default function* updateDbSaga() {
    yield takeLatest("UPDATE_DB_FETCH", fetchUpdateDb);
}
