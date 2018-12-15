const dbUser = process.env.MONGODB_USER;
const dbPassword = process.env.MONGODB_PASSWORD;
const mongoUrl = `mongodb://${dbUser}:${dbPassword}@ds125368.mlab.com:25368/tauriguilds`;
const MongoClient = require("mongodb").MongoClient;

const realms = require("../constants/realms.json");
const { raids } = require("../constants/currentContent.json");
const { fetchLatestHeroicGuilds, fetchOrUpdateRaidBoss } = require("./helpers");

class Database {
    constructor() {
        this.db = {};
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
                console.log("Initalizing database");

                console.log("db: Creating maintence collection");
                let maintence = await this.db.collection("maintence");
                if (await maintence.findOne()) await maintence.remove();
                maintence.insertOne({
                    lastUpdated: new Date().getTime() / 1000,
                    initalized: true
                });

                console.log("db: Creating guilds collection");
                let guildsCollection = await this.db.collection("guilds");
                if (await guildsCollection.findOne())
                    await guildsCollection.remove();
                for (let key in realms) {
                    let guilds = await fetchLatestHeroicGuilds(realms[key]);
                    for (let guildName in guilds) {
                        let guild = await fetchOrUpdateGuildData({
                            realm: guilds[guildName],
                            guildName
                        });

                        await guildsCollection.insertOne(guild);
                    }
                }

                console.log("db: Creating raids");
                let raidCollection;
                for (let raid of raids) {
                    console.log(`db: Creating ${raid.raidName} collection`);
                    raidCollection = await this.db.collection(raid.raidName);
                    if (await raidCollection.findOne())
                        await raidCollection.remove();

                    let raidData = require(`../constants/${raid.raidName}`);

                    for (let boss of raidData.encounters) {
                        for (let diff in raidData.difficulties) {
                            let bossData = await fetchOrUpdateRaidBoss({
                                bossName: boss.encounter_name,
                                bossId: boss.encounter_id,
                                difficulty: diff,
                                lastUpdated: 0
                            });

                            await raidCollection.insertOne(bossData);
                        }
                    }
                }
                console.log("db: initalization done.");
                resolve("Done");
            } catch (err) {
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
                            ["progression.completed"]: 1
                        })
                        .toArray()
                );
            } catch (err) {
                reject(err);
            }
        });
    }

    async getGuild({ realm, guildName }) {
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
}

module.exports = new Database();
