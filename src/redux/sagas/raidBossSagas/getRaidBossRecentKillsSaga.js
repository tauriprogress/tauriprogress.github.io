import { put, call, select } from "redux-saga/effects";
import { getServerUrl } from "../helpers";
import { getDataSpecificationString } from "../../../helpers";
import { takeLatestIfTrue } from "../helpers";

import {
    fillRaidBossRecentKills,
    setRaidBossRecentKillsLoading,
    setRaidBossRecentKillsError
} from "../../actions";

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
        yield put(setRaidBossRecentKillsLoading());

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
                fillRaidBossRecentKills({
                    recentKills: response.response.recentKills,
                    dataSpecificationString: dataSpecificationString
                })
            );
        }
    } catch (err) {
        yield put(setRaidBossRecentKillsError(err.message));
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
        state => state.raidBoss.recentKills.dataSpecificationString
    );

    return dataSpecificationString !== oldDataSpecificationString;
}

export default function* getRaidBossRecentKillsSaga() {
    yield takeLatestIfTrue(
        "RAIDBOSS_RECENTKILLS_FETCH",
        conditionToFetch,
        fetchRaidBossRecentKills
    );
}
