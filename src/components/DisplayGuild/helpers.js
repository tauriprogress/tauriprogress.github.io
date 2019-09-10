import { getNestedObjectValue } from "../../helpers";

export function getBossesDefeated(raidName, raidBosses, progression) {
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

export function selectDefaultDifficulty(progression, raidName, bossName) {
    let defaultDifficulty = 5;
    let killCount = 0;
    for (let difficulty in progression[raidName]) {
        let boss = getNestedObjectValue(progression[raidName], [
            difficulty,
            bossName
        ]);
        if (boss) {
            if (killCount < boss.killCount) {
                killCount = boss.killCount;
                defaultDifficulty = Number(difficulty);
            }
        }
    }
    return defaultDifficulty;
}
