import { put, call, takeEvery, select } from "redux-saga/effects";
import {
    characterRecentKillsSetLoading,
    characterRecentKillsFill,
    characterRecentKillsSetError,
    CHARACTER_RECENTKILLS_FETCH,
} from "./actions";
import {
    characterRecentKillsCharacterSelector,
    characterRecentKillsLoadingSelector,
} from "./selectors";
import { getServerUrl } from "../sagas/helpers";

async function getData(serverUrl, characterName, realm) {
    return await fetch(`${serverUrl}/character/recentkills`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            characterName: characterName,
            realm: realm,
            limit: 50,
        }),
    }).then((res) => res.json());
}

function* fetchRecentKillsOfCharacter({ payload }) {
    try {
        const { name, realm } = payload;

        const loading = yield select(characterRecentKillsLoadingSelector);
        const { name: oldName, realm: oldRealm } = yield select(
            characterRecentKillsCharacterSelector
        );

        if (loading || (name === oldName && realm === oldRealm)) {
            return;
        }

        yield put(
            characterRecentKillsSetLoading({
                loading: true,
                name: name,
                realm: realm,
            })
        );

        const serverUrl = yield getServerUrl();
        const response = yield call(getData, serverUrl, name, realm);

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
    yield takeEvery([CHARACTER_RECENTKILLS_FETCH], fetchRecentKillsOfCharacter);
}
