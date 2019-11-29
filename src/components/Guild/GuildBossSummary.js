import React from "react";

import Typography from "@material-ui/core/Typography";

import DateTooltip from "../DateTooltip";

import { convertFightTime } from "../../helpers";
import DisplayDate from "../DisplayDate";

function GuildBossSummary({ bossName, data }) {
    let date;
    if (data) {
        date = new Date(data.firstKill * 1000);
    }

    return (
        <div className="displayGuildBossSummary">
            <Typography variant="h5">{bossName}</Typography>
            <Typography variant="caption">
                {data ? (
                    <React.Fragment>
                        {data.killCount} Kills
                        <br />
                        First:{" "}
                        <DateTooltip date={date}>
                            <span>
                                <DisplayDate date={date} />
                            </span>
                        </DateTooltip>
                        <br />
                        Fastest:{" "}
                        <span>{convertFightTime(data.fastestKill)}</span>
                    </React.Fragment>
                ) : (
                    <span style={{ color: "#b71c1c" }}>Alive</span>
                )}
            </Typography>
        </div>
    );
}

export default GuildBossSummary;
