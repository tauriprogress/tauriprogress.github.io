export const RAIDFILTER_SET = "RAIDFILTER_SET";

export function setRaidFilter(filterOptions) {
    return {
        type: RAIDFILTER_SET,
        payload: filterOptions
    };
}
