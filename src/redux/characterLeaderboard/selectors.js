export function characterLeaderboardDataSelector(state, dataId) {
    return state.characterLeaderboard.data[dataId];
}

export function characterLeaderboardDataExistsSelector(state, dataId) {
    return !!state.characterLeaderboard.data[dataId];
}

export function characterLeaderboardFilterSelector(state) {
    return state.characterLeaderboard.filter;
}

export function characterLeaderboardTabSelector(state) {
    return state.characterLeaderboard.selectedTab;
}
