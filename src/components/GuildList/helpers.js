export function filterGuildList(filter, guildList) {
    return guildList.filter(guild => {
        if (
            filter.faction !== "" &&
            guild.gFaction !== Number(filter.faction)
        ) {
            return false;
        }

        if (filter.realm !== "" && guild.realm !== filter.realm) {
            return false;
        }

        if (
            filter.difficulty !== "" &&
            !guild.progression.completion[filter.difficulty]
        ) {
            return false;
        }

        return true;
    });
}
