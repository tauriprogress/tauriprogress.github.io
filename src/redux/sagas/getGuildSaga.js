import { put, call, takeEvery, select } from "redux-saga/effects";
import { setGuildLoading, fillGuild, setGuildError } from "../actions";
import { getServerUrl } from "./helpers";

async function getData(serverUrl, guildName, realm) {
    return await fetch(`${serverUrl}/getguild`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            guildName: guildName,
            realm: realm
        })
    }).then(res => res.json());
}

function* fetchGuild({ payload }) {
    try {
        const { guildName, realm } = payload;

        const loading = yield select(state => state.guild.loading);
        const oldGuildName = yield select(state => state.guild.guildName);
        const oldRealm = yield select(state => state.guild.realm);

        if (loading && guildName === oldGuildName && realm === oldRealm) {
            return;
        }

        yield put(
            setGuildLoading({
                guildName,
                realm
            })
        );

        const serverUrl = yield getServerUrl();
        const response = yield call(getData, serverUrl, guildName, realm);

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            const raids = yield select(
                state => state.environment.currentContent.raids
            );

            yield put(fillGuild({ ...response.response, raids: raids }));
        }
    } catch (err) {
        yield put(setGuildError(err.message));
    }
}

export default function* getGuildSaga() {
    yield takeEvery("GUILD_FETCH", fetchGuild);
}
