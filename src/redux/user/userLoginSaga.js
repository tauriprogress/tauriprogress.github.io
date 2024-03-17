import { put, call, takeLatest } from "redux-saga/effects";
import { getServerUrl } from "../sagas/helpers";
import { USER_LOGIN, userSetError, userSetUser } from "./actions";
import { getCurrentRealmGroupName } from "../history/helpers";

async function getData(serverUrl, code) {
    return await fetch(`${serverUrl}/user/login`, {
        method: "post",
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
            yield put(userSetUser(response.response));

            payload.history.push(
                `/${getCurrentRealmGroupName()}/weeklychallengevote`
            );
        }
    } catch (err) {
        yield put(userSetError(err.message));
    }
}

export default function* loginSaga() {
    yield takeLatest(USER_LOGIN, login);
}
