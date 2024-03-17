import { put, call, takeLatest, select } from "redux-saga/effects";
import { getServerUrl } from "../sagas/helpers";
import {
    WEEKLY_CHALLENGE_VOTE_FETCH,
    weeklyChallengeVoteSet,
    weeklyChallengeVoteSetError,
    weeklyChallengeVoteSetLoading,
} from "./actions";
import { userSelector } from "../selectors";

async function getData(serverUrl, userToken) {
    return await fetch(`${serverUrl}/weekly/challenge/votes`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user: userToken,
        }),
    }).then((res) => res.json());
}

function* getVotes() {
    try {
        yield put(weeklyChallengeVoteSetLoading(true));

        const serverUrl = yield getServerUrl();

        const userToken = yield select(userSelector);
        const response = yield call(getData, serverUrl, userToken);

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(weeklyChallengeVoteSet(response.response));
        }
    } catch (err) {
        yield put(weeklyChallengeVoteSetError(err.message));
    }
}

export default function* voteSaga() {
    yield takeLatest(WEEKLY_CHALLENGE_VOTE_FETCH, getVotes);
}
