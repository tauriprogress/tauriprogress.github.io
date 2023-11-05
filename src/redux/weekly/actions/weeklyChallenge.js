export const WEEKLY_CHALLENGE_FETCH = "WEEKLY_CHALLENGE_FETCH";
export const WEEKLY_CHALLENGE_LOADING_SET = "WEEKLY_CHALLENGE_LOADING_SET";
export const WEEKLY_CHALLENGE_FILL = "WEEKLY_CHALLENGE_FILL";
export const WEEKLY_CHALLENGE_ERROR_SET = "WEEKLY_CHALLENGE_ERROR_SET";

export function weeklyChallengeFetch(payload) {
    return {
        type: WEEKLY_CHALLENGE_FETCH,
        payload,
    };
}

export function weeklyChallengeSetLoading(payload) {
    return {
        type: WEEKLY_CHALLENGE_LOADING_SET,
        payload,
    };
}

export function weeklyChallengeFill(payload) {
    return {
        type: WEEKLY_CHALLENGE_FILL,
        payload,
    };
}

export function weeklyChallengeSetError(payload) {
    return {
        type: WEEKLY_CHALLENGE_ERROR_SET,
        payload,
    };
}
