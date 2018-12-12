const tauriApi = require("./tauriApi");
const realms = require("../constants/realms");
const { id: totId } = require("../constants/Throne of Thunder.json");
const { id: sooId } = require("../constants/Siege of Orgrimmar.json");

async function getLatestHeroicGuilds(realm, lastUpdated = 0) {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await tauriApi.getRaidLast(realm);
            if (!data.success) throw new Error(data.errorstring);

            let guilds = {};
            for (let bossKill of data.response.logs) {
                if (lastUpdated > bossKill.killtime) {
                    break;
                }
                if (
                    (bossKill.mapentry.id === totId ||
                        bossKill.mapentry.id === sooId) &&
                    (bossKill.difficulty === 5 || bossKill.difficulty === 6)
                ) {
                    if (bossKill.guildid) {
                        guilds[bossKill.guilddata.name] = realm;
                    }
                }
            }
            resolve(guilds);
        } catch (err) {
            reject(err);
        }
    });
}
