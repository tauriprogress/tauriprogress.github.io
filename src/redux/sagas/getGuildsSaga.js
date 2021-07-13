import { put, call, select, fork, take, cancel } from "redux-saga/effects";
import { guildsSetError, guildsLoad, guildsFill } from "../actions";
import { getServerUrl } from "./helpers";

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

export default function* getGuildsSaga() {
    yield fork(function* () {
        let lastGuildListRequest;

        while (true) {
            const action = yield take("GUILDS_FETCH");

            const { requested, loading } = yield select(state => ({
                requested: !!state.guildList.data,
                loading: state.guildList.loading
            }));

            if (requested || loading) {
                continue;
            }

            if (lastGuildListRequest) {
                yield cancel(lastGuildListRequest);
            }

            lastGuildListRequest = yield fork(fetchGuilds, action);
        }
    });
}
