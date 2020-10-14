export function fetchCharacterData(payload) {
    return {
        type: "CHARACTER_DATA_FETCH",
        payload
    };
}

export function setCharacterDataError(payload) {
    return {
        type: "CHARACTER_DATA_SET_ERROR",
        payload
    };
}

export function setCharacterDataLoading(payload) {
    return {
        type: "CHARACTER_DATA_LOADING",
        payload
    };
}

export function fillCharacterData(payload) {
    return {
        type: "CHARACTER_DATA_FILL",
        payload
    };
}

export function fetchCharacterProgression(payload) {
    return {
        type: "CHARACTER_PROGRESSION_FETCH",
        payload
    };
}

export function selectCharacterProgressionRaid(payload) {
    return {
        type: "CHARACTER_PROGRESSION_SELECT_RAID",
        payload
    };
}

export function setCharacterProgressionError(payload) {
    return {
        type: "CHARACTER_PROGRESSION_SET_ERROR",
        payload
    };
}

export function setCharacterProgressionLoading(payload) {
    return {
        type: "CHARACTER_PROGRESSION_LOADING",
        payload
    };
}

export function fillCharacterProgression(payload) {
    return {
        type: "CHARACTER_PROGRESSION_FILL",
        payload
    };
}

export function setCharacterRecentKillsLoading(payload) {
    return {
        type: "CHARACTER_RECENTKILLS_LOADING",
        payload
    };
}

export function setCharacterRecentKillsError(payload) {
    return {
        type: "CHARACTER_RECENTKILLS_SET_ERROR",
        payload
    };
}

export function fillCharacterRecentKills(payload) {
    return {
        type: "CHARACTER_RECENTKILLS_FILL",
        payload
    };
}

export function fetchCharacterItems(payload) {
    return {
        type: "CHARACTER_ITEMS_FETCH",
        payload
    };
}

export function setCharacterItemsLoading(payload) {
    return {
        type: "CHARACTER_ITEMS_LOADING",
        payload
    };
}

export function setCharacterItemsError(payload) {
    return {
        type: "CHARACTER_ITEMS_SET_ERROR",
        payload
    };
}

export function fillCharacterItems(payload) {
    return {
        type: "CHARACTER_ITEMS_FILL",
        payload
    };
}
