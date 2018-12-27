const realms = require("../src/constants/realms");
const { raids } = require("../src/constants/currentContent");

function verifyGetGuild(req, res, next) {
    try {
        if (!req.body.guildName) throw new Error("Invalid guild name.");
        req.body.guildName = req.body.guildName.trim().replace(/\s+/g, " ");
        if (!req.body.realm) {
            req.body.realm = realms["tauri"];
        }
        req.body.realm = req.body.realm.trim();
        if (!validRealm(req.body.realm)) throw new Error("Invalid realm name.");
        next();
    } catch (err) {
        res.send({
            success: false,
            errorstring: err.message
        });
    }
}

function verifyGetPlayer(req, res, next) {
    try {
        if (!req.body.playerName) throw new Error("Invalid player name.");
        req.body.playerName = req.body.playerName.trim().replace(/\s+/g, " ");

        if (!req.body.raidName) throw new Error("Invalid raid name.");
        req.body.raidName = req.body.raidName.trim().replace(/\s+/g, " ");

        if (!validRaidName(req.body.raidName))
            throw new Error("Invalid raid name.");

        if (req.body.bossName)
            req.body.bossName = req.body.bossName.trim().replace(/\s+/g, " ");

        if (
            req.body.bossName &&
            !validBossName(req.body.raidName, req.body.bossName)
        )
            throw new Error("Invalid boss name.");

        if (
            req.body.difficulty &&
            validDifficulty(req.body.raidName, req.body.difficulty)
        )
            throw new Error("Invalid difficulty option.");

        if (!req.body.realm) {
            req.body.realm = realms["tauri"];
        }
        req.body.realm = req.body.realm.trim();
        if (!validRealm(req.body.realm)) throw new Error("Invalid realm name.");
        next();
    } catch (err) {
        res.send({ success: false, errorstring: err.message });
    }
}

function verifyGetRaid(req, res, next) {
    try {
        if (!req.body.raidName) throw new Error("Invalid raid name.");
        req.body.raidName = req.body.raidName.trim().replace(/\s+/g, " ");

        if (!validRaidName(req.body.raidName))
            throw new Error("Invalid raid name.");

        next();
    } catch (err) {
        res.send({
            success: false,
            errorstring: err.message
        });
    }
}

function verifyGetboss(req, res, next) {
    try {
        if (!req.body.raidName) throw new Error("Invalid raid name.");
        req.body.raidName = req.body.raidName.trim().replace(/\s+/g, " ");

        if (!validRaidName(req.body.raidName))
            throw new Error("Invalid raid name.");

        if (!req.body.bossName) throw new Error("Invalid boss name.");
        req.body.bossName = req.body.bossName.trim().replace(/\s+/g, " ");

        if (!validBossName(req.body.raidName, req.body.bossName))
            throw new Error("Invalid boss name.");

        next();
    } catch (err) {
        res.send({ success: false, errorstring: err.message });
    }
}

function validRaidName(raidName) {
    let validRaidName = false;
    for (let raid of raids) {
        if (raid.raidName === raidName) {
            validRaidName = true;
            break;
        }
    }
    return validRaidName;
}

function validBossName(raidName, bossName) {
    let { encounters } = require(`../src/constants/${raidName}`);
    for (let encounter of encounters) {
        if (encounter.encounter_name === bossName) {
            return true;
        }
    }
    return false;
}

function validRealm(realm) {
    for (let key in realms) {
        if (realms[key] === realm) {
            return true;
        }
    }

    return false;
}

function validDifficulty(raidName, difficulty) {
    let raidDiffs = {};
    for (let raid of raids) {
        if (raid.raidName === raidName) {
            raidDiffs = raid.difficulties;
            break;
        }
    }
    if (!raidDiffs[difficulty]) return false;

    return true;
}

module.exports = {
    verifyGetGuild,
    verifyGetPlayer,
    verifyGetRaid,
    verifyGetboss
};
