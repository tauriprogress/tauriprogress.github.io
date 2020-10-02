export function setRaidFilter(filterOptions) {
    return {
        type: "RAID_FILTER_SET",
        payload: filterOptions
    };
}

export function resetRaidFilter() {
    return {
        type: "RAID_FILTER_RESET"
    };
}
