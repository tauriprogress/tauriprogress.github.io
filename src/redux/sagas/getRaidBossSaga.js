import { put, call, takeLatest, select } from "redux-saga/effects";
import { setRaidBossLoading, fillRaidBoss, setRaidBossError } from "../actions";
import { getServerUrl } from "./helpers";

async function getData(serverUrl, raidId, bossName) {
    return await fetch(`${serverUrl}/getboss`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            raidId: raidId,
            bossName: bossName
        })
    }).then(res => res.json());
}

function* fetchRaidBoss({ payload }) {
    try {
        const { raidId, bossName } = payload;

        const oldBossName = yield select(state => state.raidBoss.bossName);
        if (oldBossName === bossName) return;

        yield put(setRaidBossLoading({ raidId, bossName }));

        const serverUrl = yield getServerUrl();
        const response = yield call(getData, serverUrl, raidId, bossName);

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(fillRaidBoss(response.response));
        }
    } catch (err) {
        yield put(setRaidBossError(err.message));
    }
}

export default function* getRaidSaga() {
    yield takeLatest("RAIDBOSS_FETCH", fetchRaidBoss);
}
