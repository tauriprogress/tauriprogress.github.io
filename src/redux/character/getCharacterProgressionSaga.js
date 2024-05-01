import { put, call, takeEvery, select } from "redux-saga/effects";
import {
    characterProgressionSetLoading,
    characterProgressionFill,
    characterProgressionSetError,
    CHARACTER_PROGRESSION_FETCH,
} from "./actions";
import {
    characterNameSelector,
    characterRealmSelector,
    characterClassSelector,
    characterProgressionLoadingSelector,
    characterProgressionCharacterSelector,
} from "./selectors";
import { getServerUrl } from "../sagas/helpers";

async function getData(
    serverUrl,
    characterName,
    realm,
    raidName,
    characterClass
) {
    return await fetch(`${serverUrl}/character/characterperformance`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            characterName: characterName,
            raidName,
            realm,
            characterClass,
        }),
    }).then((res) => res.json());
}

function* fetchCharacterProgression({ payload: raidName }) {
    try {
        const { characterName, realm, characterClass, loading, character } =
            yield select((state) => {
                return {
                    characterName: characterNameSelector(state),
                    realm: characterRealmSelector(state),
                    characterClass: characterClassSelector(state),
                    loading: characterProgressionLoadingSelector(state),
                    character: characterProgressionCharacterSelector(state),
                };
            });

        if (
            !raidName ||
            loading ||
            !characterName ||
            !realm ||
            !characterClass ||
            (characterName.toLowerCase() === character.name &&
                realm === character.realm)
        ) {
            return;
        }

        yield put(characterProgressionSetLoading());

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
            yield put(
                characterProgressionFill({
                    data: response.response,
                    name: characterName,
                    realm: realm,
                })
            );
        }
    } catch (err) {
        yield put(characterProgressionSetError(err.message));
    }
}

export default function* getCharacterProgressionSaga() {
    yield takeEvery(CHARACTER_PROGRESSION_FETCH, fetchCharacterProgression);
}
