export function characterLeaderboardDataSelector(state) {
    return state.characterLeaderboard.data;
}

export function characterLeaderboardDataExistsSelector(state) {
    return !!state.characterLeaderboard.data;
}

export function characterLeaderboardFilterSelector(state) {
    return state.characterLeaderboard.filter;
}

export function characterLeaderboardTabSelector(state) {
    return state.characterLeaderboard.selectedTab;
}

export function characterLeaderboardErrorSelector(state) {
    return state.characterLeaderboard.error;
}

export function characterLeaderboardLoadingSelector(state) {
    return state.characterLeaderboard.loading;
}

export function characterLeaderboardItemCountSelector(state) {
    return state.characterLeaderboard.itemCount;
}

export function characterLeaderboardPageSelector(state) {
    return state.characterLeaderboard.page;
}
