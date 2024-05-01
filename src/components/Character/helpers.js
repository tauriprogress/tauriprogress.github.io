export function displayCharacterProgression(bosses, combatMetric) {
    if (combatMetric === "dps") {
        return true;
    }

    for (let bossName in bosses) {
        if (
            bosses[bossName]["all"] &&
            bosses[bossName]["all"].hps &&
            bosses[bossName]["all"].hps.hps
        ) {
            return true;
        }
    }

    return false;
}

export function getDifficulties(raids, raidName) {
    for (const raid of raids) {
        if (raid.name === raidName) {
            return raid.difficulties;
        }
    }
    return 0;
}

export function mapSpecIdToStats(specId) {
    const map = {
        270: healerStats,
        269: agiDPSStats,
        268: agiTankStats,
        64: intDPSStats,
        63: intDPSStats,
        62: intDPSStats,
        254: agiDPSStats,
        253: agiDPSStats,
        255: agiDPSStats,
        105: healerStats,
        104: agiTankStats,
        103: agiDPSStats,
        102: intDPSStats,
        250: strTankStats,
        251: strDPSStats,
        252: strDPSStats,
        65: healerStats,
        66: strTankStats,
        70: strDPSStats,
        256: healerStats,
        257: healerStats,
        258: intDPSStats,
        259: agiDPSStats,
        260: agiDPSStats,
        261: agiDPSStats,
        262: intDPSStats,
        263: agiDPSStats,
        264: healerStats,
        265: intDPSStats,
        266: intDPSStats,
        267: intDPSStats,
        71: strDPSStats,
        72: strDPSStats,
        73: strTankStats,
    };
    return map[specId];
}

const strTankStats = {
    primary: [
        {
            label: "HEALTH",
            iconName: "health",
            statName: "healthValue",
        },
        {
            label: "STAMINA",
            iconName: "stamina",
            statName: "effective_stamina",
        },
        {
            label: "STRENGTH",
            iconName: "strength",
            statName: "effective_strength",
        },
        {
            label: "ATTACK POWER",
            iconName: "attackpower",
            statName: "bonus_strength_attackpower",
        },
    ],
    secondary: [
        {
            label: "CRIT",
            iconName: "crit",
            statName: "melee_crit_rating",
            percentName: "melee_crit",
        },
        {
            label: "MASTERY",
            iconName: "mastery",
            statName: "mastery_rating",
            percentName: "mastery_pct",
        },
        {
            label: "HASTE",
            iconName: "haste",
            statName: "spell_haste_rating",
        },
    ],
};

const agiTankStats = {
    primary: [
        {
            label: "HEALTH",
            iconName: "health",
            statName: "healthValue",
        },
        {
            label: "STAMINA",
            iconName: "stamina",
            statName: "effective_stamina",
        },
        {
            label: "AGILITY",
            iconName: "agility",
            statName: "effective_agility",
        },
    ],
    secondary: [
        {
            label: "CRIT",
            iconName: "crit",
            statName: "melee_crit_rating",
            percentName: "melee_crit",
        },
        {
            label: "MASTERY",
            iconName: "mastery",
            statName: "mastery_rating",
            percentName: "mastery_pct",
        },
        {
            label: "HASTE",
            iconName: "haste",
            statName: "spell_haste_rating",
        },
    ],
};

const strDPSStats = {
    primary: [
        {
            label: "HEALTH",
            iconName: "health",
            statName: "healthValue",
        },
        {
            label: "STRENGTH",
            iconName: "strength",
            statName: "effective_strength",
        },
        {
            label: "ATTACK POWER",
            iconName: "attackpower",
            statName: "bonus_strength_attackpower",
        },
    ],
    secondary: [
        {
            label: "CRIT",
            iconName: "crit",
            statName: "melee_crit_rating",
            percentName: "melee_crit",
        },
        {
            label: "MASTERY",
            iconName: "mastery",
            statName: "mastery_rating",
            percentName: "mastery_pct",
        },
        {
            label: "HASTE",
            iconName: "haste",
            statName: "spell_haste_rating",
        },
    ],
};

const agiDPSStats = {
    primary: [
        {
            label: "HEALTH",
            iconName: "health",
            statName: "healthValue",
        },
        {
            label: "AGILITY",
            iconName: "agility",
            statName: "effective_agility",
        },
        {
            label: "ATTACK POWER",
            iconName: "attackpower",
            statName: "bonus_agility_attackpower",
        },
    ],
    secondary: [
        {
            label: "CRIT",
            iconName: "crit",
            statName: "melee_crit_rating",
            percentName: "melee_crit",
        },
        {
            label: "MASTERY",
            iconName: "mastery",
            statName: "mastery_rating",
            percentName: "mastery_pct",
        },
        {
            label: "HASTE",
            iconName: "haste",
            statName: "spell_haste_rating",
        },
    ],
};

const intDPSStats = {
    primary: [
        {
            label: "HEALTH",
            iconName: "health",
            statName: "healthValue",
        },
        {
            label: "INTELLECT",
            iconName: "intellect",
            statName: "effective_intellect",
        },
        {
            label: "SPELL POWER",
            iconName: "spellpower",
            statName: "heal_bonus",
        },
    ],
    secondary: [
        {
            label: "CRIT",
            iconName: "crit",
            statName: "spell_crit_rating",
            percentName: "spell_crit_pct",
        },
        {
            label: "MASTERY",
            iconName: "mastery",
            statName: "mastery_rating",
            percentName: "mastery_pct",
        },
        {
            label: "HASTE",
            iconName: "haste",
            statName: "spell_haste_rating",
        },
    ],
};

const healerStats = {
    primary: [
        {
            label: "HEALTH",
            iconName: "health",
            statName: "healthValue",
        },
        {
            label: "INTELLECT",
            iconName: "intellect",
            statName: "effective_intellect",
        },
        {
            label: "SPIRIT",
            iconName: "spirit",
            statName: "effective_spirit",
        },
        {
            label: "SPELL POWER",
            iconName: "spellpower",
            statName: "heal_bonus",
        },
    ],
    secondary: [
        {
            label: "CRIT",
            iconName: "crit",
            statName: "spell_crit_rating",
            percentName: "spell_crit_pct",
        },
        {
            label: "MASTERY",
            iconName: "mastery",
            statName: "mastery_rating",
            percentName: "mastery_pct",
        },
        {
            label: "HASTE",
            iconName: "haste",
            statName: "spell_haste_rating",
        },
    ],
};
