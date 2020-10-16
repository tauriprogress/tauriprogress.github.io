import { put, call, takeEvery, select } from "redux-saga/effects";
import {
    setCharacterProgressionLoading,
    fillCharacterProgression,
    setCharacterProgressionError
} from "../actions";

async function getData(
    serverUrl,
    characterName,
    realm,
    raidName,
    characterClass
) {
    return await fetch(`${serverUrl}/getcharacterperformance`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            characterName: characterName,
            raidName,
            realm,
            characterClass
        })
    }).then(res => res.json());
}

function* fetchCharacterProgression({ payload }) {
    try {
        const { characterName, realm, raidName, characterClass } = payload;

        const loading = yield select(
            state => state.character.progression.loading
        );

        if (loading) {
            return;
        }

        yield put(setCharacterProgressionLoading());

        const serverUrl = yield select(state => state.environment.urls.server);
        const response = yield call(
            getData,
            serverUrl,
            characterName,
            realm,
            raidName,
            characterClass
        );

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(fillCharacterProgression(response.response));
        }
    } catch (err) {
        yield put(setCharacterProgressionError(err.message));
    }
}

export default function* getCharacterProgressionSaga() {
    yield takeEvery("CHARACTER_PROGRESSION_FETCH", fetchCharacterProgression);
}
