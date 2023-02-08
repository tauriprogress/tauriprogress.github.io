import { put, call, select } from "redux-saga/effects";
import { raidBossKillCountFill } from "../../actions";
import {
    getDataSpecificationString,
    getIngameBossIdFromBossName,
} from "../../../helpers";
import { takeLatestIfTrue, getServerUrl } from "../../sagas/helpers";
import { RAIDBOSS_KILLCOUNT_FETCH } from "../actions";
import { raidBossKillCountDataSpecificationStringSelector } from "../selectors";
import { getCurrentRealmGroupName } from "../../history/helpers";

async function getData(serverUrl, ingameBossId, difficulty) {
    return await fetch(`${serverUrl}/getboss/killCount`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ingameBossId: ingameBossId,
            difficulty: difficulty,
        }),
    }).then((res) => res.json());
}

function* fetchRaidBossKillCount({ payload }) {
    try {
        const { raidId, bossName, difficulty } = payload;
        const realmGroupName = getCurrentRealmGroupName();
        const ingameBossId = getIngameBossIdFromBossName(
            bossName,
            difficulty,
            realmGroupName
        );
        if (!ingameBossId) throw new Error("Invalid boss name.");

        const dataSpecificationString = getDataSpecificationString({
            raidId,
            bossName,
            difficulty,
        });

        const serverUrl = yield getServerUrl();
        const response = yield call(
            getData,
            serverUrl,
            ingameBossId,
            difficulty
        );

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(
                raidBossKillCountFill({
                    killCount: response.response.killCount,
                    dataSpecificationString: dataSpecificationString,
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
        difficulty,
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
