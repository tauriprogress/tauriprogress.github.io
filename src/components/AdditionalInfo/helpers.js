export function convertMinutes(minutes) {
    if (minutes < 60) return `${minutes} minutes`;
    return `${Math.round(minutes / 60)} hours`;
}
