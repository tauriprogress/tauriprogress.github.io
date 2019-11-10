import { serverUrl } from "tauriprogress-constants/urls";
import { put, call, takeEvery, select } from "redux-saga/effects";
import { guildsSetError, guildsLoad, guildsFill } from "../actions";

async function getData() {
    return await fetch(`${serverUrl}/getguildlist`).then(res => res.json());
}

function* fetchGuilds() {
    try {
        const requested = yield select(state => !!state.guilds.data);

        if (requested) {
            return;
        }

        yield put(guildsLoad());

        const response = yield call(getData);

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
