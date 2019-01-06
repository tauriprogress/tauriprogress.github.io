require("dotenv").config();
const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database");
const port = process.env.PORT || 3001;
const {
    verifyGetGuild,
    verifyGetPlayer,
    verifyGetRaid,
    verifyGetboss
} = require("./middlewares");
const tauriApi = require("./tauriApi");
const { whenWas } = require("./helpers");
const classToSpec = require("../src/constants/classToSpec");

(async function() {
    try {
        await db.connect();
        if (!(await db.isInitalized())) {
            await db.initalizeDatabase();
        }
    } catch (err) {
        console.error(err);
        db.disconnect().catch(err => console.error(err));
        process.exit(1);
    }
    app.use(
        cors({
            origin: "https://tauriprogress.github.io",
            optionsSuccessStatus: 200
        })
    );

    app.use(bodyParser.json());

    app.get("/getguildlist", async (req, res) => {
        try {
            res.send({
                success: true,
                response: await db.getGuildList()
            });
        } catch (err) {
            res.send({
                success: false,
                errorstring: err.message
            });
        }
    });

    app.post("/getguild", verifyGetGuild, async (req, res) => {
        try {
            res.send({
                success: true,
                response: await db.getGuild(req.body.realm, req.body.guildName)
            });
        } catch (err) {
            res.send({
                success: false,
                errorstring: err.message
            });
        }
    });

    app.post("/getplayer", verifyGetPlayer, async (req, res) => {
        try {
            let player = await tauriApi.getCharacter(
                req.body.realm,
                req.body.playerName
            );
            if (!player.success) throw new Error(player.errorstring);
            let performance = await db.getPlayerPerformance({
                realm: req.body.realm,
                playerName: req.body.playerName,
                specs: classToSpec[player.response.class],
                raidName: req.body.raidName,
                bossName: req.body.bossName,
                difficulty: req.body.difficulty
            });
            res.send({
                success: true,
                response: { ...player.response, progression: performance }
            });
        } catch (err) {
            res.send({
                success: false,
                errorstring: err.message
            });
        }
    });

    app.post("/getraid", verifyGetRaid, async (req, res) => {
        try {
            res.send({
                success: true,
                response: await db.getRaid(req.body.raidName)
            });
        } catch (err) {
            res.send({
                success: false,
                errorstring: err.message
            });
        }
    });

    app.post("/getboss", verifyGetboss, async (req, res) => {
        try {
            res.send({
                success: true,
                response: await db.getRaidBoss(
                    req.body.raidName,
                    req.body.bossName
                )
            });
        } catch (err) {
            res.send({
                success: false,
                errorstring: err.message
            });
        }
    });

    app.get("/lastupdated", async (req, res) => {
        try {
            res.send({
                success: true,
                response: await db.lastUpdated()
            });
        } catch (err) {
            res.send({
                success: false,
                errorstring: err.message
            });
        }
    });

    app.get("/update", async (req, res) => {
        try {
            if (whenWas(await db.lastUpdated()) < 3)
                throw new Error("Database can only be updated every 3 hours.");
            res.send({
                success: true,
                response: await db.updateDatabase()
            });
        } catch (err) {
            res.send({
                success: false,
                errorstring: err.message
            });
        }
    });

    app.listen(port, () => console.log(`Server running on port ${port}`));
})();
