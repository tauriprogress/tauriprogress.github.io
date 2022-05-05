export function sortMembers(members, { by, direction }) {
    let first = 1;
    let second = -1;
    if (direction === "asc") {
        first = -1;
        second = 1;
    }
    return members.sort((a, b) => (a[by] < b[by] ? first : second));
}

export function isSameLog(logId, realm, log) {
    return (
        !!log &&
        Number(log.log_id) === Number(logId) &&
        String(log.realm) === String(realm)
    );
}

export function isRegularLog(log) {
    for (const member of log.members) {
        if (!member.talents || !member.trinket_0 || !member.trinket_1)
            return false;
    }
    return true;
}
