const util = require("util");
const fs = require("fs-extra");
const exec = util.promisify(require("child_process").exec);
const spaScript =
    '<script type="text/javascript">(function(l) { if (l.search) { var q = {}; l.search.slice(1).split("&").forEach(function(v) {var a = v.split("=");q[a[0]] = a.slice(1).join("=").replace(/~and~/g, "&");});if (q.p !== undefined) {window.history.replaceState(null,null,l.pathname.slice(0, -1) +(q.p || "") +(q.q ? "?" + q.q : "") +l.hash);}}})(window.location);</script>';

const oldBuildFiles = [
    "./static",
    "./manifest.json",
    "./index.html",
    "./asset-manifest.json",
    "./service-worker.js",
    "./precache-manifest.*"
];

(async function() {
    try {
        console.log("Cleaning up previous build");
        oldBuildFiles.map(async route => await fs.remove(route));

        console.log("Compiling new build");
        await exec("react-scripts build");

        console.log("Coping build into production directory");
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
    } catch (err) {
        console.error(err);
    }
})();
