const util = require("util");
const fs = require("fs-extra");
const exec = util.promisify(require("child_process").exec);

const spaScript =
    '<script type="text/javascript">(function(l) { if (l.search) { var q = {}; l.search.slice(1).split("&").forEach(function(v) {var a = v.split("=");q[a[0]] = a.slice(1).join("=").replace(/~and~/g, "&");});if (q.p !== undefined) {window.history.replaceState(null,null,l.pathname.slice(0, -1) +(q.p || "") +(q.q ? "?" + q.q : "") +l.hash);}}})(window.location);</script>';
const urlsPath = "./node_modules/tauriprogress-constants/urls.json";
const serverUrl = "https://ossified-hyacinth.glitch.me";
const oldBuildFiles = [
    "static",
    "manifest.json",
    "index.html",
    "asset-manifest.json",
    "service-worker.js",
    "precache-manifest."
];

(async function() {
    try {
        console.log("Changing server url to production");
        const urls = await fs.readJson(urlsPath);
        await fs.writeJson(urlsPath, { ...urls, serverUrl: serverUrl });

        console.log("Cleaning up previous build");
        const fileNames = await fs.readdir("./");
        for (let name of fileNames) {
            if (
                oldBuildFiles.reduce(
                    (acc, oldFileName) =>
                        name.includes(oldFileName) ? true : acc,
                    false
                )
            ) {
                await fs.remove(`./${name}`);
            }
        }

        console.log("Compiling new build");
        await exec("react-scripts build");

        console.log("Copying build into production directory");
        await fs.copy("./build", "./");

        console.log("Running post build processes");
        const indexHtml = fs.readFileSync("index.html", "utf8");
        fs.writeFileSync(
            "index.html",
            indexHtml.replace(
                '<div id="root"></div>',
                `<div id="root"></div>${spaScript}`
            )
        );

        console.log("Changing server url back to original");
        await fs.writeJSON(urlsPath, urls);
    } catch (err) {
        console.error(err);
    }
})();
