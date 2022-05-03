import { getNestedObjectValue } from "../../helpers";

export function filterMembers(members, filter) {
    if (!members) return [];
    let regex = new RegExp(filter.name, "i");

    return members.filter((member) => {
        if (filter.name !== "" && !regex.test(member.name)) {
            return false;
        }

        if (filter.class !== "" && member.class !== Number(filter.class)) {
            return false;
        }

        if (filter.rankName !== "" && member.rankName !== filter.rankName) {
            return false;
        }

        return true;
    });
}

export function getBossesDefeated(raidName, raidBosses, progression) {
    let defeatedBosses = {};

    for (let diff in progression.raids[raidName]) {
        for (let raidBoss of raidBosses) {
            if (!defeatedBosses[raidBoss.name]) {
                defeatedBosses[raidBoss.name] = progression.raids[raidName][
                    diff
                ][raidBoss.name]
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
            bossName,
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
