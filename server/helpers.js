const tauriApi = require("./tauriApi");
const fs = require("fs");
const realms = require("../constants/realms");
const specs = require("../constants/specs");
const specToClass = require("../constants/specToClass");
const {
    raidName,
    lastBoss,
    raids
} = require("../constants/currentContent.json");

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

                for (let raid of raids) {
                    if (
                        raid["id"] === kill.map_id &&
                        raid["difficulties"][kill.difficulty] &&
                        kill.guildid
                    ) {
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
            let updateStarted = new Date().getTime() / 1000;

            let guildData = await tauriApi.getGuild(realm, guildName);
            if (!guildData.success) throw new Error(guildData.errorstring);
            let raidData = await tauriApi.getRaidGuild(realm, guildName);
            if (!raidData.success) throw new Error(raidData.errorstring);

            if (!progression) {
                progression = {
                    lastKills: [],
                    bossesDefeated: 0
                };

                for (let raid of raids) {
                    progression[raid.raidName] = {};
                }
            }

            for (let kill of raidData.response.logs) {
                if (lastUpdated < kill.killtime) {
                    progression.lastKills.push({
                        log_id: kill.log_id,
                        bossName: kill.encounter_data.encounter_name,
                        difficulty: kill.encounter_data.encounter_difficulty,
                        date: kill.killtime
                    });

                    for (let raid of raids) {
                        if (
                            raid["id"] === kill.map_id &&
                            raid["difficulties"][kill.difficulty]
                        ) {
                            if (
                                progression[raid.raidName][
                                    kill.encounter_data.encounter_name
                                ]
                            ) {
                                progression[raid.raidName][
                                    kill.encounter_data.encounter_name
                                ] = await updateBossKill(
                                    realm,
                                    kill,
                                    progression[raid.raidName][
                                        kill.encounter_data.encounter_name
                                    ]
                                );
                            } else {
                                progression[raid.raidName][
                                    kill.encounter_data.encounter_name
                                ] = await createBossKill(realm, kill);
                            }
                        }
                    }
                } else {
                    break;
                }
            }

            let currentBossesDefeated = 0;

            for (let boss in progression[raidName]) {
                currentBossesDefeated++;
            }

            progression.currentBossesDefeated = currentBossesDefeated;
            progression.completed = progression[raidName][lastBoss]
                ? progression[raidName][lastBoss].firstKill
                : false;

            let newGuildData = {
                ...guildData.response,
                progression,
                lastUpdated: updateStarted
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
                hps: {}
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
                        class: specToClass[member.spec],
                        difficulty: kill.difficulty,
                        ilvl: member.ilvl,
                        date: kill.killtime,
                        damage: member.dmg_done,
                        dps: member.dmg_done / (kill.fight_time / 1000)
                    };
                }

                if (member.heal_done + member.absorb_done !== 0) {
                    bossKill.hps[member.name] = {
                        race: member.race,
                        spec: specs[member.spec],
                        class: specToClass[member.spec],
                        difficulty: kill.difficulty,
                        ilvl: member.ilvl,
                        date: kill.killtime,
                        healing: member.heal_done,
                        absorb: member.absorb_done,
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
                            class: specToClass[member.spec],
                            difficulty: kill.difficulty,
                            ilvl: member.ilvl,
                            date: kill.killtime,
                            damage: member.dmg_done,
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
                            class: specToClass[member.spec],
                            difficulty: kill.difficulty,
                            ilvl: member.ilvl,
                            date: kill.killtime,
                            healing: member.heal_done,
                            absorb: member.absorb_done,
                            hps:
                                (member.heal_done + member.absorb_done) /
                                (kill.fight_time / 1000)
                        };
                    }
                }
            }

            resolve(newKill);
        } catch (err) {
            reject(err);
        }
    });
}

async function fetchOrUpdateRaidBoss(raidBoss) {
    return new Promise(async (resolve, reject) => {
        try {
            let fastestKills = [];
            let now = new Date().getTime() / 1000;
            if (!raidBoss.firstKills) raidBoss.firstKills = [];
            if (!raidBoss.dps) raidBoss.dps = {};
            if (!raidBoss.hps) raidBoss.hps = {};
            if (!raidBoss.kills) raidBoss.kills = 0;
            if (!raidBoss.firstKill) raidBoss.firstKill = now;

            for (let key in realms) {
                let data;
                do {
                    data = await tauriApi.getRaidRank(
                        realms[key],
                        raidBoss.bossId,
                        raidBoss.difficulty
                    );
                } while (
                    !data.success &&
                    data.errorstring === "request timed out"
                );
                if (!data.success) throw new Error(data.errorstring);

                let logs = data.response.logs;
                fastestKills = fastestKills.concat(logs);

                for (let kill of logs) {
                    if (raidBoss.firstKill > kill.killtime) {
                        raidBoss.firstKills.push({
                            guildName: kill.guildid
                                ? kill.guilddata.name
                                : "Random",
                            date: kill.killtime
                        });
                    }

                    if (raidBoss.lastUpdated < kill.killtime) {
                        raidBoss = await updateBossKill(
                            realms[key],
                            kill,
                            raidBoss
                        );
                    }
                }
            }

            resolve({
                ...raidBoss,
                lastUpdated: now,
                firstKills: raidBoss.firstKills
                    .sort((a, b) => a.date - b.date)
                    .slice(0, 3),
                fastestKills: fastestKills
                    .sort((a, b) => a.fight_time - b.fight_time)
                    .slice(0, 50)
            });
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = {
    fetchLatestHeroicGuilds,
    fetchOrUpdateGuildData,
    fetchOrUpdateRaidBoss
};
