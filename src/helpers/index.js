import { specs, characterClasses } from "tauriprogress-constants";

const months = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec"
};

export const days = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday"
};

export function classImg(classId) {
    const imageName = characterClasses[classId];
    return require(`../assets/classes/${imageName}.jpg`);
}

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

export function addNestedObjectValue(obj, keys, value) {
    let currentKey = keys[0];
    if (currentKey !== undefined) {
        obj[currentKey] = addNestedObjectValue(
            obj.hasOwnProperty(currentKey) ? obj[currentKey] : {},
            keys.slice(1, keys.length),
            value
        );
        return obj;
    } else {
        return value !== undefined ? value : {};
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

export function getLatestWednesday(date) {
    const currentDate = date ? date : new Date();
    const currentDay = currentDate.getDay();

    const wednesdayDaysAgo = (currentDay < 3 ? currentDay + 7 : currentDay) - 3;

    let lastWednesdayDate = currentDate.getDate() - wednesdayDaysAgo;
    if (currentDay === 3 && currentDate.getHours() < 9) {
        lastWednesdayDate -= 7;
    }

    return new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        lastWednesdayDate,
        10
    );
}

export function dateToString(date) {
    let day = date.getDate();

    return `${day < 10 ? `${day}` : day} ${
        months[date.getMonth()]
    } ${date.getFullYear()}`;
}

export function dateTextByWeek(weeksAgo) {
    if (weeksAgo === 0) {
        return "This week";
    } else if (weeksAgo === 1) {
        return "Last week";
    } else if (weeksAgo < 5) {
        return `${weeksAgo} weeks ago`;
    } else if (weeksAgo < 9) {
        return "A month ago";
    } else if (weeksAgo < 56) {
        return `${Math.floor(weeksAgo / 4)} months ago`;
    } else if (weeksAgo < 56 * 2) {
        return "A year ago";
    } else {
        return `${Math.floor(weeksAgo / 56)} years ago`;
    }
}

export function dateTextHours(date) {
    return `${("0" + date.getHours()).slice(-2)}:${(
        "0" + date.getMinutes()
    ).slice(-2)}`;
}
