import { put, call, select } from "redux-saga/effects";
import { getServerUrl } from "../helpers";
import { getDataSpecificationString } from "../../../helpers";
import { takeLatestIfTrue } from "../helpers";

import {
    fillRaidBossFastestKills,
    setRaidBossFastestKillsLoading,
    setRaidBossFastestKillsError
} from "../../actions";

async function getData(serverUrl, raidId, bossName, difficulty) {
    return await fetch(`${serverUrl}/getboss/fastestKills`, {
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

function* fetchRaidBossFastestKills({ payload }) {
    try {
        yield put(setRaidBossFastestKillsLoading());

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
                fillRaidBossFastestKills({
                    fastestKills: response.response.fastestKills,
                    dataSpecificationString: dataSpecificationString
                })
            );
        }
    } catch (err) {
        yield put(setRaidBossFastestKillsError(err.message));
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
        state => state.raidBoss.fastestKills.dataSpecificationString
    );

    return dataSpecificationString !== oldDataSpecificationString;
}

export default function* getRaidBossFastestKillsSaga() {
    yield takeLatestIfTrue(
        "RAIDBOSS_FASTESTKILLS_FETCH",
        conditionToFetch,
        fetchRaidBossFastestKills
    );
}
