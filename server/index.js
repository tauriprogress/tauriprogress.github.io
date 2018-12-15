require("dotenv").config();
const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database");
const tauriApi = require("./tauriApi");
const realms = require("../constants/realms");
const port = 3001;

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
            origin: "http://localhost:3000",
            optionsSuccessStatus: 200
        })
    );

    app.use(bodyParser.json());

    app.get("/", async (req, res) => {
        res.send(await db.getGuildList());
    });

    app.listen(3001, () => console.log(`Server running on port ${port}`));
})();
