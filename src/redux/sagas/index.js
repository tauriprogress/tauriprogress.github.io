import { all } from "redux-saga/effects";
import getLastUpdatedSaga from "../siteInfo/getLastUpdatedSaga";
import getCharacterLeaderboardSaga from "../characterLeaderboard/getCharacterLeaderboardSaga";
import getCharacterDataSaga from "../character/getCharacterDataSaga";
import getCharacterRecentKillsSaga from "../character/getCharacterRecentKillsSaga";
import getCharacterProgressionSaga from "../character/getCharacterProgressionSaga";
import getCharacterItemsSaga from "../character/getCharacterItemsSaga";
import getLogSaga from "../log/getLogSaga";
import getLogLootSaga from "../log/getLogLootSaga";
import getGuildLeaderboardSaga from "../guildLeaderboard/getGuildLeaderboardSaga";
import getGuildListSaga from "../guildList/getGuildListSaga";
import getGuildSaga from "../guild/getGuildSaga";
import getRaidSummarySaga from "../raidSummary/getRaidSummarySaga";
import getRaidBossKillCountSaga from "../raidBoss/sagas/getRaidBossKillCountSaga";
import getRaidBossRecentKillsSaga from "../raidBoss/sagas/getRaidBossRecentKillsSaga";
import getRaidBossFastestKillsSaga from "../raidBoss/sagas/getRaidBossFastestKillsSaga";
import getRaidBossCharactersSaga from "../raidBoss/sagas/getRaidBossCharactersSaga";
import environmentSaga from "../environment/environmentSaga";

import historySaga from "./historySaga";

function* sagas() {
    yield all([
        getLastUpdatedSaga(),
        getCharacterLeaderboardSaga(),
        getCharacterDataSaga(),
        getCharacterRecentKillsSaga(),
        getCharacterProgressionSaga(),
        getCharacterItemsSaga(),
        getLogSaga(),
        getLogLootSaga(),
        getGuildLeaderboardSaga(),
        getGuildListSaga(),
        getGuildSaga(),
        getRaidSummarySaga(),
        getRaidBossKillCountSaga(),
        getRaidBossRecentKillsSaga(),
        getRaidBossFastestKillsSaga(),
        getRaidBossCharactersSaga(),
        environmentSaga(),

        historySaga(),
    ]);
}

export default sagas;
