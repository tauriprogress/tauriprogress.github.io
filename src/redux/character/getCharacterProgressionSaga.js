import { put, call, takeEvery, select } from "redux-saga/effects";
import {
    characterProgressionSetLoading,
    characterProgressionFill,
    characterProgressionSetError,
    CHARACTER_PROGRESSION_FETCH
} from "./actions";
import {
    characterNameSelector,
    characterRealmSelector,
    characterClassSelector,
    characterProgressionRaidDataExistsSelector,
    characterProgressionLoadingSelector
} from "./selectors";
import { getServerUrl } from "../sagas/helpers";

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
        const {
            characterName,
            realm,
            characterClass,
            raidDataExists,
            loading
        } = yield select(state => {
            return {
                characterName: characterNameSelector(state),
                realm: characterRealmSelector(state),
                characterClass: characterClassSelector(state),
                raidDataExists: characterProgressionRaidDataExistsSelector(
                    state,
                    raidName
                ),
                loading: characterProgressionLoadingSelector(state)
            };
        });

        if (
            !raidName ||
            loading ||
            raidDataExists ||
            !characterName ||
            !realm ||
            !characterClass
        )
            return;

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
            yield put(characterProgressionFill(response.response));
        }
    } catch (err) {
        yield put(characterProgressionSetError(err.message));
    }
}

export default function* getCharacterProgressionSaga() {
    yield takeEvery(CHARACTER_PROGRESSION_FETCH, fetchCharacterProgression);
}
