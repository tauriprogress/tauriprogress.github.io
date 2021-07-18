import { put, call, select } from "redux-saga/effects";
import { guildsSetError, guildsLoad, guildsFill } from "../actions";
import { getServerUrl, takeLatestIfTrue } from "./helpers";

async function getData(serverUrl) {
    return await fetch(`${serverUrl}/getguildlist`).then(res => res.json());
}

function* fetchGuilds({ payload: requestedRealmGroup }) {
    try {
        yield put(guildsLoad(requestedRealmGroup));

        const serverUrl = yield getServerUrl();

        const response = yield call(getData, serverUrl);

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(
                guildsFill({
                    guilds: response.response
                })
            );
        }
    } catch (err) {
        yield put(guildsSetError(err.message));
    }
}

function* conditionToFetch() {
    const { requested, loading } = yield select(state => ({
        requested: !!state.guildList.data,
        loading: state.guildList.loading
    }));

    return !requested || !loading;
}

export default function* getGuildsSaga() {
    yield takeLatestIfTrue("GUILDS_FETCH", conditionToFetch, fetchGuilds);
}
