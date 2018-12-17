require("dotenv").config();
const fetch = require("node-fetch");
const url = require("url");

class TauriApi {
    constructor() {
        this.apikey = process.env.TAURI_API_KEY;
        this.apisecret = process.env.TAURI_API_SECRET;
        this.baseurl = "http://chapi.tauri.hu/apiIndex.php";
    }

    request(options) {
        return new Promise(async (resolve, reject) => {
            let timeOut = setTimeout(() => {
                reject({
                    sucess: false,
                    errorstring: "request timed out"
                });
            }, 3000);

            resolve(
                await fetch(
                    url.parse(this.baseurl + "?apikey=" + this.apikey),
                    options
                ).then(res => {
                    clearTimeout(timeOut);
                    return res.json();
                })
            );
        });
    }

    getCharacter(realm, name) {
        return this.request({
            method: "POST",
            body: encodeURIComponent(
                JSON.stringify({
                    secret: this.apisecret,
                    url: "character-sheet",
                    params: {
                        r: realm,
                        n: name
                    }
                })
            )
        });
    }

    getGuild(realm, name) {
        return this.request({
            method: "POST",
            body: encodeURIComponent(
                JSON.stringify({
                    secret: this.apisecret,
                    url: "guild-info",
                    params: {
                        r: realm,
                        gn: name
                    }
                })
            )
        });
    }

    getAchievements(realm, name) {
        return this.request({
            method: "POST",
            body: encodeURIComponent(
                JSON.stringify({
                    secret: this.apisecret,
                    url: "character-achievements",
                    params: {
                        r: realm,
                        n: name
                    }
                })
            )
        });
    }

    getRaidMaps(realm) {
        // get encounters by exapnsion
        return this.request({
            method: "POST",
            body: encodeURIComponent(
                JSON.stringify({
                    secret: this.apisecret,
                    url: "raid-maps",
                    params: {
                        r: realm
                    }
                })
            )
        });
    }

    getRaidLog(realm, id) {
        // returns info of 1 raid encounter by id
        return this.request({
            method: "POST",
            body: encodeURIComponent(
                JSON.stringify({
                    secret: this.apisecret,
                    url: "raid-log",
                    params: {
                        r: realm,
                        id: id
                    }
                })
            )
        });
    }

    getRaidLast(realm) {
        // returns the last boss kills on server, big response
        return this.request({
            method: "POST",
            body: encodeURIComponent(
                JSON.stringify({
                    secret: this.apisecret,
                    url: "raid-last",
                    params: {
                        r: realm
                    }
                })
            )
        });
    }

    getRaidPlayer(realm, characterName) {
        // returns latest boss kills of the player
        return this.request({
            method: "POST",
            body: encodeURIComponent(
                JSON.stringify({
                    secret: this.apisecret,
                    url: "raid-player",
                    params: {
                        r: realm,
                        cn: characterName
                    }
                })
            )
        });
    }

    getRaidGuild(realm, guildName) {
        // returns all of the boss kills of the guild
        return this.request({
            method: "POST",
            body: encodeURIComponent(
                JSON.stringify({
                    secret: this.apisecret,
                    url: "raid-guild",
                    params: {
                        r: realm,
                        gn: guildName
                    }
                })
            )
        });
    }

    getRaidRank(realm, encounter, difficulty) {
        // return boss kills of boss, sorted by fastest kill ascending
        return this.request({
            method: "POST",
            body: encodeURIComponent(
                JSON.stringify({
                    secret: this.apisecret,
                    url: "raid-rank-encounter",
                    params: {
                        r: realm,
                        encounter: encounter,
                        difficulty: difficulty
                    }
                })
            )
        });
    }

    getRaidGuildRank(realm, encounter, difficulty) {
        // similar to getRaidRank, but only returns guild kills, not including random kills
        return this.request({
            method: "POST",
            body: encodeURIComponent(
                JSON.stringify({
                    secret: this.apisecret,
                    url: "raid-guildrank-encounter",
                    params: {
                        r: realm,
                        encounter: encounter,
                        difficulty: difficulty
                    }
                })
            )
        });
    }
}

module.exports = new TauriApi();
