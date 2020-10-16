import { put, call, takeEvery, select } from "redux-saga/effects";
import {
    setCharacterDataLoading,
    fillCharacterData,
    setCharacterDataError
} from "../actions";

async function getData(serverUrl, characterName, realm) {
    return await fetch(`${serverUrl}/getcharacter`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            characterName: characterName,
            realm: realm
        })
    }).then(res => res.json());
}

function* fetchCharacter({ payload }) {
    try {
        const { characterName, realm } = payload;

        const loading = yield select(state => state.character.data.loading);

        if (loading) {
            return;
        }

        yield put(
            setCharacterDataLoading({
                characterName,
                realm
            })
        );

        const serverUrl = yield select(state => state.environment.urls.server);
        const response = yield call(getData, serverUrl, characterName, realm);

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(fillCharacterData(response.response));
        }
    } catch (err) {
        yield put(setCharacterDataError(err.message));
    }
}

export default function* getCharacterDataSaga() {
    yield takeEvery("CHARACTER_DATA_FETCH", fetchCharacter);
}
