import {
    raidName,
    totalBosses,
    lastBoss
} from "../../constants/currentContent";

export function sortByProgression(guilds) {
    return guilds.sort((a, b) => {
        if (
            a.progression.currentBossesDefeated === totalBosses &&
            b.progression.currentBossesDefeated === totalBosses
        ) {
            return (
                b.progression[raidName][lastBoss].firstKill -
                a.progression[raidName][lastBoss].firstKill
            );
        } else {
            return (
                b.progression.currentBossesDefeated -
                a.progression.currentBossesDefeated
            );
        }
    });
}
