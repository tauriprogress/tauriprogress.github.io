export function guildLeaderboardEntireSelector(state) {
    return state.guildLeaderboard;
}

export function guildLeaderboardDataExistsSelector(state) {
    return !!state.guildLeaderboard.data;
}

export function guildLeaderboardRealmGroupSelector(state) {
    return state.guildLeaderboard.realmGroup;
}

export function guildLeaderboardLoadingSelector(state) {
    return state.guildLeaderboard.loading;
}

export function guildLeaderboardFilterSelector(state) {
    return state.guildLeaderboard.filter;
}

export function guildLeaderboardSelectedTabSelector(state) {
    return state.guildLeaderboard.selectedTab;
}
