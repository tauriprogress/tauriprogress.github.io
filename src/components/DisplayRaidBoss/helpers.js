import { serverUrl } from "../../constants/urls";

export function getBossData(raidName, bossName, actions) {
    actions.raidBossInitRequest({
        loading: true,
        raidName,
        bossName
    });
    fetch(`${serverUrl}/getboss˛`, {
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
