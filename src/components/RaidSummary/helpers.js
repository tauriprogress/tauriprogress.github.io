import { capitalize } from "../../helpers";

export function applyFilter(bossData, filter, specs) {
    let boss = JSON.parse(JSON.stringify(bossData[filter.difficulty]));

    for (const property of ["firstKills", "fastestKills"]) {
        let data = [];
        for (const realmName in boss[property]) {
            if (filter.realm !== "" && filter.realm !== realmName) continue;

            for (const faction in boss[property][realmName]) {
                if (filter.faction !== "" && filter.faction !== Number(faction))
                    continue;

                data = data.concat(boss[property][realmName][faction]);
            }
        }

        boss[property] = data
            .sort((a, b) => {
                if (property === "firstKills") {
                    return a.date - b.date;
                } else {
                    return a.fightLength - b.fightLength;
                }
            })
            .slice(0, 3);
    }

    for (const combatMetric of ["dps", "hps"]) {
        const property = `best${capitalize(combatMetric)}`;

        let data = [];
        for (const realmName in boss[property]) {
            if (filter.realm !== "" && filter.realm !== realmName) continue;

            for (const faction in boss[property][realmName]) {
                if (filter.faction !== "" && filter.faction !== Number(faction))
                    continue;

                for (const classId in boss[property][realmName][faction]) {
                    if (filter.class !== "" && filter.class !== classId)
                        continue;

                    for (const specId in boss[property][realmName][faction][
                        classId
                    ]) {
                        if (filter.spec !== "" && filter.spec !== specId)
                            continue;

                        let characters =
                            boss[property][realmName][faction][classId][specId];
                        if (filter.role) {
                            data = data.concat(
                                characters.filter(
                                    char =>
                                        specs[char.spec].role === filter.role
                                )
                            );
                        } else {
                            data = data.concat(characters);
                        }
                    }
                }
            }
        }

        boss[property] = data
            .sort((a, b) => {
                return b[combatMetric] - a[combatMetric];
            })
            .slice(0, 10);
    }

    return boss;
}
