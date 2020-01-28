import { guildActivityBoundary } from "../../helpers";

export function filterGuildList(filter, guildList) {
    const timeBoundary = guildActivityBoundary();

    return guildList.filter(guild => {
        if (
            filter.faction !== "" &&
            guild.gFaction !== Number(filter.faction)
        ) {
            return false;
        }

        if (filter.realm !== "" && guild.realm !== filter.realm) {
            return false;
        }

        if (
            filter.difficulty !== "" &&
            !guild.progression.completion[filter.difficulty]
        ) {
            return false;
        }

        if (filter.activity !== "") {
            if (typeof filter.activity === "number") {
                if (
                    !guild.activity[filter.activity] ||
                    timeBoundary > guild.activity[filter.activity] * 1000
                ) {
                    return false;
                }
            } else {
                let isActive = false;

                for (let difficulty in guild.activity) {
                    if (timeBoundary < guild.activity[difficulty] * 1000) {
                        isActive = true;
                    }
                }

                return isActive === filter.activity;
            }
        }

        return true;
    });
}
