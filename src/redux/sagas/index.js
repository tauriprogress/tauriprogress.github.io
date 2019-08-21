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
        getPlayerProgressionSaga()
    ]);
}

export default sagas;
