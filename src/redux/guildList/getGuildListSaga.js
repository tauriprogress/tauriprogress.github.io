import { put, call, select } from "redux-saga/effects";
import { getServerUrl, takeLatestIfTrue } from "../sagas/helpers";
import {
    GUILD_LIST_FETCH,
    guildListSetLoading,
    guildListFill,
    guildListSetError,
} from "./actions";
import {
    guildListDataExistsSelector,
    guildListLoadingSelector,
} from "./selectors";

async function getData(serverUrl) {
    return await fetch(`${serverUrl}/guild/guildlist`).then((res) =>
        res.json()
    );
}

function* fetchGuildList({ payload: requestedRealmGroup }) {
    try {
        yield put(guildListSetLoading(requestedRealmGroup));

        const serverUrl = yield getServerUrl();

        const response = yield call(getData, serverUrl);

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(
                guildListFill({
                    guilds: response.response,
                })
            );
        }
    } catch (err) {
        yield put(guildListSetError(err.message));
    }
}

function* conditionToFetch() {
    const { requested, loading } = yield select((state) => ({
        requested: guildListDataExistsSelector(state),
        loading: guildListLoadingSelector(state),
    }));

    return !requested && !loading;
}

export default function* getGuildListSaga() {
    yield takeLatestIfTrue(GUILD_LIST_FETCH, conditionToFetch, fetchGuildList);
}
