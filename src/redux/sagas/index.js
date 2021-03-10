import { all } from "redux-saga/effects";
import getGuildsSaga from "./getGuildsSaga";
import getLastUpdateSaga from "./getLastUpdateSaga";
import getRaidSummarySaga from "./getRaidSummarySaga";
import getRaidBossSaga from "./getRaidBossSaga";
import getLogSaga from "./getLogSaga";
import getGuildSaga from "./getGuildSaga";
import getCharacterDataSaga from "./getCharacterDataSaga";
import getCharacterRecentKillsSaga from "./getCharacterRecentKillsSaga";
import getCharacterProgressionSaga from "./getCharacterProgressionSaga";
import getCharacterItemsSaga from "./getCharacterItemsSaga";
import getCharacterLeaderboardData from "./getCharacterLeaderboardData";

function* sagas() {
    yield all([
        getLastUpdateSaga(),
        getGuildsSaga(),
        getRaidSummarySaga(),
        getRaidBossSaga(),
        getLogSaga(),
        getGuildSaga(),
        getCharacterDataSaga(),
        getCharacterRecentKillsSaga(),
        getCharacterProgressionSaga(),
        getCharacterItemsSaga(),
        getCharacterLeaderboardData()
    ]);
}

export default sagas;
