import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import GuildRaidBossList from "./GuildRaidBossList";
import GuildBoss from "./GuildBoss";
import AsideContainer from "../AsideContainer";

import { getBossesDefeated } from "./helpers";

import { selectGuildBoss } from "../../redux/actions";

function GuildProgression() {
    const { selectedBossName, progression, raids } = useSelector(state => ({
        ...state.guild,
        progression: state.guild.data.progression,
        raids: state.environment.currentContent.raids
    }));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            selectGuildBoss({
                selectedRaidName: raids[0].name,
                selectedBossName: raids[0].bosses[0].name
            })
        );
    }, []);

    if (!selectedBossName) {
        return <div />;
    }

    let extendedRaids = [];

    for (let raid of raids) {
        let bossesDefeated = getBossesDefeated(
            raid.name,
            raid.bosses,
            progression
        );

        raid.bosses = raid.bosses.map(boss => ({
            ...boss,
            defeated: bossesDefeated[boss.name] ? true : false
        }));

        extendedRaids.push(raid);
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
