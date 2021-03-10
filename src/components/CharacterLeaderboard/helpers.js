import { shortRealmToFull } from "../../helpers";

export function filterChars(filter, chars) {
    if (!chars) return chars;
    return chars.filter(char => {
        if (filter.class !== "" && char.class !== Number(filter.class)) {
            return false;
        }

        if (filter.spec !== "" && char.spec !== Number(filter.spec)) {
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

        return true;
    });
}
