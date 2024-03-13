import { put, call, takeLatest } from "redux-saga/effects";
import { getServerUrl } from "../sagas/helpers";
import {
    USER_AUTHENTICATE,
    userAuthenticateLoading,
    userLoginSetError,
    userSet,
} from "./actions";

async function sendRequest(serverUrl) {
    return await fetch(`${serverUrl}/authenticate`, {
        method: "get",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
}

function* authenticate({ payload }) {
    try {
        const serverUrl = yield getServerUrl();

        yield put(userAuthenticateLoading(true));
        const response = yield call(sendRequest, serverUrl);

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(userSet(response.response));
        }
    } catch (err) {
        yield put(userLoginSetError(err.message));
    }
}

export default function* userAuthenticateSaga() {
    yield takeLatest(USER_AUTHENTICATE, authenticate);
}
