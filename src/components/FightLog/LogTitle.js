import { difficultyLabels } from "tauriprogress-constants";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { withTheme } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import DisplayDate from "../DisplayDate";
import MetaDataList from "../MetaDataList";

import { convertFightTime } from "../../helpers";

function LogTitle({ data, theme }) {
    const {
        palette: {
            factionColors: { alliance, horde }
        }
    } = theme;

    const date = new Date(data.killtime * 1000);

    const general = [
        {
            label: "Guild",
            value: data.guildid ? (
                <Link
                    component={RouterLink}
                    to={`/guild/${data.guilddata.name}?realm=${data.realm}`}
                    style={{
                        color: data.guilddata.faction ? horde : alliance
                    }}
                >
                    {data.guilddata.name}
                </Link>
            ) : (
                "Random"
            )
        },
        {
            label: "Boss",
            value: (
                <Link
                    color="inherit"
                    component={RouterLink}
                    to={`/raid/${data.mapentry.name}/${data.encounter_data.encounter_name}`}
                >
                    {data.encounter_data.encounter_name}
                </Link>
            )
        },
        {
            label: "Difficulty",
            value: difficultyLabels[data.difficulty]
        },
        {
            label: "Time",
            value: convertFightTime(data.fight_time)
        },
        {
            label: "Date",
            value: (
                <DisplayDate date={date}>
                    {" "}
                    {`${("0" + date.getHours()).slice(-2)}:${(
                        "0" + date.getMinutes()
                    ).slice(-2)}`}
                </DisplayDate>
            )
        }
    ];

    const total = [
        {
            label: "Dps",
            value: new Intl.NumberFormat().format(
                Math.floor(
                    data.members.reduce(
                        (acc, member) => acc + member.dmg_done,
                        0
                    ) /
                        (data.fight_time / 1000)
                )
            )
        },
        {
            label: "Hps",
            value: new Intl.NumberFormat().format(
                Math.floor(
                    data.members.reduce(
                        (acc, member) => acc + member.total_healing,
                        0
                    ) /
                        (data.fight_time / 1000)
                )
            )
        },
        {
            label: "Damage taken",
            value: new Intl.NumberFormat().format(
                data.members.reduce((acc, member) => acc + member.dmg_taken, 0)
            )
        },
        { label: "Deaths", value: data.deaths_fight },
        { label: "Resurrects", value: data.resurrects_fight }
    ];

    return (
        <Grid container>
            <Grid item>
                <MetaDataList title="General" values={general} />
            </Grid>
            <Grid item>
                <MetaDataList title="Total" values={total} />
            </Grid>
        </Grid>
    );
}

export default withTheme(LogTitle);
