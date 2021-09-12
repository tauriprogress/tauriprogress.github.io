import { put, call, select } from "redux-saga/effects";
import { getDataSpecificationString } from "../../../helpers";
import { takeLatestIfTrue, getServerUrl } from "../../sagas/helpers";

import {
    raidBossRecentKillsSetLoading,
    raidBossRecentKillsFill,
    raidBossRecentKillsSetError
} from "../../actions";
import { raidBossRecentKillstDataSpecificationStringSelector } from "../../selectors";

import { RAIDBOSS_RECENTKILLS_FETCH } from "../actions";

async function getData(serverUrl, raidId, bossName, difficulty) {
    return await fetch(`${serverUrl}/getboss/recentKills`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            raidId: raidId,
            bossName: bossName,
            difficulty: difficulty
        })
    }).then(res => res.json());
}

function* fetchRaidBossRecentKills({ payload }) {
    try {
        yield put(raidBossRecentKillsSetLoading());

        const { raidId, bossName, difficulty } = payload;

        const dataSpecificationString = getDataSpecificationString({
            raidId,
            bossName,
            difficulty
        });

        const serverUrl = yield getServerUrl();
        const response = yield call(
            getData,
            serverUrl,
            raidId,
            bossName,
            difficulty
        );

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(
                raidBossRecentKillsFill({
                    recentKills: response.response.recentKills,
                    dataSpecificationString: dataSpecificationString
                })
            );
        }
    } catch (err) {
        yield put(raidBossRecentKillsSetError(err.message));
    }
}

function* conditionToFetch({ payload }) {
    const { raidId, bossName, difficulty } = payload;

    const dataSpecificationString = getDataSpecificationString({
        raidId,
        bossName,
        difficulty
    });
    const oldDataSpecificationString = yield select(
        raidBossRecentKillstDataSpecificationStringSelector
    );

    return dataSpecificationString !== oldDataSpecificationString;
}

export default function* getRaidBossRecentKillsSaga() {
    yield takeLatestIfTrue(
        RAIDBOSS_RECENTKILLS_FETCH,
        conditionToFetch,
        fetchRaidBossRecentKills
    );
}
