import { currentContent } from "tauriprogress-constants";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import GuildRaidBossList from "./GuildRaidBossList";
import GuildBoss from "./GuildBoss";
import AsideContainer from "../AsideContainer";

import { getBossesDefeated } from "./helpers";

import { guildSelectBoss } from "../../redux/actions";

function GuildProgression() {
    const { selectedBossName, progression, raids } = useSelector(state => ({
        ...state.guild,
        progression: state.guild.data.progression,
        raids: state.raidInfo.raids
    }));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            guildSelectBoss({
                selectedRaidName: raids[currentContent.raidName].name,
                selectedBossName:
                    raids[currentContent.raidName].encounters[0].encounter_name
            })
        );
    }, []);

    if (!selectedBossName) {
        return <div />;
    }

    let extendedRaids = [];

    for (let raidName in raids) {
        let bossesDefeated = getBossesDefeated(
            raidName,
            raids[raidName].encounters,
            progression
        );

        raids[raidName].encounters = raids[raidName].encounters.map(boss => ({
            ...boss,
            defeated: bossesDefeated[boss.encounter_name] ? true : false
        }));

        extendedRaids.push(raids[raidName]);
    }

    return (
        <AsideContainer
            AsideComponent={() =>
                extendedRaids.map(raid => (
                    <GuildRaidBossList key={raid.name} raid={raid} />
                ))
            }
        >
            <GuildBoss />
        </AsideContainer>
    );
}

export default GuildProgression;
