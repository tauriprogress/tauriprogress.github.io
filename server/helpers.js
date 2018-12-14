const tauriApi = require("./tauriApi");
const realms = require("../constants/realms");
const fs = require("fs");
const specs = require("../constants/specs");
const { id: totId } = require("../constants/Throne of Thunder.json");
const { id: sooId } = require("../constants/Siege of Orgrimmar.json");

function isTotKill(map_id, difficulty) {
    return map_id === totId && (difficulty === 5 || difficulty === 6);
}

function isSooKill(map_id, difficulty) {
    return map_id === sooId && (difficulty === 5 || difficulty === 6);
}

async function fetchLatestHeroicGuilds(realm, lastUpdated = 0) {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await tauriApi.getRaidLast(realm);
            if (!data.success) throw new Error(data.errorstring);

            let guilds = {};
            for (let kill of data.response.logs) {
                if (lastUpdated > kill.killtime) {
                    break;
                }
                if (
                    isTotKill(kill.map_id, kill.difficulty) ||
                    isSooKill(kill.map_id, kill.difficulty)
                ) {
                    if (kill.guildid) {
                        guilds[kill.guilddata.name] = realm;
                    }
                }
            }
            resolve(guilds);
        } catch (err) {
            reject(err);
        }
    });
}

async function fetchOrUpdateGuildData({
    realm,
    guildName,
    lastUpdated = 0,
    progression
}) {
    return new Promise(async (resolve, reject) => {
        try {
            let guildData = await tauriApi.getGuild(realm, guildName);
            if (!guildData.success) throw new Error(guildData.errorstring);
            let raidData = await tauriApi.getRaidGuild(realm, guildName);
            if (!raidData.success) throw new Error(raidData.errorstring);

            if (!progression) {
                progression = {
                    "Throne of Thunder": {},
                    "Siege of Orgrimmar": {},
                    lastKills: []
                };
            }

            for (let kill of raidData.response.logs) {
                if (lastUpdated < kill.killtime) {
                    progression.lastKills.push({
                        log_id: kill.log_id,
                        bossName: kill.encounter_data.encounter_name,
                        difficulty: kill.encounter_data.encounter_difficulty,
                        date: kill.killtime
                    });
                    if (isTotKill(kill.map_id, kill.difficulty)) {
                        if (
                            progression["Throne of Thunder"][
                                kill.encounter_data.encounter_name
                            ]
                        ) {
                            progression["Throne of Thunder"][
                                kill.encounter_data.encounter_name
                            ] = await updateBossKill(
                                realm,
                                kill,
                                progression["Throne of Thunder"][
                                    kill.encounter_data.encounter_name
                                ]
                            );
                        } else {
                            progression["Throne of Thunder"][
                                kill.encounter_data.encounter_name
                            ] = await createBossKill(realm, kill);
                        }
                    } else if (isSooKill(kill.map_id, kill.difficulty)) {
                        if (
                            progression["Siege of Orgrimmar"][
                                kill.encounter_data.encounter_name
                            ]
                        ) {
                            progression["Siege of Orgrimmar"][
                                kill.encounter_data.encounter_name
                            ] = await updateBossKill(
                                realm,
                                kill,
                                progression["Siege of Orgrimmar"][
                                    kill.encounter_data.encounter_name
                                ]
                            );
                        } else {
                            progression["Siege of Orgrimmar"][
                                kill.encounter_data.encounter_name
                            ] = await createBossKill(realm, kill);
                        }
                    }
                } else {
                    break;
                }
            }

            let newGuildData = {
                ...guildData.response,
                progression,
                lastUpdated: new Date().getTime() / 1000
            };

            resolve(newGuildData);
        } catch (err) {
            reject(err);
        }
    });
}

async function createBossKill(realm, kill) {
    return new Promise(async (resolve, reject) => {
        try {
            let bossKill = {
                firstKill: kill.killtime,
                kills: 1,
                fastestKill: kill.fight_time,
                dps: {},
                hps: {},
                lastUpdated: new Date().getTime() / 1000
            };

            let logs;

            do {
                logs = await tauriApi
                    .getRaidLog(realm, kill.log_id)
                    .catch(err => err);
            } while (!logs.success && logs.errorstring === "request timed out");
            if (!logs.success) throw new Error(logs.errorstring);

            let members = logs.response.members;

            for (let member of members) {
                if (member.dmg_done !== 0) {
                    bossKill.dps[member.name] = {
                        race: member.race,
                        spec: specs[member.spec],
                        difficulty: kill.difficulty,
                        ilvl: member.ilvl,
                        date: kill.killtime,
                        dps: member.dmg_done / (kill.fight_time / 1000)
                    };
                }

                if (member.heal_done + member.absorb_done !== 0) {
                    bossKill.hps[member.name] = {
                        race: member.race,
                        spec: specs[member.spec],
                        difficulty: kill.difficulty,
                        ilvl: member.ilvl,
                        date: kill.killtime,
                        hps:
                            (member.heal_done + member.absorb_done) /
                            (kill.fight_time / 1000)
                    };
                }
            }

            resolve(bossKill);
        } catch (err) {
            reject(err);
        }
    });
}

async function updateBossKill(realm, kill, prevBossKill) {
    return new Promise(async (resolve, reject) => {
        try {
            let newKill = {
                ...{ dps: {}, hps: {} },
                ...prevBossKill,
                firstKill:
                    kill.killtime > prevBossKill.firstKill
                        ? prevBossKill.firstKill
                        : kill.killtime,
                kills: prevBossKill.kills + 1,
                fastestKill:
                    kill.fight_time > prevBossKill.fastestKill
                        ? prevBossKill.fastestKill
                        : kill.fight_time
            };

            do {
                logs = await tauriApi
                    .getRaidLog(realm, kill.log_id)
                    .catch(err => err);
            } while (!logs.success && logs.errorstring === "request timed out");
            if (!logs.success) throw new Error(logs.errorstring);

            let members = logs.response.members;

            for (let member of members) {
                if (member.dmg_done !== 0) {
                    if (
                        !prevBossKill.dps[member.name] ||
                        prevBossKill.dps[member.name].dps <
                            member.dmg_done / (kill.fight_time / 1000)
                    ) {
                        newKill.dps[member.name] = {
                            race: member.race,
                            spec: specs[member.spec],
                            difficulty: kill.difficulty,
                            ilvl: member.ilvl,
                            date: kill.killtime,
                            dps: member.dmg_done / (kill.fight_time / 1000)
                        };
                    }
                }

                if (member.heal_done + member.absorb_done !== 0) {
                    if (
                        !prevBossKill.hps[member.name] ||
                        prevBossKill.hps[member.name].hps <
                            (member.heal_done + member.absorb_done) /
                                (kill.fight_time / 1000)
                    ) {
                        newKill.hps[member.name] = {
                            race: member.race,
                            spec: specs[member.spec],
                            difficulty: kill.difficulty,
                            ilvl: member.ilvl,
                            date: kill.killtime,
                            hps:
                                (member.heal_done + member.absorb_done) /
                                (kill.fight_time / 1000)
                        };
                    }
                }
            }

            newKill.lastUpdated = new Date().getTime() / 1000;

            resolve(newKill);
        } catch (err) {
            reject(err);
        }
    });
}
