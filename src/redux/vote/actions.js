export const WEEKLY_CHALLENGE_VOTE_FETCH = "WEEKLY_CHALLENGE_VOTE_FETCH";
export const WEEKLY_CHALLENGE_VOTE_LOADING_SET =
    "WEEKLY_CHALLENGE_VOTE_LOADING_SET";
export const WEEKLY_CHALLENGE_VOTE_SET = "WEEKLY_CHALLENGE_VOTE_SET";
export const WEEKLY_CHALLENGE_VOTE_SET_ERROR =
    "WEEKLY_CHALLENGE_VOTE_SET_ERROR";
export const WEEKLY_CHALLENGE_VOTE_FOR_BOSS = "WEEKLY_CHALLENGE_VOTE_FOR_BOSS";

export function weeklyChallengeVoteFetch(payload) {
    return {
        type: WEEKLY_CHALLENGE_VOTE_FETCH,
        payload,
    };
}

export function weeklyChallengeVoteSetLoading(payload) {
    return {
        type: WEEKLY_CHALLENGE_VOTE_LOADING_SET,
        payload,
    };
}

export function weeklyChallengeVoteSet(payload) {
    return {
        type: WEEKLY_CHALLENGE_VOTE_SET,
        payload,
    };
}

export function weeklyChallengeVoteSetError(payload) {
    return {
        type: WEEKLY_CHALLENGE_VOTE_SET_ERROR,
        payload,
    };
}

export function weeklyChallengeVoteForBoss(payload) {
    return {
        type: WEEKLY_CHALLENGE_VOTE_FOR_BOSS,
        payload,
    };
}
