import { serverUrl } from "tauriprogress-constants/urls";
import { put, call, takeLatest } from "redux-saga/effects";
import {
    raidBossUpdateLoading,
    raidBossUpdateDone,
    raidBossUpdateSetError,
    raidBossFetch
} from "../actions";

async function getData(raidName, bossName) {
    return await fetch(`${serverUrl}/updateRaidBoss`, {
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

function* updateRaidBoss({ payload }) {
    try {
        const { raidName, bossName } = payload;

        yield put(raidBossUpdateLoading());

        const response = yield call(getData, raidName, bossName);

        if (!response.success) {
            throw new UpdateRaidBossError(
                response.lastUpdated,
                response.errorstring
            );
        } else {
            yield put(raidBossUpdateDone());
            yield put(
                raidBossFetch({
                    raidName,
                    bossName
                })
            );
        }
    } catch (err) {
        if (err.lastUpdated && err.lastUpdated < 301) {
            yield put(
                raidBossUpdateSetError({
                    wait: 300 - err.lastUpdated
                })
            );
        } else {
            yield put(
                raidBossUpdateSetError({
                    err: err.message
                })
            );
        }
    }
}

export default function* updateRaidBossSaga() {
    yield takeLatest("RAID_BOSS_UPDATE_START", updateRaidBoss);
}

class UpdateRaidBossError extends Error {
    constructor(lastUpdated, ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UpdateRaidBossError);
        }

        this.lastUpdated = lastUpdated;
    }
}
