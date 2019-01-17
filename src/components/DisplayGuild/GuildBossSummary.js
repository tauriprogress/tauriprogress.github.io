import React from "react";

import MetaDataList from "../MetaDataList";

import { convertFightTime } from "../DisplayRaid/helpers";

function GuildBossSummary({ bossName, data }) {
    let metaData = [
        { label: "Kills", value: "-" },
        {
            label: "First kill",
            value: "-"
        },
        { label: "Fastest kill", value: "-" }
    ];
    if (data) {
        metaData = [
            { label: "Kills", value: data.killCount },
            {
                label: "First kill",
                value: new Date(data.firstKill * 1000).toLocaleDateString()
            },
            { label: "Fastest kill", value: convertFightTime(data.fastestKill) }
        ];
    }
    return (
        <div className="displayGuildBossSummary">
            <MetaDataList title={bossName} values={metaData} />
        </div>
    );
}

export default GuildBossSummary;
