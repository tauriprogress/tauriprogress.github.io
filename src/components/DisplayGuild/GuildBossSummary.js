import React from "react";

import Typography from "@material-ui/core/Typography";

import DateTooltip from "../DateTooltip";

import { convertFightTime } from "../DisplayRaid/helpers";

function GuildBossSummary({ bossName, data }) {
    let date;
    if (data) {
        date = new Date(data.firstKill * 1000);
    }

    return (
        <div className="displayGuildBossSummary">
            <Typography variant="h5">{bossName}</Typography>
            <Typography variant="caption">
                {data && data.killCount} Kills
                <br />
                First:{" "}
                {data && (
                    <DateTooltip date={date}>
                        <span>{date.toLocaleDateString()}</span>
                    </DateTooltip>
                )}
                <br />
                Fastest:{" "}
                <span>{data && convertFightTime(data.fastestKill)}</span>
            </Typography>
        </div>
    );
}

export default GuildBossSummary;
