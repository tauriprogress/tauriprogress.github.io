import { difficultyLabels, valuesCorrectSince } from "tauriprogress-constants";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { withTheme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Warning from "@material-ui/icons/Warning";
import Link from "@material-ui/core/Link";

import MetaDataList from "../MetaDataList";

import { convertFightTime } from "../DisplayRaid/helpers";

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
                <RouterLink
                    to={`/guild/${data.guilddata.name}?realm=${data.realm}`}
                >
                    <Link
                        component="span"
                        style={{
                            color: data.guilddata.faction ? horde : alliance
                        }}
                    >
                        {data.guilddata.name}
                    </Link>
                </RouterLink>
            ) : (
                "Random"
            )
        },
        {
            label: "Boss",
            value: (
                <RouterLink
                    to={`/raid/${data.mapentry.name}/${
                        data.encounter_data.encounter_name
                    }`}
                >
                    <Link className="textBold" color="inherit" component="span">
                        {data.encounter_data.encounter_name}
                    </Link>
                </RouterLink>
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
            value: `${date.toLocaleDateString()} ${(
                "0" + date.getHours()
            ).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`
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
        <div className="fightLogTitle">
            <MetaDataList title="General" values={general} />
            <MetaDataList title="Total" values={total} />
            <div>
                {data.encounter_data.encounter_name ===
                    "Durumu the Forgotten" &&
                    data.killtime < valuesCorrectSince && (
                        <React.Fragment>
                            <Chip
                                label={`Durumu damage data is incorrect before ${new Date(
                                    valuesCorrectSince * 1000
                                ).toLocaleDateString()} due to a bug.`}
                                avatar={
                                    <Avatar>
                                        <Warning color="secondary" />
                                    </Avatar>
                                }
                                className="warning"
                                color="primary"
                            />
                            <br />
                        </React.Fragment>
                    )}
                {data.killtime < valuesCorrectSince && (
                    <Chip
                        label={`Absorb data is incorrect before ${new Date(
                            valuesCorrectSince * 1000
                        ).toLocaleDateString()} due to a bug.`}
                        avatar={
                            <Avatar>
                                <Warning color="secondary" />
                            </Avatar>
                        }
                        className="warning"
                        color="primary"
                    />
                )}
            </div>
        </div>
    );
}

export default withTheme()(LogTitle);
