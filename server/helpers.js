const tauriApi = require("./tauriApi");
const realms = require("../constants/realms");
const specs = require("../constants/specs");
const specToClass = require("../constants/specToClass");
const {
    raidName,
    totalBosses,
    raids
} = require("../constants/currentContent.json");

async function getRaidBossLogs(bossId, difficulty, lastUpdated = 0) {
    return new Promise(async (resolve, reject) => {
        try {
            let now = new Date().getTime() / 1000;
            let bossKills = [];
            let logs = [];
            let data;

            for (let key in realms) {
                do {
                    data = await tauriApi.getRaidRank(
                        realms[key],
                        bossId,
                        difficulty
                    );
                } while (
                    !data.success &&
                    data.errorstring === "request timed out"
                );
                if (!data.success) throw new Error(data.errorstring);

                bossKills = bossKills.concat(
                    data.response.logs.map(kill => ({
                        ...kill,
                        realm: realms[key]
                    }))
                );
            }

            for (let kill of bossKills) {
                if (lastUpdated < kill.killtime) {
                    let bossData;
                    do {
                        bossData = await tauriApi.getRaidLog(
                            kill.realm,
                            kill.log_id
                        );
                    } while (
                        !bossData.success &&
                        bossData.errorstring === "request timed out"
                    );
                    if (!bossData.success)
                        throw new Error(bossData.errorstring);

                    logs.push({ ...bossData.response, realm: kill.realm });
                }
            }

            resolve({
                lastUpdated: now,
                logs,
                difficulty
            });
        } catch (err) {
            reject(err);
        }
    });
}

function createGuildBossKill(kill) {
    return {
        raidName: kill.mapentry.name,
        bossName: kill.encounter_data.encounter_name,
        realm: kill.realm,
        guildName: kill.guilddata.name,
        firstKill: kill.killtime,
        kills: 1,
        fastestKill: kill.fight_time,
        dps: {},
        hps: {}
    };
}

function updateGuildBossKill(guild, kill) {
    return {
        ...guild,
        kills: guild.kills + 1,
        firstKill:
            kill.killtime > guild.firstKill ? guild.firstKill : kill.killtime,
        fastestKill:
            kill.fight_time > guild.fastestKill
                ? guild.fastestKill
                : kill.fight_time
    };
}

function getDps({ dmg_done }, { fight_time }) {
    return dmg_done / (fight_time / 1000);
}

function memberDps(member, kill, difficulty) {
    return {
        race: member.race,
        spec: specs[member.spec],
        class: specToClass[member.spec],
        difficulty: difficulty,
        ilvl: member.ilvl,
        date: kill.killtime,
        damage: member.dmg_done,
        dps: getDps(member, kill)
    };
}

function getHps({ heal_done, absorb_done }, { fight_time }) {
    return (heal_done + absorb_done) / (fight_time / 1000);
}

function memberHps(member, kill, difficulty) {
    return {
        race: member.race,
        spec: specs[member.spec],
        class: specToClass[member.spec],
        difficulty: difficulty,
        ilvl: member.ilvl,
        date: kill.killtime,
        healing: member.heal_done,
        absorb: member.absorb_done,
        hps: getHps(member, kill)
    };
}

function processRaidBossLogs({ lastUpdated, logs, difficulty }) {
    let raidBoss = {
        bossName: "",
        firstKills: [],
        fastestKills: [],
        dps: {},
        hps: {},
        killCount: 0,
        lastUpdated,
        difficulty
    };
    let guilds = {};
    if (logs[0]) raidBoss.bossName = logs[0].encounter_data.encounter_name;

    for (let log of logs) {
        // get thru all the kill logs
        raidBoss.killCount += 1;
        if (log.guildid) {
            // if the kill is done by a guild

            let guildId = log.guilddata.name + log.realm;
            if (!guilds[guildId]) {
                // if there is no guild data yet create it
                guilds[guildId] = createGuildBossKill(log);
            } else {
                guilds[guildId] = updateGuildBossKill(guilds[guildId], log);
            }

            for (let member of log.members) {
                // go thru members of the kill and update dps/hps values
                if (member.dmg_done !== 0) {
                    if (
                        !raidBoss.dps[member.name] ||
                        raidBoss.dps[member.name].dps < getDps(member, log)
                    ) {
                        raidBoss.dps[member.name] = memberDps(
                            member,
                            log,
                            difficulty
                        );
                    }

                    if (
                        !guilds[guildId].dps[member.name] ||
                        guilds[guildId].dps[member.name].dps <
                            getDps(member, log)
                    ) {
                        guilds[guildId].dps[member.name] = memberDps(
                            member,
                            log,
                            difficulty
                        );
                    }
                }

                if (member.heal_done + member.absorb_done !== 0) {
                    if (
                        !raidBoss.hps[member.name] ||
                        raidBoss.hps[member.name].hps < getHps(member, log)
                    ) {
                        raidBoss.hps[member.name] = memberHps(
                            member,
                            log,
                            difficulty
                        );
                    }

                    if (
                        !guilds[guildId].hps[member.name] ||
                        guilds[guildId].hps[member.name].hps <
                            getHps(member, log)
                    ) {
                        guilds[guildId].hps[member.name] = memberHps(
                            member,
                            log,
                            difficulty
                        );
                    }
                }
            }
        } else {
            // else not guild kill, go thru members, only updating dps/hps of raid boss kill
            for (let member of log.members) {
                if (member.dmg_done !== 0) {
                    if (
                        !raidBoss.dps[member.name] ||
                        raidBoss.dps[member.name].dps < getDps(member, log)
                    ) {
                        raidBoss.dps[member.name] = memberDps(
                            member,
                            log,
                            difficulty
                        );
                    }
                }

                if (member.heal_done + member.absorb_done !== 0) {
                    if (
                        !raidBoss.hps[member.name] ||
                        raidBoss.hps[member.name].hps < getHps(member, log)
                    ) {
                        raidBoss.hps[member.name] = memberHps(
                            member,
                            log,
                            difficulty
                        );
                    }
                }
            }
        }
    }

    raidBoss.firstKills = raidBoss.firstKills
        .concat(logs.sort((a, b) => a.killtime - b.killtime))
        .slice(0, 3);

    raidBoss.fastestKills = raidBoss.fastestKills
        .concat(logs.sort((a, b) => a.fight_time - b.fight_time))
        .slice(0, 50);

    return {
        raidBoss,
        guildBossKills: guilds
    };
}

async function createGuildData(realm, guildName) {
    let guild;

    do {
        guild = await tauriApi.getGuild(realm, guildName);
    } while (!guild.success && guild.errorstring === "request timed out");
    if (!guild.success) throw new Error(guild.errorstring);
    guild = guild.response;

    let kills;

    do {
        kills = await tauriApi.getRaidGuild(realm, guildName);
    } while (!kills.success && kills.errorstring === "request timed out");
    if (!kills.success) throw new Error(kills.errorstring);
    kills = kills.response.logs.slice(0, 50);

    let newGuild = {
        ...guild,
        progression: {
            latestKills: kills,
            currentBossesDefeated: 0,
            completed: false
        }
    };

    for (let raid of raids) {
        newGuild.progression[raid.raidName] = {};
    }

    return newGuild;
}

function mergeBossKillIntoGuildData(guildData, bossKill) {
    let bossOfGuild =
        guildData.progression[bossKill.raidName][bossKill.bossName];

    let newGuildData = JSON.parse(JSON.stringify(guildData));

    if (!bossOfGuild) {
        newGuildData.progression[bossKill.raidName][
            bossKill.bossName
        ] = bossKill;
    } else {
        let oldDpses =
            guildData.progression[bossKill.raidName][bossKill.bossName].dps;
        let oldHpses =
            guildData.progression[bossKill.raidName][bossKill.bossName].hps;

        for (let key in bossKill.dps) {
            let member = bossKill.dps[key];

            if (!oldDpses[key] || oldDpses[key].dps < member.dps) {
                newGuildData.progression[bossKill.raidName][
                    bossKill.bossName
                ].dps[key] = member;
            }
        }

        for (let key in bossKill.hps) {
            let member = bossKill.hps[key];
            if (!oldHpses[key] || oldHpses[key].hps < member.hps) {
                newGuildData.progression[bossKill.raidName][
                    bossKill.bossName
                ].hps[key] = member;
            }
        }

        newGuildData.progression[bossKill.raidName][bossKill.bossName] = {
            kills: bossOfGuild.kills + bossKill.kills,
            firstKill:
                bossOfGuild.firstKill < bossKill.firstKill
                    ? bossOfGuild.firstKill
                    : bossKill.firstKill,
            fastestKill:
                bossOfGuild.fastestKill < bossKill.fastestKill
                    ? bossOfGuild.fastestKill
                    : bossKill.fastestKill
        };
    }

    let currentBossesDefeated = 0;
    for (let key in newGuildData.progression[raidName]) {
        currentBossesDefeated++;
    }
    newGuildData.progression.currentBossesDefeated = currentBossesDefeated;
    if (currentBossesDefeated === totalBosses) {
        newGuildData.progression.completed = true;
    }

    return newGuildData;
}

module.exports = {
    getRaidBossLogs,
    processRaidBossLogs,
    createGuildData,
    mergeBossKillIntoGuildData
};
