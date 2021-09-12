export const RAIDBOSS_CHARACTERS_FETCH = "RAIDBOSS_CHARACTERS_FETCH";
export const RAIDBOSS_CHARACTERS_LOADING_SET =
    "RAIDBOSS_CHARACTERS_LOADING_SET";
export const RAIDBOSS_CHARACTERS_FILL = "RAIDBOSS_CHARACTERS_FILL";
export const RAIDBOSS_CHARACTERS_ERROR_SET = "RAIDBOSS_CHARACTERS_ERROR_SET";

export function raidBossCharactersFetch(payload) {
    return {
        type: RAIDBOSS_CHARACTERS_FETCH,
        payload
    };
}

export function raidBossCharactersSetLoading(payload) {
    return {
        type: RAIDBOSS_CHARACTERS_LOADING_SET,
        payload
    };
}

export function raidBossCharactersFill(payload) {
    return {
        type: RAIDBOSS_CHARACTERS_FILL,
        payload
    };
}

export function raidBossCharactersSetError(payload) {
    return {
        type: RAIDBOSS_CHARACTERS_ERROR_SET,
        payload
    };
}
