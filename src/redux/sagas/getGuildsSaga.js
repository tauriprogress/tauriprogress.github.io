import { put, call, takeEvery, select } from "redux-saga/effects";
import { guildsSetError, guildsLoad, guildsFill } from "../actions";

async function getData(serverUrl) {
    return await fetch(`${serverUrl}/getguildlist`).then(res => res.json());
}

function* fetchGuilds({ payload }) {
    try {
        const { requested, realmGroup, loading } = yield select(state => ({
            requested: !!state.guildList.data,
            realmGroup: state.guildList.realmGroup,
            loading: state.guildList.loading
        }));

        if ((requested && realmGroup === payload) || loading) {
            return;
        }
        yield put(guildsLoad());

        const serverUrl = yield select(state => state.environment.urls.server);

        const response = yield call(getData, serverUrl);
        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(
                guildsFill({ guilds: response.response, realmGroup: payload })
            );
        }
    } catch (err) {
        yield put(guildsSetError(err.message));
    }
}

export default function* getGuildsSaga() {
    yield takeEvery("GUILDS_FETCH", fetchGuilds);
}
