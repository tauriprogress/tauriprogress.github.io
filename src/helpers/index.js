import { specs } from "tauriprogress-constants";

export function getNestedObjectValue(obj, keys) {
    let currentKey = keys[0];

    if (keys.length === 1) {
        return obj.hasOwnProperty(currentKey) ? obj[currentKey] : false;
    } else {
        return obj.hasOwnProperty(currentKey)
            ? getNestedObjectValue(obj[currentKey], keys.slice(1, keys.length))
            : false;
    }
}

export function convertMinutes(minutes) {
    if (minutes < 60) return `${minutes} minutes`;
    return `${Math.round(minutes / 60)} hours`;
}

export function convertFightTime(time) {
    let mins = Math.floor(time / 1000 / 60);
    let remainingSecs = Math.floor(time / 1000) - mins * 60;

    if (remainingSecs < 10) {
        remainingSecs = "0" + remainingSecs;
    }
    return `${mins}:${remainingSecs}`;
}

export function talentTreeToImage(fullSpecName) {
    const regexp = new RegExp(fullSpecName, "ig");
    for (let specKey in specs) {
        if (regexp.exec(specs[specKey].label)) {
            const imageName = `${specs[specKey].image}.jpg`;
            return require(`../assets/specs/${imageName}`);
        }
    }

    return false;
}

export function getSpecImg(imageName) {
    return require(`../assets/specs/${imageName}.jpg`);
}

export function shortNumber(number) {
    if (number < 1000) {
        return Math.round(number);
    } else if (number < 1000 * 1000) {
        return `${(Math.round(number / 100) / 10).toFixed(1)}K`;
    } else {
        return `${(Math.round(number / 10000) / 100).toFixed(1)}M`;
    }
}
