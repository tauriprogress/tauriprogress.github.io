import { put, call, takeLatest } from "redux-saga/effects";
import { getServerUrl } from "../sagas/helpers";
import {
    WEEKLY_CHALLENGE_VOTE_FETCH,
    weeklyChallengeVoteSet,
    weeklyChallengeVoteSetError,
    weeklyChallengeVoteSetLoading,
} from "./actions";

async function getData(serverUrl) {
    return await fetch(`${serverUrl}/weekly/challenge/votes`, {
        method: "get",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
}

function* getVotes() {
    try {
        yield put(weeklyChallengeVoteSetLoading(true));

        const serverUrl = yield getServerUrl();
        const response = yield call(getData, serverUrl);

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
