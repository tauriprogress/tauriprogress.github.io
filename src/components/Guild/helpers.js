export function filterMembers(members, filter) {
    if (!members) return members;
    let regex = new RegExp(filter.name, "i");

    return members.filter(member => {
        if (filter.name !== "" && !regex.test(member.name)) {
            return false;
        }

        if (filter.class !== "" && member.class !== Number(filter.class)) {
            return false;
        }

        if (filter.rank_name !== "" && member.rank_name !== filter.rank_name) {
            return false;
        }

        return true;
    });
}
