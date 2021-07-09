import { put, call, takeEvery, select } from "redux-saga/effects";
import { guildsSetError, guildsLoad, guildsFill } from "../actions";
import { getServerUrl } from "./helpers";

async function getData(serverUrl) {
    return await fetch(`${serverUrl}/getguildlist`).then(res => res.json());
}

function* fetchGuilds({ payload: requestedRealmGroup }) {
    try {
        const { requested, loadedRealmGroup, loading, loadingRealmGroup } =
            yield select(state => ({
                requested: !!state.guildList.data,
                loadedRealmGroup: state.guildList.loadedRealmGroup,
                loading: state.guildList.loading,
                loadingRealmGroup: state.guildList.loadingRealmGroup
            }));

        if (
            (requested && loadedRealmGroup === requestedRealmGroup) ||
            (loading && loadingRealmGroup === requestedRealmGroup)
        ) {
            return;
        }

        yield put(guildsLoad(requestedRealmGroup));

        const serverUrl = yield getServerUrl();

        const response = yield call(getData, serverUrl);

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            const currentLoadingRealmGroup = yield select(
                state => state.guildList.loadingRealmGroup
            );
            if (currentLoadingRealmGroup === requestedRealmGroup) {
                yield put(
                    guildsFill({
                        guilds: response.response,
                        requestedRealmGroup: requestedRealmGroup
                    })
                );
            }
        }
    } catch (err) {
        const { currentLoadingRealmGroup, currentLoadedRealmGroup } =
            yield select(state => ({
                currentLoadingRealmGroup: state.guildList.loadingRealmGroup,
                currentLoadedRealmGroup: state.guildList.loadedRealmGroup
            }));

        if (
            currentLoadingRealmGroup === requestedRealmGroup ||
            currentLoadedRealmGroup === requestedRealmGroup
        ) {
            yield put(guildsSetError(err.message));
        }
    }
}

export default function* getGuildsSaga() {
    yield takeEvery("GUILDS_FETCH", fetchGuilds);
}
