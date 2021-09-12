export const RAIDBOSS_PAGE_SET = "RAIDBOSS_PAGE_SET";

export function raidBossPageSet(payload) {
    return {
        type: RAIDBOSS_PAGE_SET,
        payload
    };
}
