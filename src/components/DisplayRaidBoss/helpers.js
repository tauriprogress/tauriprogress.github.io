export function getBossData(raidName, bossName, actions) {
    actions.raidBossInitRequest({
        loading: true,
        raidName,
        bossName
    });
    fetch("https://ossified-hyacinth.glitch.me/getboss", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            raidName: raidName,
            bossName: bossName
        })
    })
        .then(res => res.json())
        .then(res => {
            if (!res.success) {
                throw new Error(res.errorstring);
            } else {
                actions.raidBossFill(res.response);
            }
        })
        .catch(err => actions.raidBossSetError(err.message));
}
