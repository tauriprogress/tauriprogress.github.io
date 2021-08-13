import { all } from "redux-saga/effects";
import getLastUpdatedSaga from "../siteInfo/getLastUpdatedSaga";
import getCharacterLeaderboardSaga from "../characterLeaderboard/getCharacterLeaderboardSaga";
import getCharacterDataSaga from "../character/getCharacterDataSaga";
import getCharacterRecentKillsSaga from "../character/getCharacterRecentKillsSaga";
import getCharacterProgressionSaga from "../character/getCharacterProgressionSaga";
import getCharacterItemsSaga from "../character/getCharacterItemsSaga";
import getLogSaga from "../log/getLogSaga";
import getGuildLeaderboardSaga from "../guildLeaderboard/getGuildLeaderboardSaga";
import getGuildListSaga from "../guildList/getGuildListSaga";

import getRaidSummarySaga from "./getRaidSummarySaga";
import getRaidBossKillCountSaga from "./raidBossSagas/getRaidBossKillCountSaga";
import getRaidBossRecentKillsSaga from "./raidBossSagas/getRaidBossRecentKillsSaga";
import getRaidBossFastestKillsSaga from "./raidBossSagas/getRaidBossFastestKillsSaga";
import getRaidBossCharactersSaga from "./raidBossSagas/getRaidBossCharactersSaga";

import getGuildSaga from "./getGuildSaga";
import environmentSaga from "./environmentSaga";
import historySaga from "./historySaga";

function* sagas() {
    yield all([
        historySaga(),
        getLastUpdatedSaga(),
        getCharacterLeaderboardSaga(),
        getCharacterDataSaga(),
        getCharacterRecentKillsSaga(),
        getCharacterProgressionSaga(),
        getCharacterItemsSaga(),
        getLogSaga(),
        getGuildLeaderboardSaga(),
        getGuildListSaga(),

        getRaidSummarySaga(),
        getRaidBossKillCountSaga(),
        getRaidBossRecentKillsSaga(),
        getRaidBossFastestKillsSaga(),
        getRaidBossCharactersSaga(),
        getGuildSaga(),
        environmentSaga()
    ]);
}

export default sagas;
