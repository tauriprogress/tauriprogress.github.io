import { put, call, takeEvery, select } from "redux-saga/effects";
import {
    characterRecentKillsSetLoading,
    characterRecentKillsFill,
    characterRecentKillsSetError,
    CHARACTER_DATA_FETCH,
    CHARACTER_RECENTKILLS_FETCH
} from "./actions";
import { characterRecentKillsLoadingSelector } from "./selectors";
import { getServerUrl } from "../sagas/helpers";

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

        const loading = yield select(characterRecentKillsLoadingSelector);

        if (loading) {
            return;
        }

        yield put(characterRecentKillsSetLoading(true));

        const serverUrl = yield getServerUrl();
        const response = yield call(getData, serverUrl, characterName, realm);

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(characterRecentKillsFill(response.response));
        }
    } catch (err) {
        yield put(characterRecentKillsSetError(err.message));
    }
}

export default function* getCharacterRecentKillsSaga() {
    yield takeEvery(
        [CHARACTER_DATA_FETCH, CHARACTER_RECENTKILLS_FETCH],
        fetchRecentKillsOfCharacter
    );
}
