export function getProfessionsFromCharData(charData) {
    let professions = [];
    if (charData.primary_trade_skill_1) {
        professions.push(charData.primary_trade_skill_1);
    }
    if (charData.primary_trade_skill_2) {
        professions.push(charData.primary_trade_skill_2);
    }
    return professions;
}

export function dataFromCharData(charData) {
    return {
        name: charData.name.toLowerCase(),
        realm: charData.realm,
        title: charData.title,
        faction: charData.faction_string_class === "Alliance" ? 0 : 1,
        class: charData.class,
        specName: charData["treeName_" + charData.activeSpec],
        guild: charData.guildName,
        ilvl: charData.avgitemlevel,
        lvl: charData.level,
        race: `${charData.race},${charData.gender}`,
        items: charData.characterItems,
        professions: getProfessionsFromCharData(charData),
        stats: { ...charData.characterStat, healthValue: charData.healthValue },
    };
}
