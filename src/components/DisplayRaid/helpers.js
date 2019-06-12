import { realms, characterClasses, classToSpec } from "tauriprogress-constants";

const factionIds = [0, 1];
let realmNames = [];
for (let realmId in realms) {
    realmNames.push(realms[realmId]);
}
let classIds = [];
for (let classId in characterClasses) {
    classIds.push(classId);
}

export function convertFightTime(time) {
    let mins = Math.floor(time / 1000 / 60);
    let remainingSecs = Math.floor(time / 1000) - mins * 60;

    if (remainingSecs < 10) {
        remainingSecs = "0" + remainingSecs;
    }
    return `${mins}:${remainingSecs}`;
}

export function getSpecImg(imageName) {
    return require(`../../assets/specs/${imageName}.png`);
}

export function applyFilter(data, raidData, filter) {
    if (!data || !raidData || !filter) return data;
    let newData = { ...JSON.parse(JSON.stringify(data)) };

    let realms = filter.realm !== "" ? [filter.realm] : realmNames;
    let factions = filter.faction !== "" ? [filter.faction] : factionIds;
    let classes = filter.class !== "" ? [filter.class] : classIds;

    for (let encounter of raidData.encounters) {
        let bossName = encounter.encounter_name;
        let fastestKill = {
            fight_time: Number.MAX_VALUE
        };
        let bestDps = {
            dps: 0
        };
        let bestHps = {
            hps: 0
        };
        for (let realm of realms) {
            for (let faction of factions) {
                let currentFastKill = getNestedObjectValue(
                    data[bossName].fastestKills,
                    [realm, faction]
                )[0];
                if (
                    currentFastKill &&
                    currentFastKill.fight_time < fastestKill.fight_time
                ) {
                    fastestKill = currentFastKill;
                }

                for (let classId of classes) {
                    let specs =
                        filter.spec !== ""
                            ? [filter.spec]
                            : classToSpec[classId];

                    for (let spec of specs) {
                        let keys = [realm, faction, classId, spec];

                        let dps = getNestedObjectValue(
                            data[bossName].bestDps,
                            keys
                        );
                        if (dps && dps.dps > bestDps.dps) {
                            bestDps = dps;
                        }

                        let hps = getNestedObjectValue(
                            data[bossName].bestHps,
                            keys
                        );
                        if (hps && hps.hps > bestHps.hps) {
                            bestHps = hps;
                        }
                    }
                }
            }
        }

        newData[bossName].fastestKills = fastestKill;
        newData[bossName].bestDps = bestDps;
        newData[bossName].bestHps = bestHps;
    }
    return newData;
}

function getNestedObjectValue(obj, keys) {
    let currentKey = keys[0];

    if (keys.length === 1) {
        return obj.hasOwnProperty(currentKey) ? obj[currentKey] : false;
    } else {
        return obj.hasOwnProperty(currentKey)
            ? getNestedObjectValue(obj[currentKey], keys.slice(1, keys.length))
            : false;
    }
}
