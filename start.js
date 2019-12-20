const fs = require("fs-extra");

const urlsPath = "./node_modules/tauriprogress-constants/urls.json";
const localhost = "http://localhost:3001";

(async function() {
    const urls = await fs.readJson(urlsPath);
    console.log("Changing server url to:", localhost);
    await fs.writeJson(urlsPath, { ...urls, serverUrl: localhost });
})();
