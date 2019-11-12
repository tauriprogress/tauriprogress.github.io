import { difficulties, raidName } from "tauriprogress-constants/currentContent";

export function getBossesDefeated(progression) {
    let bossesDefeated = {};
    if (!progression || !progression[raidName]) {
        return 0;
    }
    for (let diff in difficulties) {
        for (let bossName in progression[raidName][diff]) {
            if (bossName === "total") continue;
            if (
                progression[raidName][diff][bossName]["noSpec"].dps.dps ||
                progression[raidName][diff][bossName]["noSpec"].hps.hps
            ) {
                if (!bossesDefeated[bossName]) bossesDefeated[bossName] = true;
            }
        }
    }

    return Object.keys(bossesDefeated).length;
}

export function displayHealing(bosses) {
    for (let bossName in bosses) {
        if (bosses[bossName]["noSpec"].hps.hps) {
            return true;
        }
    }

    return false;
}
