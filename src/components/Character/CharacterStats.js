import React from "react";
import { useSelector } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import MetaDataList from "../MetaDataList";

function styles(theme) {
    return {
        container: {
            margin: "0 10px",
            maxWidth: "260px"
        },
        metaDataList: {
            margin: "0px"
        }
    };
}

function CharacterStats({ classes }) {
    const { data } = useSelector(state => {
        return {
            data: state.character.data.data
        };
    });

    const general = [
        { label: "Achievements", value: data && data.pts },
        { label: "Level", value: data && data.level },
        { label: "Ilvl", value: data && data.avgitemlevel }
    ];

    const primaryStats = [
        { label: "Armor", value: data && data.characterStat.effective_armor },
        {
            label: "Stamina",
            value: data && data.characterStat.effective_stamina
        },
        {
            label: "Strength",
            value: data && data.characterStat.effective_strength
        },
        {
            label: "Agility",
            value: data && data.characterStat.effective_agility
        },
        {
            label: "Intellect",
            value: data && data.characterStat.effective_intellect
        },
        { label: "Spirit", value: data && data.characterStat.effective_spirit }
    ];
    const secondaryStats = [
        {
            label: "Attack power",
            value:
                data &&
                data.characterStat.bonus_strength_attackpower +
                    data.characterStat.bonus_agility_attackpower
        },
        { label: "Spell power", value: data && data.characterStat.heal_bonus },
        { label: "Hit", value: data && data.characterStat.melee_hit_rating },
        { label: "Crit", value: data && data.characterStat.melee_crit_rating },
        {
            label: "Haste",
            value: data && data.characterStat.hasterating_melee_dmg
        },
        { label: "Mastery", value: data && data.characterStat.mastery_rating },
        {
            label: "Dodge",
            value: data && data.characterStat.dodge_chance + "%"
        },
        { label: "Parry", value: data && data.characterStat.parry_chance + "%" }
    ];

    return (
        <div className={`${classes.container}`}>
            <MetaDataList
                title="General"
                values={general}
                className={classes.metaDataList}
            />
            <MetaDataList
                title="Primary Stats"
                values={primaryStats}
                className={classes.metaDataList}
            />
            <MetaDataList
                title="Secondary Stats"
                values={secondaryStats}
                className={classes.metaDataList}
            />
        </div>
    );
}

export default withStyles(styles)(CharacterStats);
