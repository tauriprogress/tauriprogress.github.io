import React from "react";
import { shallowEqual, useSelector } from "react-redux";

import withTheme from "@mui/styles/withTheme";

import Link from "../Link";
import Grid from "@mui/material/Grid";

import DisplayDate from "../DisplayDate";
import MetaDataList from "../MetaDataList";

import { convertFightLength } from "../../helpers";

import {
    environmentCharacterSpecsSelector,
    environmentDifficultyNamesSelector,
} from "../../redux/selectors";
import { Avatar } from "@mui/material";

import { getRoleImg } from "../../helpers";

function LogTitle({ data, theme }) {
    const {
        palette: {
            factionColors: { alliance, horde },
        },
    } = theme;

    let countComposition = {
        heal: 0,
        melee: 0,
        ranged: 0,
        tank: 0,
    };

    const { specs, difficultyNames } = useSelector(
        (state) => ({
            specs: environmentCharacterSpecsSelector(state),
            difficultyNames: environmentDifficultyNamesSelector(state),
        }),
        shallowEqual
    );

    for (let member of data.members) {
        if (!member.spec) continue;
        let role = specs[member.spec].role;

        if (role === "damage") {
            role = specs[member.spec].rangeType;
        }

        countComposition[role] += 1;
    }

    const date = new Date(data.killtime * 1000);

    const general = [
        {
            label: "Guild",
            value: data.guildid ? (
                <Link
                    to={`/guild/${data.guilddata.name}?realm=${data.realm}`}
                    style={{
                        color: data.guilddata.faction ? horde : alliance,
                    }}
                >
                    {data.guilddata.name}
                </Link>
            ) : (
                "Random"
            ),
        },
        {
            label: "Boss",
            value: (
                <Link
                    color="inherit"
                    to={`/raid/${data.mapentry.name}/${data.encounter_data.encounter_name}`}
                >
                    {data.encounter_data.encounter_name}{" "}
                    {difficultyNames[data.difficulty]}
                </Link>
            ),
        },
        {
            label: "Wipes",
            value: data.wipes,
        },
        {
            label: "Time",
            value: convertFightLength(data.fight_time),
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
            ),
        },
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
            ),
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
            ),
        },
        {
            label: "Damage taken",
            value: new Intl.NumberFormat().format(
                data.members.reduce((acc, member) => acc + member.dmg_taken, 0)
            ),
        },
        { label: "Deaths", value: data.deaths_fight },
        { label: "Resurrects", value: data.resurrects_fight },
    ];

    const composition = [
        {
            label: "Characters",
            value: (
                <span>
                    {countComposition.tank +
                        countComposition.heal +
                        countComposition.ranged +
                        countComposition.melee}
                </span>
            ),
        },
        {
            label: "Tank",
            value: (
                <span>
                    {countComposition.tank}
                    <Avatar
                        variant="tiny"
                        component="span"
                        src={getRoleImg("Tank")}
                    />
                </span>
            ),
        },
        {
            label: "Healer",
            value: (
                <span>
                    {countComposition.heal}
                    <Avatar
                        variant="tiny"
                        component="span"
                        src={getRoleImg("Healer")}
                    />
                </span>
            ),
        },
        {
            label: "Ranged",
            value: (
                <span>
                    {countComposition.ranged}
                    <Avatar
                        variant="tiny"
                        component="span"
                        src={getRoleImg("Ranged")}
                    />
                </span>
            ),
        },
        {
            label: "Melee",
            value: (
                <span>
                    {countComposition.melee}
                    <Avatar
                        variant="tiny"
                        component="span"
                        src={getRoleImg("Melee")}
                    />
                </span>
            ),
        },
    ];

    return (
        <Grid container>
            <Grid item>
                <MetaDataList title="General" values={general} />
            </Grid>
            <Grid item>
                <MetaDataList title="Total" values={total} />
            </Grid>
            <Grid item>
                <MetaDataList title="Composition" values={composition} />
            </Grid>
        </Grid>
    );
}

export default withTheme(LogTitle);
