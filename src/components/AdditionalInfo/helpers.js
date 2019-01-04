export function whenWas(date) {
    return Math.round((new Date().getTime() / 1000 - Number(date)) / 3600);
}
