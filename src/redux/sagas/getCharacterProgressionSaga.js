import { put, call, takeEvery, select } from "redux-saga/effects";
import {
    setCharacterProgressionLoading,
    fillCharacterProgression,
    setCharacterProgressionError
} from "../actions";
import { getServerUrl } from "./helpers";

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

function* fetchCharacterProgression({ payload: raidName }) {
    try {
        const { characterName, realm, characterClass, raidDataExists } =
            yield select(state => {
                return {
                    characterName:
                        state.character.data.data &&
                        state.character.data.data.name,
                    realm:
                        state.character.data.data &&
                        state.character.data.data.realm,
                    characterClass:
                        state.character.data.data &&
                        state.character.data.data.class,
                    raidDataExists:
                        state.character.progression.data &&
                        state.character.progression.data[raidName] &&
                        true
                };
            });

        const loading = yield select(
            state => state.character.progression.loading
        );

        if (
            !raidName ||
            !characterName ||
            !realm ||
            !characterClass ||
            loading ||
            raidDataExists
        )
            return;

        yield put(setCharacterProgressionLoading());

        const serverUrl = yield getServerUrl();
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
