import { put, call, takeLatest, select } from "redux-saga/effects";
import {
    raidBossLoading,
    raidBossFill,
    raidBossSetError,
    raidChangeRaidData,
    raidSelectBoss
} from "../actions";

async function getData(serverUrl, raidName, bossName) {
    return await fetch(`${serverUrl}/getboss`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            raidName: raidName,
            bossName: bossName
        })
    }).then(res => res.json());
}

function* fetchRaidBoss({ payload }) {
    try {
        const { raidName, bossName } = payload;

        yield put(raidBossLoading({ raidName, bossName }));
        yield put(raidChangeRaidData(raidName));

        const raidData = yield select(state => state.raidInfo.raid.raidData);

        let selected = raidData
            ? raidData.encounters.reduce((acc, curr, index) => {
                  if (curr.encounter_name === bossName) acc = index + 1;
                  return acc;
              }, null)
            : null;

        yield put(raidSelectBoss(selected));

        const serverUrl = yield select(state => state.environment.serverUrl);
        const response = yield call(getData, serverUrl, raidName, bossName);

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(raidBossFill(response.response));
        }
    } catch (err) {
        yield put(raidBossSetError(err.message));
    }
}

export default function* getRaidSaga() {
    yield takeLatest("RAID_BOSS_FETCH", fetchRaidBoss);
}
