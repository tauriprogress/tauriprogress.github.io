export function fetchRaidBossCharacters(payload) {
    return {
        type: "RAIDBOSS_CHARACTERS_FETCH",
        payload
    };
}

export function fillRaidBossCharacters(payload) {
    return {
        type: "RAIDBOSS_CHARACTERS_FILL",
        payload
    };
}

export function setRaidBossCharactersLoading(payload) {
    return {
        type: "RAIDBOSS_CHARACTERS_LOADING",
        payload
    };
}

export function setRaidBossCharactersError(payload) {
    return {
        type: "RAIDBOSS_CHARACTERS_SET_ERROR",
        payload
    };
}
