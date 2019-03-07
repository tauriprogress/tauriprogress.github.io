import React from "react";

import MetaDataList from "../MetaDataList";
import DateTooltip from "../DateTooltip";

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
        const date = new Date(data.firstKill * 1000);
        metaData = [
            { label: "Kills", value: data.killCount },
            {
                label: "First kill",
                value: (
                    <DateTooltip date={date}>
                        <span>{date.toLocaleDateString()}</span>
                    </DateTooltip>
                )
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
