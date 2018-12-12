const db = require("./database");
const app = require("express")();
const port = 3001;

(async function() {
    await db.connect();

    app.get("/", async (req, res) => {
        res.send(await db.getGuilds());
    });

    app.listen(3001, () => console.log(`Server running on port ${port}`));
})();
