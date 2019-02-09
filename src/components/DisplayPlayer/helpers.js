import { difficulties, raidName } from "tauriprogress-constants/currentContent";
import { specs } from "tauriprogress-constants";

export function talentTreeToImage(fullSpecName) {
    const regexp = new RegExp(fullSpecName, "ig");
    for (let specKey in specs) {
        if (regexp.exec(specs[specKey].label)) {
            const imageName = `${specs[specKey].image}.png`;
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
                progression[raidName][diff][bossName].dps.dps ||
                progression[raidName][diff][bossName].hps.hps
            ) {
                if (!bossesDefeated[bossName]) bossesDefeated[bossName] = true;
            }
        }
    }

    return Object.keys(bossesDefeated).length;
}
