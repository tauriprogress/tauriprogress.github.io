export function guildLoadingSelector(state) {
    return state.guild.loading;
}

export function guildProgressionFilterSelector(state) {
    return state.guild.progressionFilter;
}

export function guildProgressionSelector(state) {
    return state.guild.data.progression;
}

export function guildRaidDaysSelector(state) {
    return state.guild.data.raidDays;
}

export function guildRealmSelector(state) {
    return state.guild.data.realm;
}

export function guildProgressionLatestKillsSelector(state) {
    return state.guild.data.progression.latestKills;
}

export function guildMembersSelector(state) {
    return state.guild.data.members;
}

export function guildRanksSelector(state) {
    return state.guild.data.ranks;
}

export function guildNameSelector(state) {
    return state.guild.data.name;
}

export function guildFactionSelector(state) {
    return state.guild.data.f;
}

export function guildMembersCountSelector(state) {
    return state.guild.data.members.length;
}

export function guildDataExistsSelector(state) {
    return !!state.guild.data;
}

export function guildErrorSelector(state) {
    return state.guild.error;
}

export function guildOldGuildNameSelector(state) {
    return state.guild.guildName;
}

export function guildOldRealmSelector(state) {
    return state.guild.realm;
}
