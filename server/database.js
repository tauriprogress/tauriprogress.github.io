const dbUser = process.env.MONGODB_USER;
const dbPassword = process.env.MONGODB_PASSWORD;
const mongoUrl = `mongodb://${dbUser}:${dbPassword}@ds125368.mlab.com:25368/tauriguilds`;
const MongoClient = require("mongodb").MongoClient;

const realms = require("../constants/realms.json");
const {
    raidName,
    lastBoss,
    raids
} = require("../constants/currentContent.json");
const {
    getRaidBossLogs,
    processRaidBossLogs,
    mergeBossKillIntoGuildData,
    createGuildData,
    updateRaidBoss
} = require("./helpers");

class Database {
    constructor() {
        this.db = {};
        this.isUpdating = false;
    }

    async connect() {
        try {
            console.log("Connecting to database");
            let client = await MongoClient.connect(
                mongoUrl,
                { useNewUrlParser: true }
            );
            this.db = client.db("tauriguilds");
        } catch (err) {
            throw err;
        }
    }

    async disconnect() {
        return new Promise(async (resolve, reject) => {
            try {
                if (!this.db)
                    throw new Error(
                        "Tried to disconnect from db while not connected."
                    );

                this.db.close();
            } catch (err) {
                reject(err);
            }
        });
    }

    async initalizeDatabase() {
        return new Promise(async (resolve, reject) => {
            try {
                this.isUpdating = true;
                console.log("Initalizing database");
                const updateStarted = new Date().getTime() / 1000;

                console.log("db: Creating maintence collection");
                let maintence = await this.db.collection("maintence");
                if (await maintence.findOne()) await maintence.deleteMany({});

                console.log("db: Creating raids");
                let raidCollection;
                let guilds = {};
                for (let raid of raids) {
                    console.log(`db: Creating ${raid.raidName} collection`);
                    raidCollection = await this.db.collection(raid.raidName);
                    if (await raidCollection.findOne())
                        await raidCollection.deleteMany({});

                    let raidData = require(`../constants/${raid.raidName}`);

                    for (let boss of raidData.encounters) {
                        for (let diff in raid.difficulties) {
                            console.log(
                                "db: Processing " +
                                    boss.encounter_name +
                                    " diff: " +
                                    diff
                            );
                            let logs = await getRaidBossLogs(
                                boss.encounter_id,
                                diff,
                                0
                            );
                            let processedLogs = processRaidBossLogs(logs);

                            if (processedLogs.raidBoss.killCount !== 0) {
                                await this.saveRaidBoss({
                                    raidName: raid.raidName,
                                    raidBoss: processedLogs.raidBoss
                                });
                            }

                            for (let key in processedLogs.guildBossKills) {
                                if (!guilds[key]) {
                                    let guild = await createGuildData(
                                        processedLogs.guildBossKills[key].realm,
                                        processedLogs.guildBossKills[key]
                                            .guildName
                                    );

                                    guilds[key] = mergeBossKillIntoGuildData(
                                        guild,
                                        processedLogs.guildBossKills[key]
                                    );
                                } else {
                                    guilds[key] = mergeBossKillIntoGuildData(
                                        guilds[key],
                                        processedLogs.guildBossKills[key]
                                    );
                                }
                            }
                        }
                    }
                }
                console.log("db: pushing guilds in");
                let guildsCollection = await this.db.collection("guilds");
                if (await guildsCollection.findOne())
                    await guildsCollection.deleteMany({});

                for (let key in guilds) {
                    await this.saveGuild(guilds[key]);
                }

                console.log("db: initalization done.");
                maintence.insertOne({
                    lastUpdated: updateStarted,
                    initalized: true
                });
                this.isUpdating = false;
                resolve("Done");
            } catch (err) {
                this.isUpdating = false;
                reject(err);
            }
        });
    }

    async isInitalized() {
        return new Promise(async (resolve, reject) => {
            try {
                let maintence = await this.db.collection("maintence").findOne();
                if (!maintence) resolve(false);
                resolve(maintence.initalized);
            } catch (err) {
                reject(err);
            }
        });
    }

    async updateDatabase() {
        return new Promise(async (resolve, reject) => {
            try {
                this.isUpdating = true;
                let updateStarted = new Date().getTime() / 1000;
                let maintence = await this.db.collection("maintence");
                let lastUpdated = (await maintence.findOne()).lastUpdated;

                for (let raid of raids) {
                    let raidData = require(`../constants/${raid.raidName}`);

                    for (let boss of raidData.encounters) {
                        for (let diff in raid.difficulties) {
                            console.log(
                                "db: Updating " +
                                    boss.encounter_name +
                                    " diff: " +
                                    diff
                            );
                            let logs = await getRaidBossLogs(
                                boss.encounter_id,
                                diff,
                                lastUpdated
                            );
                            let processedLogs = processRaidBossLogs(logs);

                            if (processedLogs.raidBoss.killCount !== 0) {
                                await this.saveRaidBoss({
                                    raidName: raid.raidName,
                                    raidBoss: processedLogs.raidBoss
                                });
                            }

                            for (let key in processedLogs.guildBossKills) {
                                let guild;
                                console.log(`Saving ${key}`);
                                try {
                                    guild = await this.getGuild(
                                        processedLogs.guildBossKills[key].realm,
                                        processedLogs.guildBossKills[key]
                                            .guildName
                                    );
                                } catch (err) {
                                    if (err.message === "Guild not found") {
                                        guild = await createGuildData(
                                            processedLogs.guildBossKills[key]
                                                .realm,
                                            processedLogs.guildBossKills[key]
                                                .guildName
                                        );
                                    }
                                }
                                if (guild)
                                    await this.saveGuild(
                                        mergeBossKillIntoGuildData(
                                            guild,
                                            processedLogs.guildBossKills[key]
                                        )
                                    );
                            }
                        }
                    }
                }

                await maintence.updateOne(
                    {},
                    {
                        $set: {
                            lastUpdated: updateStarted
                        }
                    }
                );

                this.isUpdating = false;

                resolve("Done");
            } catch (err) {
                this.isUpdating = false;
                reject(err);
            }
        });
    }

    async getGuilds() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(
                    this.db
                        .collection("guilds")
                        .find()
                        .toArray()
                );
            } catch (err) {
                reject(err);
            }
        });
    }

    async getGuildList() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(
                    await this.db
                        .collection("guilds")
                        .find()
                        .project({
                            guildName: 1,
                            gFaction: 1,
                            realm: 1,
                            lastUpdated: 1,
                            ["progression.currentBossesDefeated"]: 1,
                            ["progression.completed"]: 1,
                            ["progression." +
                            raidName +
                            "." +
                            lastBoss +
                            ".firstKill"]: 1
                        })
                        .toArray()
                );
            } catch (err) {
                reject(err);
            }
        });
    }

    async getGuild(realm, guildName) {
        return new Promise(async (resolve, reject) => {
            try {
                let guild = await this.db.collection("guilds").findOne({
                    guildName: new RegExp("^" + guildName + "$", "i"),
                    realm: realm
                });

                if (!guild) throw new Error("Guild not found");

                resolve(guild);
            } catch (err) {
                reject(err);
            }
        });
    }

    async getRaidBoss(raidName, bossName, difficulty) {
        return new Promise(async (resolve, reject) => {
            try {
                let raidCollection = this.db.collection(raidName);
                let raidBoss = await raidCollection.findOne({
                    bossName: new RegExp("^" + bossName + "$", "i"),
                    difficulty: new RegExp("^" + difficulty + "$", "i")
                });
                if (!raidBoss) throw new Error("Boss not found");
                resolve(raidBoss);
            } catch (err) {
                reject(err);
            }
        });
    }

    async getPlayerDps({
        realm,
        playerName,
        raidName,
        bossName = null,
        difficulty = null
    }) {
        return new Promise(async (resolve, reject) => {
            try {
                const raid = require(`../constants/${raidName}`);
                if (bossName) raid.encounters = [{ encounter_name: bossName }];
                if (difficulty) raid.difficulties = [difficulty];

                let dps = {
                    [raidName]: {}
                };
                let raidCollection = await this.db.collection(raidName);

                for (let boss of raid.encounters) {
                    for (let diff of raid.difficulties) {
                        if (!dps[raidName][boss.encounter_name])
                            dps[raidName][boss.encounter_name] = {};

                        dps[raidName][boss.encounter_name][
                            diff
                        ] = (await raidCollection
                            .find({
                                bossName: new RegExp(
                                    "^" + boss.encounter_name + "$",
                                    "i"
                                ),
                                difficulty: new RegExp("^" + diff + "$", "i")
                            })
                            .project({
                                [`dps.${realm} ${playerName}`]: 1
                            })
                            .toArray())[0];
                    }
                }

                resolve(dps);
            } catch (err) {
                reject(err);
            }
        });
    }

    async saveGuild(guild) {
        return new Promise(async (resolve, reject) => {
            try {
                let oldGuild = await this.db.collection("guilds").findOne({
                    guildName: new RegExp("^" + guild.guildName + "$", "i"),
                    realm: guild.realm
                });

                if (!oldGuild) {
                    await this.db.collection("guilds").insertOne(guild);
                } else {
                    await this.db.collection("guilds").updateOne(
                        {
                            guildName: new RegExp("^" + guildName + "$", "i"),
                            realm: guild.realm
                        },
                        { $set: guild }
                    );
                }
                resolve("Done");
            } catch (err) {
                reject(err);
            }
        });
    }

    async saveRaidBoss({ raidName, raidBoss }) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!raidName)
                    throw new Error(
                        "Need to specify which raid the boss belongs to."
                    );
                let raidCollection = this.db.collection(raidName);
                let oldRaidBoss = await raidCollection.findOne({
                    bossName: new RegExp("^" + raidBoss.bossName + "$", "i"),
                    difficulty: new RegExp("^" + raidBoss.difficulty + "$", "i")
                });

                if (!oldRaidBoss) {
                    raidCollection.insertOne(raidBoss);
                } else {
                    await raidCollection.updateOne(
                        {
                            bossName: new RegExp(
                                "^" + raidBoss.bossName + "$",
                                "i"
                            ),
                            difficulty: raidBoss.difficulty
                        },
                        { $set: updateRaidBoss(oldRaidBoss, raidBoss) }
                    );
                }

                resolve("Done");
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = new Database();
