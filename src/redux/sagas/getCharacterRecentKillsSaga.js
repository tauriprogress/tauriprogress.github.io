import { put, call, takeEvery, select } from "redux-saga/effects";
import {
    setCharacterRecentKillsLoading,
    fillCharacterRecentKills,
    setCharacterRecentKillsError
} from "../actions";
import { getServerUrl } from "./helpers";

async function getData(serverUrl, characterName, realm) {
    return await fetch(`${serverUrl}/characterrecentkills`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            characterName: characterName,
            realm: realm,
            limit: 50
        })
    }).then(res => res.json());
}

function* fetchRecentKillsOfCharacter({ payload }) {
    try {
        const { characterName, realm } = payload;

        const loading = yield select(
            state => state.character.recentKills.loading
        );

        if (loading) {
            return;
        }

        yield put(setCharacterRecentKillsLoading(true));

        const serverUrl = yield getServerUrl();
        const response = yield call(getData, serverUrl, characterName, realm);

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(fillCharacterRecentKills(response.response));
        }
    } catch (err) {
        yield put(setCharacterRecentKillsError(err.message));
    }
}

export default function* getCharacterRecentKillsSaga() {
    yield takeEvery("CHARACTER_DATA_FETCH", fetchRecentKillsOfCharacter);
}
