import { put, call, takeLatest } from "redux-saga/effects";
import { getServerUrl } from "../sagas/helpers";
import {
    WEEKLY_CHALLENGE_VOTE_FOR_BOSS,
    weeklyChallengeVoteSet,
    weeklyChallengeVoteSetError,
    weeklyChallengeVoteSetLoading,
} from "./actions";

async function getData(serverUrl, bossName) {
    return await fetch(`${serverUrl}/vote`, {
        method: "post",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            bossName: bossName,
        }),
    }).then((res) => res.json());
}

function* voteForBoss({ payload }) {
    try {
        yield put(weeklyChallengeVoteSetLoading(true));
        const serverUrl = yield getServerUrl();
        const response = yield call(getData, serverUrl, payload);

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
    yield takeLatest(WEEKLY_CHALLENGE_VOTE_FOR_BOSS, voteForBoss);
}
