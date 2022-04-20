import { CHARACTER_LEADERBOARD_DATA_FETCH } from "./actions";
import { put, call, takeEvery } from "redux-saga/effects";
import {
    characterLeaderboardSetLoading,
    characterLeaderboardSetError,
    characterLeaderboardFill,
} from "./actions";
import { getServerUrl } from "../sagas/helpers";

import { cleanFilters } from "../../helpers";

async function getData(serverUrl, { combatMetric, filters, page, pageSize }) {
    return await fetch(`${serverUrl}/leaderboard/character`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            combatMetric: combatMetric,
            raidName: filters.raid,
            page: page,
            pageSize: pageSize,
            filters: cleanFilters(filters),
        }),
    }).then((res) => res.json());
}

function* fetchCharacterLeaderboard({ payload }) {
    try {
        yield put(characterLeaderboardSetLoading());

        const serverUrl = yield getServerUrl();
        const response = yield call(getData, serverUrl, payload);

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(characterLeaderboardFill(response.response));
        }
    } catch (err) {
        yield put(characterLeaderboardSetError(err.message));
    }
}

export default function* getLeaderboardDataSaga() {
    yield takeEvery(
        CHARACTER_LEADERBOARD_DATA_FETCH,
        fetchCharacterLeaderboard
    );
}
