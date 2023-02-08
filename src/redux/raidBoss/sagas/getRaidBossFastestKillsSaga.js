import { put, call, select } from "redux-saga/effects";
import {
    getDataSpecificationString,
    getIngameBossIdFromBossName,
} from "../../../helpers";
import { takeLatestIfTrue, getServerUrl } from "../../sagas/helpers";

import {
    RAIDBOSS_FASTESTKILLS_FETCH,
    raidBossFastestKillsSetLoading,
    raidBossFastestKillsFill,
    raidBossFastestKillsSetError,
} from "../../actions";

import {
    raidBossFastestKillsDataSpecificationStringSelector,
    environmentRealmGroupSelector,
} from "../../selectors";
import { getCurrentRealmGroupName } from "../../history/helpers";

async function getData(serverUrl, ingameBossId, difficulty) {
    return await fetch(`${serverUrl}/getboss/fastestKills`, {
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

function* fetchRaidBossFastestKills({ payload }) {
    try {
        yield put(raidBossFastestKillsSetLoading());

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
                raidBossFastestKillsFill({
                    fastestKills: response.response.fastestKills,
                    dataSpecificationString: dataSpecificationString,
                })
            );
        }
    } catch (err) {
        yield put(raidBossFastestKillsSetError(err.message));
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
        raidBossFastestKillsDataSpecificationStringSelector
    );

    return dataSpecificationString !== oldDataSpecificationString;
}

export default function* getRaidBossFastestKillsSaga() {
    yield takeLatestIfTrue(
        RAIDBOSS_FASTESTKILLS_FETCH,
        conditionToFetch,
        fetchRaidBossFastestKills
    );
}
