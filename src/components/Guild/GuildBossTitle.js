import React from "react";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import DateTooltip from "../DateTooltip";
import DisplayDate from "../DisplayDate";

import { convertFightTime } from "../../helpers";

function GuildBossTitle({ bossName, data }) {
    let date;
    if (data) {
        date = new Date(data.firstKill * 1000);
    }

    return (
        <Container style={{ textAlign: "center" }}>
            <Typography variant="h5">{bossName}</Typography>
            <Typography variant="caption" color="textSecondary">
                {data ? (
                    <React.Fragment>
                        {data.killCount} Kills
                        <br />
                        First:{" "}
                        <DateTooltip date={date}>
                            <DisplayDate date={date} />
                        </DateTooltip>
                        <br />
                        Fastest: {convertFightTime(data.fastestKill)}
                    </React.Fragment>
                ) : (
                    <span style={{ color: "#b71c1c" }}>Alive</span>
                )}
            </Typography>
        </Container>
    );
}

export default GuildBossTitle;
