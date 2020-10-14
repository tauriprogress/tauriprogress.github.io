export function displayHealing(bosses) {
    for (let bossName in bosses) {
        if (bosses[bossName]["noSpec"].hps.hps) {
            return true;
        }
    }

    return false;
}

export function defaultDifficulty(raids, raidName) {
    for (const raid of raids) {
        if (raid.name === raidName) {
            return raid.difficulties[0];
        }
    }
    return 0;
}
