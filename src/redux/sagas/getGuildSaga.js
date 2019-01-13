import { put, call, takeEvery, select } from "redux-saga/effects";
import { guildSetLoading, guildFill, guildSetError } from "../actions";
import { serverUrl } from "../../constants/urls";

async function getData(guildName, realm) {
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
            guildSetLoading({
                guildName,
                realm
            })
        );

        const response = yield call(getData, guildName, realm);

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(guildFill(response.response));
        }
    } catch (err) {
        yield put(guildSetError(err.message));
    }
}

export default function* getGuildSaga() {
    yield takeEvery("GUILD_FETCH", fetchGuild);
}
