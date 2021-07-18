import { put, call, select } from "redux-saga/effects";
import { fillRaidBossKillCount } from "../../actions";
import { getServerUrl } from "../helpers";
import { getDataSpecificationString } from "../../../helpers";
import { takeLatestIfTrue } from "../helpers";

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
                fillRaidBossKillCount({
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
        state => state.raidBoss.killCount.dataSpecificationString
    );

    return dataSpecificationString !== oldDataSpecificationString;
}

export default function* getRaidBossKillCountSaga() {
    yield takeLatestIfTrue(
        "RAIDBOSS_KILLCOUNT_FETCH",
        conditionToFetch,
        fetchRaidBossKillCount
    );
}
