import { shortRealmToFull } from "../../helpers";

export function filterChars(filter, chars, specs) {
    if (!chars) return chars;
    return chars.filter(char => {
        if (filter.class !== "" && char.class !== Number(filter.class)) {
            return false;
        }

        if (filter.faction !== "" && char.f !== Number(filter.faction)) {
            return false;
        }

        if (
            filter.realm !== "" &&
            shortRealmToFull(char.realm) !== filter.realm
        ) {
            return false;
        }

        if (filter.role !== "" && specs[char.spec].role !== filter.role) {
            return false;
        }

        return true;
    });
}
