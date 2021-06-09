export function setRaidFilter(filterOptions) {
    return {
        type: "RAID_FILTER_SET",
        payload: filterOptions
    };
}
