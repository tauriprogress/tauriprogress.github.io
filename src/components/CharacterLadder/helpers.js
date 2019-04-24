import { specs } from "tauriprogress-constants";

export function filterChars(filter, chars) {
    if (!chars) return chars;
    let regex = new RegExp(filter.name, "i");
    return chars.filter(char => {
        if (filter.name !== "" && !regex.test(char.name)) {
            return false;
        }

        if (filter.class !== "" && char.class !== Number(filter.class)) {
            return false;
        }

        if (filter.spec !== "" && char.spec !== Number(filter.spec)) {
            return false;
        }

        if (filter.faction !== "" && char.faction !== Number(filter.faction)) {
            return false;
        }

        if (filter.realm !== "" && char.realm !== filter.realm) {
            return false;
        }

        if (filter.role !== "" && specs[char.spec].role !== filter.role) {
            return false;
        }

        return true;
    });
}
