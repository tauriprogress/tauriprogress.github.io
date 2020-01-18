import { all } from "redux-saga/effects";
import getGuildsSaga from "./getGuildsSaga";
import getLastUpdateSaga from "./getLastUpdateSaga";
import getRaidSaga from "./getRaidSaga";
import getRaidBossSaga from "./getRaidBossSaga";
import getLogSaga from "./getLogSaga";
import getGuildSaga from "./getGuildSaga";
import getPlayerDataSaga from "./getPlayerDataSaga";
import getPlayerLatestKillsSaga from "./getPlayerLatestKillsSaga";
import getPlayerProgressionSaga from "./getPlayerProgressionSaga";
import getPlayerItemsSaga from "./getPlayerItemsSaga";

function* sagas() {
    yield all([
        getLastUpdateSaga(),
        getGuildsSaga(),
        getRaidSaga(),
        getRaidBossSaga(),
        getLogSaga(),
        getGuildSaga(),
        getPlayerDataSaga(),
        getPlayerLatestKillsSaga(),
        getPlayerProgressionSaga(),
        getPlayerItemsSaga()
    ]);
}

export default sagas;
