import { shortRealms } from "tauriprogress-constants";

export function cleanFilters(filters) {
    let newFilters = {};

    for (let [key, value] of Object.entries(filters)) {
        if (value !== "") {
            if (key === "class" || key === "spec" || key === "faction") {
                newFilters[key] = Number(value);
            } else if (key === "realm") {
                newFilters[key] = shortRealms[value];
            } else {
                newFilters[key] = value;
            }
        }
    }

    return newFilters;
}
