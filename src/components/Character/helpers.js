export function displayHealing(bosses) {
    for (let bossName in bosses) {
        if (bosses[bossName]["noSpec"].hps.hps) {
            return true;
        }
    }

    return false;
}

export function getDifficulties(raids, raidName) {
    for (const raid of raids) {
        if (raid.name === raidName) {
            return raid.difficulties;
        }
    }
    return 0;
}
