import { raidName } from "tauriprogress-constants/currentContent";

export function getBossesDefeated(raidBosses, progression) {
    let defeatedBosses = {};

    for (let diff in progression[raidName]) {
        for (let raidBoss of raidBosses) {
            if (!defeatedBosses[raidBoss.encounter_name]) {
                defeatedBosses[raidBoss.encounter_name] = progression[raidName][
                    diff
                ][raidBoss.encounter_name]
                    ? true
                    : false;
            }
        }
    }

    return defeatedBosses;
}
