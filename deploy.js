const fs = require("fs");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const googlAnalitycs =
    "<!-- Global site tag (gtag.js) - Google Analytics --><script async src=\"https://www.googletagmanager.com/gtag/js?id=UA-156000531-1\"></script><script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-156000531-1');</script>";
const spaScript =
    '<script type="text/javascript">(function(l) { if (l.search) { var q = {}; l.search.slice(1).split("&").forEach(function(v) {var a = v.split("=");q[a[0]] = a.slice(1).join("=").replace(/~and~/g, "&");});if (q.p !== undefined) {window.history.replaceState(null,null,l.pathname.slice(0, -1) +(q.p || "") +(q.q ? "?" + q.q : "") +l.hash);}}})(window.location);</script>';
const oldBuildFiles = [
    "static",
    "manifest.json",
    "index.html",
    "asset-manifest.json",
    "service-worker.js",
    "precache-manifest.",
    "icon.svg"
];

(async function () {
    try {
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
            indexHtml
                .replace(
                    '<div id="root"></div>',
                    `<div id="root"></div>${spaScript}`
                )
                .replace("<head>", `<head>${googlAnalitycs}`)
        );

        console.log("Git commit build");
        await exec("git add -A");
        await exec('git commit -m "build"');
        console.log("Git push");
        await exec("git push");

        console.log("Successful build and push");
    } catch (err) {
        console.error(err);
    }
})();
