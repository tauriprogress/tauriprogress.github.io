import { put, call, takeLatest } from "redux-saga/effects";
import { raidBossLoading, raidBossFill, raidBossSetError } from "../actions";
import { serverUrl } from "../../constants/urls";

async function getData(raidName, bossName) {
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

        const response = yield call(getData, raidName, bossName);

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
