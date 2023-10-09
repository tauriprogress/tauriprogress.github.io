import { put, call } from "redux-saga/effects";
import { getServerUrl, takeLatestIfTrue } from "../../sagas/helpers";
import {
    WEEKLY_GUILDFULLCLEAR_FETCH,
    weeklGuildFullClearFill,
    weeklGuildFullClearSetError,
    weeklGuildFullClearSetLoading,
} from "../actions";

async function getData(serverUrl) {
    return await fetch(`${serverUrl}/weekly/guildfullclear`).then((res) =>
        res.json()
    );
}

function* fetchWeeklyGuildsFullClear() {
    try {
        yield put(weeklGuildFullClearSetLoading(true));

        const serverUrl = yield getServerUrl();

        const response = yield call(getData, serverUrl);

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(
                weeklGuildFullClearFill({
                    guilds: response.response,
                })
            );
        }
    } catch (err) {
        yield put(weeklGuildFullClearSetError(err.message));
    }
}

export default function* getGuildListSaga() {
    yield takeLatestIfTrue(
        WEEKLY_GUILDFULLCLEAR_FETCH,
        fetchWeeklyGuildsFullClear
    );
}
