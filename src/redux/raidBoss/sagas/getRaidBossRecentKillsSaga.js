import { put, call, select } from "redux-saga/effects";
import {
    getDataSpecificationString,
    getIngameBossIdFromBossName,
} from "../../../helpers";
import { takeLatestIfTrue, getServerUrl } from "../../sagas/helpers";

import {
    raidBossRecentKillsSetLoading,
    raidBossRecentKillsFill,
    raidBossRecentKillsSetError,
} from "../../actions";
import {
    raidBossRecentKillstDataSpecificationStringSelector,
    environmentRealmGroupSelector,
} from "../../selectors";

import { RAIDBOSS_RECENTKILLS_FETCH } from "../actions";
import { getCurrentRealmGroupName } from "../../history/helpers";

async function getData(serverUrl, ingameBossId, difficulty) {
    return await fetch(`${serverUrl}/getboss/latestKills`, {
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

function* fetchRaidBossRecentKills({ payload }) {
    try {
        yield put(raidBossRecentKillsSetLoading());

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
                raidBossRecentKillsFill({
                    recentKills: response.response.recentKills,
                    dataSpecificationString: dataSpecificationString,
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
        difficulty,
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
