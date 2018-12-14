const dbUser = process.env.MONGODB_USER;
const dbPassword = process.env.MONGODB_PASSWORD;
const mongoUrl = `mongodb://${dbUser}:${dbPassword}@ds125368.mlab.com:25368/tauriguilds`;
const MongoClient = require("mongodb").MongoClient;

class Database {
    constructor() {
        this.db = {};
    }

    async connect() {
        try {
            let client = await MongoClient.connect(
                mongoUrl,
                { useNewUrlParser: true }
            );
            this.db = client.db("tauriguilds");
        } catch (err) {
            throw err;
        }
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
