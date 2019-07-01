import { difficulties, raidName } from "tauriprogress-constants/currentContent";
import { specs } from "tauriprogress-constants";

export function talentTreeToImage(fullSpecName) {
    const regexp = new RegExp(fullSpecName, "ig");
    for (let specKey in specs) {
        if (regexp.exec(specs[specKey].label)) {
            const imageName = `${specs[specKey].image}.jpg`;
            return require(`../../assets/specs/${imageName}`);
        }
    }

    return false;
}

export function getBossesDefeated(progression) {
    let bossesDefeated = {};
    for (let diff in difficulties) {
        for (let bossName in progression[raidName][diff]) {
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
