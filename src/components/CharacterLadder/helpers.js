export function applyFilter(filter, data) {
    let regex = new RegExp(filter.name, "i");
    return data.filter(dataPoint => {
        if (filter.name !== "" && !regex.test(dataPoint.name)) {
            return false;
        }

        if (filter.class !== "" && dataPoint.class !== Number(filter.class)) {
            return false;
        }

        if (filter.spec !== "" && dataPoint.spec.id !== Number(filter.spec)) {
            return false;
        }

        return true;
    });
}
