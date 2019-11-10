export function sortGuilds(guilds, { by, direction }) {
    let first = 1;
    let second = -1;
    if (direction === "asc") {
        first = -1;
        second = 1;
    }

    if (by === "completion") {
        return guilds.sort((a, b) => (a.rank < b.rank ? first : second));
    }

    return guilds.sort((a, b) => {
        if (a[by] === b[by]) {
            return a.rank > b.rank;
        } else {
            return a[by] < b[by] ? first : second;
        }
    });
}
