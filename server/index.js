require("dotenv").config();
const db = require("./database");
const tauriApi = require("./tauriApi");
const app = require("express")();
const realms = require("../constants/realms");
const port = 3001;

(async function() {
    await db.connect();

    app.get("/", async (req, res) => {
        res.send(await db.getGuilds());
    });

    app.listen(3001, () => console.log(`Server running on port ${port}`));
})();
