import { difficultyLabels, currentContent } from "tauriprogress-constants";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import GuildRaidBossList from "./GuildRaidBossList";
import GuildBoss from "./GuildBoss";
import GuildBossSummary from "./GuildBossSummary";
import SelectDifficulty from "../SelectDifficulty";

import { getBossesDefeated, selectDefaultDifficulty } from "./helpers";
import { getNestedObjectValue } from "../../helpers";

import { guildSelectBoss } from "../../redux/actions";

function GuildProgression({ progression }) {
    const raids = useSelector(state => state.raidInfo.raids);
    const { selectedRaidName, selectedBossName } = useSelector(
        state => state.guild
    );
    const dispatch = useDispatch();

    const [difficulty, setDifficulty] = useState(
        selectDefaultDifficulty(
            progression,
            currentContent.raidName,
            raids[currentContent.raidName].encounters[0].encounter_name
        )
    );

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
        return <div className="displayGuildProgression" />;
    }

    let extendedRaids = [];
    let boss = getNestedObjectValue(progression, [
        selectedRaidName,
        difficulty,
        selectedBossName
    ]);

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
        <div className="displayGuildProgression">
            <aside>
                {extendedRaids.map(raid => (
                    <GuildRaidBossList key={raid.name} raid={raid} />
                ))}
            </aside>
            <div className="displayGuildProgressionDataContainer">
                <GuildBossSummary
                    bossName={`${selectedBossName} ${
                        boss ? difficultyLabels[difficulty] : ""
                    }`}
                    data={boss}
                />
                <SelectDifficulty
                    difficulty={difficulty}
                    onChange={(e, difficulty) => setDifficulty(difficulty)}
                />
                {boss && (
                    <React.Fragment>
                        <GuildBoss data={boss} />
                    </React.Fragment>
                )}
            </div>
        </div>
    );
}

export default GuildProgression;
