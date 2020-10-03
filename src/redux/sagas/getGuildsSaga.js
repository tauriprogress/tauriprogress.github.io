import { put, call, takeEvery, select } from "redux-saga/effects";
import { guildsSetError, guildsLoad, guildsFill } from "../actions";

async function getData(serverUrl) {
    return await fetch(`${serverUrl}/getguildlist`).then(res => res.json());
}

function* fetchGuilds() {
    try {
        const requested = yield select(state => !!state.guildList.data);

        if (requested) {
            return;
        }

        yield put(guildsLoad());

        const serverUrl = yield select(state => state.environment.urls.server);

        const response = yield call(getData, serverUrl);
        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(guildsFill(response.response));
        }
    } catch (err) {
        yield put(guildsSetError(err.message));
    }
}

export default function* getGuildsSaga() {
    yield takeEvery("GUILDS_FETCH", fetchGuilds);
}
