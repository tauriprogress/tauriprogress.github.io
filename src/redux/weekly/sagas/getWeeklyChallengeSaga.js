import { put, call } from "redux-saga/effects";
import { getServerUrl, takeLatestIfTrue } from "../../sagas/helpers";
import {
    WEEKLY_CHALLENGE_FETCH,
    weeklyChallengeFill,
    weeklyChallengeSetError,
    weeklyChallengeSetLoading,
} from "../actions";

async function getData(serverUrl) {
    return await fetch(`${serverUrl}/weekly/challenge`).then((res) =>
        res.json()
    );
}

function* fetchWeeklyChallenge() {
    try {
        yield put(weeklyChallengeSetLoading(true));

        const serverUrl = yield getServerUrl();

        const response = yield call(getData, serverUrl);

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(
                weeklyChallengeFill({
                    guilds: response.response,
                })
            );
        }
    } catch (err) {
        yield put(weeklyChallengeSetError(err.message));
    }
}

export default function* getWeeklyChallengeSaga() {
    yield takeLatestIfTrue(WEEKLY_CHALLENGE_FETCH, fetchWeeklyChallenge);
}
