export function sortMembers(members, { by, direction }) {
    let first = 1;
    let second = -1;
    if (direction === "asc") {
        first = -1;
        second = 1;
    }
    return members.sort((a, b) => (a[by] < b[by] ? first : second));
}
