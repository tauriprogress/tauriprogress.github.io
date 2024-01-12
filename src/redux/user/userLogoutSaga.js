import { put, call, takeLatest } from "redux-saga/effects";
import { getServerUrl } from "../sagas/helpers";
import { USER_LOGIN_LOGOUT, userLoginSetError } from "./actions";

async function sendRequest(serverUrl) {
    return await fetch(`${serverUrl}/logout`, {
        method: "post",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
}

function* logout({ payload }) {
    try {
        const serverUrl = yield getServerUrl();
        const response = yield call(sendRequest, serverUrl);
    } catch (err) {
        yield put(userLoginSetError(err.message));
    }
}

export default function* logoutSaga() {
    yield takeLatest(USER_LOGIN_LOGOUT, logout);
}
