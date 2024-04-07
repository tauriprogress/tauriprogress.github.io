import { put, call, takeEvery, select } from "redux-saga/effects";
import {
    characterDataSetLoading,
    characterDataFill,
    characterDataSetError,
    CHARACTER_DATA_FETCH,
} from "./actions";
import { characterDataLoadingSelector } from "./selectors";
import { getServerUrl } from "../sagas/helpers";

async function getData(serverUrl, name, realm) {
    return await fetch(`${serverUrl}/character`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            characterName: name,
            realm: realm,
        }),
    }).then((res) => res.json());
}

function* fetchCharacter({ payload }) {
    try {
        const { name, realm } = payload;

        const loading = yield select(characterDataLoadingSelector);

        if (loading) {
            return;
        }

        yield put(
            characterDataSetLoading({
                name,
                realm,
            })
        );

        const serverUrl = yield getServerUrl();
        const response = yield call(getData, serverUrl, name, realm);

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(characterDataFill(response.response));
        }
    } catch (err) {
        yield put(characterDataSetError(err.message));
    }
}

export default function* getCharacterDataSaga() {
    yield takeEvery(CHARACTER_DATA_FETCH, fetchCharacter);
}
