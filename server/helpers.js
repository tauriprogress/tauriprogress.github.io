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
            let bossLogs = [];
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

                bossLogs = bossLogs.concat(
                    data.response.logs.map(log => ({
                        ...log,
                        realm: realms[key]
                    }))
                );
            }

            for (let log of bossLogs) {
                if (lastUpdated < log.killtime) {
                    let bossData;
                    do {
                        bossData = await tauriApi.getRaidLog(
                            log.realm,
                            log.log_id
                        );
                    } while (
                        !bossData.success &&
                        bossData.errorstring === "request timed out"
                    );
                    if (!bossData.success)
                        throw new Error(bossData.errorstring);

                    logs.push({ ...bossData.response, realm: log.realm });
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
        killCount: 1,
        fastestKill: kill.fight_time,
        dps: {},
        hps: {}
    };
}

function updateGuildBossKill(guild, kill) {
    return {
        ...guild,
        killCount: guild.killCount + 1,
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

function memberDps(realm, member, kill, difficulty) {
    return {
        race: member.race,
        spec: specs[member.spec],
        class: specToClass[member.spec],
        realm: realm,
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

function memberHps(realm, member, kill, difficulty) {
    return {
        race: member.race,
        spec: specs[member.spec],
        class: specToClass[member.spec],
        realm: realm,
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

            let guildId = `${log.realm} ${log.guilddata.name}`;
            if (!guilds[guildId]) {
                // if there is no guild data yet create it
                guilds[guildId] = createGuildBossKill(log);
            } else {
                guilds[guildId] = updateGuildBossKill(guilds[guildId], log);
            }

            for (let member of log.members) {
                let memberId = `${log.realm} ${member.name}`;
                if (member.dmg_done !== 0) {
                    if (
                        !raidBoss.dps[memberId] ||
                        raidBoss.dps[memberId].dps < getDps(member, log)
                    ) {
                        raidBoss.dps[memberId] = memberDps(
                            log.realm,
                            member,
                            log,
                            difficulty
                        );
                    }

                    if (
                        !guilds[guildId].dps[memberId] ||
                        guilds[guildId].dps[memberId].dps < getDps(member, log)
                    ) {
                        guilds[guildId].dps[memberId] = memberDps(
                            log.realm,
                            member,
                            log,
                            difficulty
                        );
                    }
                }

                if (member.heal_done + member.absorb_done !== 0) {
                    if (
                        !raidBoss.hps[memberId] ||
                        raidBoss.hps[memberId].hps < getHps(member, log)
                    ) {
                        raidBoss.hps[memberId] = memberHps(
                            log.realm,
                            member,
                            log,
                            difficulty
                        );
                    }

                    if (
                        !guilds[guildId].hps[memberId] ||
                        guilds[guildId].hps[memberId].hps < getHps(member, log)
                    ) {
                        guilds[guildId].hps[memberId] = memberHps(
                            log.realm,
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
                let memberId = `${log.realm} ${member.name}`;
                if (member.dmg_done !== 0) {
                    if (
                        !raidBoss.dps[memberId] ||
                        raidBoss.dps[memberId].dps < getDps(member, log)
                    ) {
                        raidBoss.dps[memberId] = memberDps(
                            log.realm,
                            member,
                            log,
                            difficulty
                        );
                    }
                }

                if (member.heal_done + member.absorb_done !== 0) {
                    if (
                        !raidBoss.hps[memberId] ||
                        raidBoss.hps[memberId].hps < getHps(member, log)
                    ) {
                        raidBoss.hps[memberId] = memberHps(
                            log.realm,
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
            killCount: bossOfGuild.killCount + bossKill.killCount,
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

function updateRaidBoss(oldRaidBoss, newRaidBoss) {
    if (
        oldRaidBoss.bossName !== newRaidBoss.bossName ||
        oldRaidBoss.difficulty !== newRaidBoss.difficulty
    ) {
        throw new Error(
            `Updating boss data where bossName and difficulty is not the same is not allowed.`
        );
    }

    let updatedRaidBoss = {
        ...JSON.parse(JSON.stringify(oldRaidBoss)),
        firstKills: updatedRaidBoss.firstKills
            .concat(newRaidBoss.firstKill)
            .sort((a, b) => a.killtime - b.killtime)
            .slice(0, 3),
        fastestKills: updatedRaidBoss.fastestKills
            .concat(newRaidBoss.fastestKills)
            .sort((a, b) => a.fight_time - b.fight_time)
            .slice(0, 50),
        killCount: oldRaidBoss.killCount + newRaidBoss.killCount,
        lastUpdated: newRaidBoss.lastUpdated
    };

    for (let key in newRaidBoss.dps) {
        let member = newRaidBoss.dps[key];

        if (
            !updatedRaidBoss.dps[key] ||
            updatedRaidBoss.dps[key].dps < member.dps
        ) {
            updatedRaidBoss.dps[key] = member;
        }
    }

    for (let key in newRaidBoss.hps) {
        let member = newRaidBoss.hps[key];
        if (
            !updatedRaidBoss.hps[key] ||
            updatedRaidBoss.hps[key].hps < member.hps
        ) {
            updatedRaidBoss.hps[key] = member;
        }
    }

    return updatedRaidBoss;
}

module.exports = {
    getRaidBossLogs,
    processRaidBossLogs,
    createGuildData,
    mergeBossKillIntoGuildData,
    updateRaidBoss
};
