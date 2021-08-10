import { all } from "redux-saga/effects";
import getGuildsSaga from "./getGuildsSaga";
import getLastUpdatedSaga from "../siteInfo/getLastUpdatedSaga";
import getRaidSummarySaga from "./getRaidSummarySaga";
import getRaidBossKillCountSaga from "./raidBossSagas/getRaidBossKillCountSaga";
import getRaidBossRecentKillsSaga from "./raidBossSagas/getRaidBossRecentKillsSaga";
import getRaidBossFastestKillsSaga from "./raidBossSagas/getRaidBossFastestKillsSaga";
import getRaidBossCharactersSaga from "./raidBossSagas/getRaidBossCharactersSaga";

import getLogSaga from "./getLogSaga";
import getGuildSaga from "./getGuildSaga";
import getCharacterDataSaga from "./getCharacterDataSaga";
import getCharacterRecentKillsSaga from "./getCharacterRecentKillsSaga";
import getCharacterProgressionSaga from "./getCharacterProgressionSaga";
import getCharacterItemsSaga from "./getCharacterItemsSaga";
import getCharacterLeaderboardSaga from "./getCharacterLeaderboardSaga";
import getGuildLeaderboardSaga from "./getGuildLeaderboardSaga";
import environmentSaga from "./environmentSaga";
import historySaga from "./historySaga";

function* sagas() {
    yield all([
        historySaga(),
        getLastUpdatedSaga(),
        getGuildsSaga(),
        getRaidSummarySaga(),
        getRaidBossKillCountSaga(),
        getRaidBossRecentKillsSaga(),
        getRaidBossFastestKillsSaga(),
        getRaidBossCharactersSaga(),
        getLogSaga(),
        getGuildSaga(),
        getCharacterDataSaga(),
        getCharacterRecentKillsSaga(),
        getCharacterProgressionSaga(),
        getCharacterItemsSaga(),
        getCharacterLeaderboardSaga(),
        getGuildLeaderboardSaga(),
        environmentSaga()
    ]);
}

export default sagas;
