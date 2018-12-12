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
        return this.db
            .collection("guilds")
            .find()
            .toArray();
    }
}

module.exports = new Database();
