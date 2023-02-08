import { put, call, takeEvery, select } from "redux-saga/effects";
import { getServerUrl } from "../sagas/helpers";

import {
    GUILD_FETCH,
    guildFill,
    guildSetLoading,
    guildSetError,
} from "./actions";
import {
    guildLoadingSelector,
    guildOldGuildNameSelector,
    guildOldRealmSelector,
    environmentRaidsSelector,
} from "../../redux/selectors";

async function getData(serverUrl, guildName, realm) {
    return await fetch(`${serverUrl}/getguild`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            guildName: guildName,
            realm: realm,
        }),
    }).then((res) => res.json());
}

function* fetchGuild({ payload }) {
    try {
        const { guildName, realm } = payload;

        const loading = yield select(guildLoadingSelector);
        const oldGuildName = yield select(guildOldGuildNameSelector);
        const oldRealm = yield select(guildOldRealmSelector);

        if (loading && guildName === oldGuildName && realm === oldRealm) {
            return;
        }

        yield put(
            guildSetLoading({
                guildName,
                realm,
            })
        );

        const serverUrl = yield getServerUrl();
        const response = yield call(getData, serverUrl, guildName, realm);

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            const raids = yield select((state) =>
                environmentRaidsSelector(state)
            );

            yield put(guildFill({ ...response.response, raids: raids }));
        }
    } catch (err) {
        yield put(guildSetError(err.message));
    }
}

export default function* getGuildSaga() {
    yield takeEvery(GUILD_FETCH, fetchGuild);
}
