export function convertTime(time) {
    let minutes = Math.round((new Date().getTime() / 1000 - Number(time)) / 60);
    if (minutes < 60) return `${minutes} minutes`;
    return `${Math.round(minutes / 60)} hours`;
}
