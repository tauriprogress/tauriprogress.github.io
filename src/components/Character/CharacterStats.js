import React from "react";
import { useSelector } from "react-redux";

import MetaDataList from "../MetaDataList";

import { styled } from "@mui/material";
import { characterDataSelector } from "../../redux/selectors";

const Container = styled("div")(({ theme }) => ({
    margin: "0 10px",
    maxWidth: "260px",
}));
const CustomMetaDataList = styled(MetaDataList)(({ theme }) => ({
    margin: "0px",
}));

function CharacterStats() {
    const data = useSelector(characterDataSelector);

    const general = [
        { label: "Achievements", value: data && data.pts },
        { label: "Level", value: data && data.level },
        { label: "Ilvl", value: data && data.avgitemlevel },
    ];

    const primaryStats = [
        { label: "Armor", value: data && data.characterStat.effective_armor },
        {
            label: "Stamina",
            value: data && data.characterStat.effective_stamina,
        },
        {
            label: "Strength",
            value: data && data.characterStat.effective_strength,
        },
        {
            label: "Agility",
            value: data && data.characterStat.effective_agility,
        },
        {
            label: "Intellect",
            value: data && data.characterStat.effective_intellect,
        },
        { label: "Spirit", value: data && data.characterStat.effective_spirit },
    ];
    const secondaryStats = [
        {
            label: "Attack power",
            value:
                data &&
                data.characterStat.bonus_strength_attackpower +
                    data.characterStat.bonus_agility_attackpower,
        },
        { label: "Spell power", value: data && data.characterStat.heal_bonus },
        { label: "Hit", value: data && data.characterStat.melee_hit_rating },
        { label: "Crit", value: data && data.characterStat.melee_crit_rating },
        {
            label: "Haste",
            value: data && data.characterStat.hasterating_melee_dmg,
        },
        { label: "Mastery", value: data && data.characterStat.mastery_rating },
        {
            label: "Dodge",
            value: data && data.characterStat.dodge_chance + "%",
        },
        {
            label: "Parry",
            value: data && data.characterStat.parry_chance + "%",
        },
    ];

    return (
        <Container>
            <CustomMetaDataList title="General" values={general} />
            <CustomMetaDataList title="Primary Stats" values={primaryStats} />
            <CustomMetaDataList
                title="Secondary Stats"
                values={secondaryStats}
            />
        </Container>
    );
}

export default CharacterStats;
