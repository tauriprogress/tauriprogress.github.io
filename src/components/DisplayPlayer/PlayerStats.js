import React from "react";

import Card from "@material-ui/core/Card";

import MetaDataList from "../MetaDataList";

import { getBossesDefeated } from "./helpers";

function PlayerStats({ data }) {
    const general = [
        { label: "TOT HC", value: getBossesDefeated(data.progression) },
        { label: "Achievements", value: data.pts },
        { label: "Level", value: data.level },
        { label: "Ilvl", value: data.avgitemlevel }
    ];

    const primaryStats = [
        { label: "Armor", value: data.characterStat.effective_armor },
        { label: "Stamina", value: data.characterStat.effective_stamina },
        { label: "Strength", value: data.characterStat.effective_strength },
        { label: "Agility", value: data.characterStat.effective_agility },
        { label: "Intellect", value: data.characterStat.effective_intellect },
        { label: "Spirit", value: data.characterStat.effective_spirit }
    ];
    const secondaryStats = [
        {
            label: "Attack power",
            value:
                data.characterStat.bonus_strength_attackpower +
                data.characterStat.bonus_agility_attackpower
        },
        { label: "Spell power", value: data.characterStat.heal_bonus },
        { label: "Hit", value: data.characterStat.melee_hit_rating },
        { label: "Crit", value: data.characterStat.melee_crit_rating },
        { label: "Haste", value: data.characterStat.hasterating_melee_dmg },
        { label: "Dodge", value: data.characterStat.dodge_chance + "%" },
        { label: "Parry", value: data.characterStat.parry_chance + "%" }
    ];

    return (
        <Card className="displayPlayerStats">
            <MetaDataList title="General" values={general} />
            <MetaDataList title="Primary Stats" values={primaryStats} />
            <MetaDataList title="Secondary Stats" values={secondaryStats} />
        </Card>
    );
}

export default PlayerStats;
