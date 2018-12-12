require("dotenv").config();
const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database");
const tauriApi = require("./tauriApi");
const realms = require("../constants/realms");
const port = 3001;

(async function() {
    await db.connect();

    app.use(
        cors({
            origin: "http://localhost:3000",
            optionsSuccessStatus: 200
        })
    );

    app.use(bodyParser.json());

    app.get("/", async (req, res) => {
        res.send(await db.getGuilds());
    });

    app.listen(3001, () => console.log(`Server running on port ${port}`));
})();
