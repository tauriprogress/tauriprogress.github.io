import { put, call, select } from "redux-saga/effects";
import { raidBossKillCountFill } from "../../actions";
import { getDataSpecificationString } from "../../../helpers";
import { takeLatestIfTrue, getServerUrl } from "../../sagas/helpers";
import { RAIDBOSS_KILLCOUNT_FETCH } from "../actions";
import { raidBossKillCountDataSpecificationStringSelector } from "../selectors";

async function getData(serverUrl, raidId, bossName, difficulty) {
    return await fetch(`${serverUrl}/getboss/killCount`, {
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

function* fetchRaidBossKillCount({ payload }) {
    try {
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
                raidBossKillCountFill({
                    killCount: response.response.killCount,
                    dataSpecificationString: dataSpecificationString
                })
            );
        }
    } catch (err) {
        return;
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
        raidBossKillCountDataSpecificationStringSelector
    );

    return dataSpecificationString !== oldDataSpecificationString;
}

export default function* getRaidBossKillCountSaga() {
    yield takeLatestIfTrue(
        RAIDBOSS_KILLCOUNT_FETCH,
        conditionToFetch,
        fetchRaidBossKillCount
    );
}
