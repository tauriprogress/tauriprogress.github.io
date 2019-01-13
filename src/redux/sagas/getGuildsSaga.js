import { put, call, takeEvery, select } from "redux-saga/effects";
import { guildsSetError, guildsLoad, guildsFill } from "../actions";
import { serverUrl } from "../../constants/urls";

async function getData() {
    return await fetch(`${serverUrl}/getguildlist`).then(res => res.json());
}

function* fetchGuilds() {
    try {
        const loading = yield select(state => state.guilds.loading);
        const loaded = yield select(state =>
            state.guilds.data ? true : false
        );

        if (loading || loaded) {
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
