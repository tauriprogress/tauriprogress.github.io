const dbUser = process.env.MONGODB_USER;
const dbPassword = process.env.MONGODB_PASSWORD;
const mongoUrl = `mongodb://${dbUser}:${dbPassword}@ds129315.mlab.com:29315/tauriprogress`;
const MongoClient = require("mongodb").MongoClient;
const {
    raidName,
    lastBoss,
    raids
} = require("../src/constants/currentContent.json");
const {
    getRaidBossLogs,
    processRaidBossLogs,
    mergeBossKillIntoGuildData,
    createGuildData,
    updateRaidBoss,
    applyPlayerPerformanceRanks
} = require("./helpers");

class Database {
    constructor() {
        this.db = {};
        this.isUpdating = false;
        this.updateStatus = "";
    }

    async connect() {
        try {
            console.log("Connecting to database");
            let client = await MongoClient.connect(
                mongoUrl,
                { useNewUrlParser: true }
            );
            this.db = client.db("tauriprogress");
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

                    let raidData = require(`../src/constants/${raid.raidName}`);

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
                                        processedLogs.guildBossKills[key],
                                        diff
                                    );
                                } else {
                                    guilds[key] = mergeBossKillIntoGuildData(
                                        guilds[key],
                                        processedLogs.guildBossKills[key],
                                        diff
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
                if (this.isUpdating)
                    throw new Error("Database is already updating");
                this.isUpdating = true;
                this.updateStatus = "Database is already updating";

                let updateStarted = new Date().getTime() / 1000;
                let maintence = await this.db.collection("maintence");
                let lastUpdated = (await maintence.findOne()).lastUpdated;

                for (let raid of raids) {
                    let raidData = require(`../src/constants/${raid.raidName}`);

                    for (let boss of raidData.encounters) {
                        for (let diff in raid.difficulties) {
                            console.log(
                                "db: Updating " +
                                    boss.encounter_name +
                                    " diff: " +
                                    diff
                            );
                            this.updateStatus = `Updating ${
                                boss.encounter_name
                            }`;

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
                                            processedLogs.guildBossKills[key],
                                            diff
                                        )
                                    );
                            }
                        }
                    }
                }

                await this.updateGuilds();

                await maintence.updateOne(
                    {},
                    {
                        $set: {
                            lastUpdated: updateStarted
                        }
                    }
                );

                this.isUpdating = false;
                this.updateStatus = "";

                resolve(updateStarted);
            } catch (err) {
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

    async getRaid(raidName) {
        return new Promise(async (resolve, reject) => {
            try {
                let raidData = {};
                let bosses = await this.db
                    .collection(raidName)
                    .find()
                    .project({
                        ["dps"]: 0,
                        ["hps"]: 0,
                        ["latestKills"]: 0
                    })
                    .toArray();

                for (let boss of bosses) {
                    boss.firstKills = boss.firstKills[0];
                    boss.fastestKills = boss.fastestKills[0];

                    if (!raidData[boss.difficulty])
                        raidData[boss.difficulty] = {};

                    raidData[boss.difficulty][boss.bossName] = boss;
                }

                resolve(raidData);
            } catch (err) {
                reject(err);
            }
        });
    }

    async getRaidBoss(raidName, bossName) {
        return new Promise(async (resolve, reject) => {
            try {
                let raidCollection = this.db.collection(raidName);
                let raidBoss = await raidCollection
                    .find({
                        bossName: new RegExp("^" + bossName + "$", "i")
                    })
                    .toArray();
                if (!raidBoss) throw new Error("Boss not found");

                let raidBosses = {};

                for (let boss of raidBoss) {
                    raidBosses[boss.difficulty] = boss;
                }

                resolve(raidBosses);
            } catch (err) {
                reject(err);
            }
        });
    }

    async getPlayerPerformance({
        realm,
        playerName,
        specs,
        raidName,
        bossName = null,
        difficulty = null
    }) {
        return new Promise(async (resolve, reject) => {
            const raid = require(`../src/constants/${raidName}`);
            if (bossName) raid.encounters = [{ encounter_name: bossName }];
            if (difficulty) raid.difficulties = [difficulty];

            let data = {};
            let raidCollection = await this.db.collection(raidName);
            for (let specId of specs) {
                data[specId] = {
                    [raidName]: {}
                };

                for (let boss of raid.encounters) {
                    for (let diff of raid.difficulties) {
                        if (!data[specId][raidName][diff])
                            data[specId][raidName][diff] = {};

                        let dbResponse = (await raidCollection
                            .find({
                                bossName: new RegExp(
                                    "^" + boss.encounter_name + "$",
                                    "i"
                                ),
                                difficulty: new RegExp("^" + diff + "$", "i")
                            })
                            .project({
                                [`dps.${realm} ${playerName} ${specId}`]: 1,
                                [`hps.${realm} ${playerName} ${specId}`]: 1
                            })
                            .toArray())[0];

                        let dpsKey = Object.keys(dbResponse.dps)[0];
                        if (dpsKey) {
                            dbResponse.dps = dbResponse.dps[dpsKey];
                        }

                        let hpsKey = Object.keys(dbResponse.hps)[0];
                        if (hpsKey) {
                            dbResponse.hps = dbResponse.hps[hpsKey];
                        }

                        data[specId][raidName][diff][
                            boss.encounter_name
                        ] = dbResponse;
                    }
                }
            }

            let performance = {
                [raidName]: {}
            };

            for (let diff of raid.difficulties) {
                performance[raidName][diff] = {};
            }

            for (let specId in data) {
                for (let diff of raid.difficulties) {
                    for (let bossName in data[specId][raidName][diff]) {
                        if (!performance[raidName][diff][bossName])
                            performance[raidName][diff][bossName] = {
                                dps: { dps: false },
                                hps: { hps: false }
                            };
                        if (
                            performance[raidName][diff][bossName].dps.dps <
                            data[specId][raidName][diff][bossName].dps.dps
                        ) {
                            performance[raidName][diff][bossName].dps =
                                data[specId][raidName][diff][bossName].dps;
                        }

                        if (
                            performance[raidName][diff][bossName].hps.hps <
                            data[specId][raidName][diff][bossName].hps.hps
                        ) {
                            performance[raidName][diff][bossName].hps =
                                data[specId][raidName][diff][bossName].hps;
                        }
                    }
                }
            }

            resolve(performance);
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
                            guildName: new RegExp(
                                "^" + guild.guildName + "$",
                                "i"
                            ),
                            realm: guild.realm
                        },
                        { $set: { ...guild, _id: oldGuild["_id"] } }
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
                    raidCollection.insertOne(
                        applyPlayerPerformanceRanks(raidBoss)
                    );
                } else {
                    await raidCollection.updateOne(
                        {
                            bossName: new RegExp(
                                "^" + raidBoss.bossName + "$",
                                "i"
                            ),
                            difficulty: raidBoss.difficulty
                        },
                        {
                            $set: {
                                ...applyPlayerPerformanceRanks(
                                    updateRaidBoss(oldRaidBoss, raidBoss)
                                ),
                                _id: oldRaidBoss["_id"]
                            }
                        }
                    );
                }

                resolve("Done");
            } catch (err) {
                reject(err);
            }
        });
    }

    async lastUpdated() {
        return new Promise(async (resolve, reject) => {
            try {
                let maintence = await this.db.collection("maintence");
                let lastUpdated = (await maintence.findOne()).lastUpdated;
                resolve(lastUpdated);
            } catch (err) {
                reject(err);
            }
        });
    }

    async updateGuilds() {
        return new Promise(async (resolve, reject) => {
            try {
                this.updateStatus = "Updating guilds";

                let guilds = await this.db
                    .collection("guilds")
                    .find({})
                    .toArray();

                for (let guild of guilds) {
                    let newGuild = await createGuildData(
                        guild.realm,
                        guild.guildName
                    );

                    newGuild = {
                        ...newGuild,
                        progression: {
                            ...guild.progression,
                            latestKills: newGuild.progression.latestKills
                        }
                    };

                    await this.saveGuild(newGuild);
                }

                resolve("Done");
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = new Database();
