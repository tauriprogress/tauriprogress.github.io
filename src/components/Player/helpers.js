export function displayHealing(bosses) {
    for (let bossName in bosses) {
        if (bosses[bossName]["noSpec"].hps.hps) {
            return true;
        }
    }

    return false;
}
