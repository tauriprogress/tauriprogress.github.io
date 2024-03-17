import { put, call, takeLatest, select } from "redux-saga/effects";
import { getServerUrl } from "../sagas/helpers";
import {
    userLogout,
    userSetError,
    userSetLoading,
    userSetUser,
} from "./actions";
import { userSelector } from "./selectors";
import { APP_INIT } from "../actions";
import { jwtDecode } from "jwt-decode";

async function sendRequest(serverUrl, userToken) {
    return await fetch(`${serverUrl}/user/refresh`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user: userToken,
        }),
    }).then((res) => res.json());
}

function decodeToken(token) {
    try {
        const decoded = jwtDecode(token);
        return decoded;
    } catch (e) {
        return undefined;
    }
}

function* refreshToken() {
    try {
        const serverUrl = yield getServerUrl();

        const userToken = yield select(userSelector);

        const user = decodeToken(userToken);

        if (user) {
            const currentTime = new Date().getTime();
            if (user.expiresAt && user.expiresAt < currentTime) {
                yield put(userSetLoading(true));
                const response = yield call(sendRequest, serverUrl, userToken);
                if (!response.success) {
                    throw new Error(response.errorstring);
                } else {
                    yield put(userSetUser(response.response));
                }
            }
        }
    } catch (err) {
        yield put(userLogout());
        yield put(userSetError(err.message));
    }
}

export default function* refreshTokenSaga() {
    yield takeLatest(APP_INIT, refreshToken);
}
