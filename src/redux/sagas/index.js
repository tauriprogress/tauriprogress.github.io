import { all } from "redux-saga/effects";
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
import getWeeklyGuildFullClearSaga from "../weekly/sagas/getWeeklyGuildFullClearSaga";
import getWeeklyChallengeSaga from "../weekly/sagas/getWeeklyChallengeSaga";

import historySaga from "../history/historySaga";

function* sagas() {
    yield all([
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
        getWeeklyGuildFullClearSaga(),
        getWeeklyChallengeSaga(),

        historySaga(),
    ]);
}

export default sagas;
