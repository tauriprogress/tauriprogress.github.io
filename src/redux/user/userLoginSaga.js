import { put, call, takeLatest } from "redux-saga/effects";
import { getServerUrl } from "../sagas/helpers";
import { USER_LOGIN_FETCH, userLoginSetError, userSet } from "./actions";
import { getCurrentRealmGroupName } from "../history/helpers";

async function getData(serverUrl, code) {
    return await fetch(`${serverUrl}/login`, {
        method: "post",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            code: code,
        }),
    }).then((res) => res.json());
}

function* login({ payload }) {
    try {
        const { code } = payload;

        const serverUrl = yield getServerUrl();
        const response = yield call(getData, serverUrl, code);

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(userSet(response.response));

            payload.history.push(
                `/${getCurrentRealmGroupName()}/weeklychallengevote`
            );
        }
    } catch (err) {
        yield put(userLoginSetError(err.message));
    }
}

export default function* loginSaga() {
    yield takeLatest(USER_LOGIN_FETCH, login);
}
