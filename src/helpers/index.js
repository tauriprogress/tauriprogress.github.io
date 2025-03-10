import queryString from "query-string";
import constants, {
    shortRealms,
    characterRaceNames,
    characterSpecClass,
} from "tauriprogress-constants";

import { characterClassNames } from "tauriprogress-constants/build/tauri";

export function getDifficultiesFromRaids(raids) {
    return raids.reduce((acc, raid) => {
        for (const difficulty of raid.difficulties) {
            if (!acc.includes(difficulty)) {
                acc.push(difficulty);
            }
        }
        return acc;
    }, []);
}

export function getClassColor(classOrSpec, classColors) {
    if (!classOrSpec) return "inherit";

    let characterClass = classOrSpec;
    if (!isClassId(characterClass)) {
        characterClass = characterSpecClass[characterClass];
    }

    return classColors[characterClass].text;
}

export function getClassOptions(characterClassNames, classColors) {
    let classOptions = [];
    for (let classId in characterClassNames) {
        classOptions.push({
            imageSrc: getClassImg(classId),
            value: classId,
            name: characterClassNames[classId],
            style: {
                color: classColors[classId].text,
            },
        });
    }
    return classOptions;
}

export function getClassAndSpecOptions(
    characterClassNames,
    characterClassSpecs,
    specs,
    classColors
) {
    let options = [];
    for (let classId in characterClassNames) {
        options.push({
            imageSrc: getClassImg(Number(classId)),
            divider: true,
            value: Number(classId),
            name: characterClassNames[classId],
            style: {
                color: classColors[classId].text,
            },
        });

        for (const specId of characterClassSpecs[classId]) {
            if (!specs[specId]) continue;
            options.push({
                imageSrc: getSpecImg(specs[specId].image),
                indented: true,
                value: specId,
                name: specs[specId].label,
                style: {
                    color: classColors[classId].text,
                },
            });
        }
    }

    return options;
}

export function getSpecOptions(filter, specs, classColors) {
    let specOptions = [];
    const classColor = filter.class
        ? classColors[filter.class].text
        : "inherit";
    for (let specId in characterSpecClass) {
        if (characterSpecClass[specId] === Number(filter.class)) {
            if (specs[specId]) {
                specOptions.push({
                    value: specId,
                    name: specs[specId].label,
                    style: {
                        color: classColor,
                    },
                });
            }
        }
    }

    return specOptions;
}

export function getRealmOptions(realmNames) {
    let realmOptions = [];
    for (let realm of realmNames) {
        realmOptions.push({
            value: realm,
            name: realm,
        });
    }

    return realmOptions;
}

export function getRealmNames(realms) {
    let realmNames = [];
    for (let realmKey in realms) {
        realmNames.push(realms[realmKey]);
    }
    return realmNames;
}

const socketInfo = {
    1: {
        icon: 1,
        desc: "Meta Socket",
    },
    2: {
        icon: 2,
        desc: "Red Socket",
    },
    4: {
        icon: 4,
        desc: "Yellow Socket",
    },
    8: {
        icon: 8,
        desc: "Blue Socket",
    },
    16: {
        icon: "sha",
        desc: "Sha socket",
    },
};

export const gemColorsToSockets = {
    1: { matches: { 0: true, 1: true } },
    2: { matches: { 0: true, 2: true } },
    4: { matches: { 0: true, 4: true } },
    8: { matches: { 0: true, 8: true } },
    16: { matches: { 16: true } },
    14: { matches: { 0: true, 8: true, 4: true, 2: true } },
    12: { matches: { 0: true, 8: true, 4: true } },
    10: { matches: { 0: true, 8: true, 2: true } },
    6: { matches: { 0: true, 4: true, 2: true } },
};

export const days = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
};

export const hours = new Array(24).fill(0).map((value, index) => {
    if (index === 0) {
        return "12 am";
    } else if (index === 12) {
        return "12 pm";
    } else {
        return index > 12 ? `${index - 12} pm` : `${index} am`;
    }
});

export function categorizedLogDates(logs) {
    const currentTime = new Date().getTime();
    const week = 1000 * 60 * 60 * 24 * 7;

    let dates = {};
    let dateArray = [];

    for (let log of logs) {
        const logDate = new Date(log.date * 1000);
        const latestWednesDay = getLatestWednesday(logDate);
        const weeksAgo = Math.floor(
            (currentTime - latestWednesDay.getTime()) / week
        );
        const dateText = dateTextByWeek(weeksAgo);

        if (!dates[dateText])
            dates[dateText] = {
                text: dateText,
                kills: [],
            };

        dates[dateText].kills.push({
            ...log,
            dateText: dateToString(logDate),
            dateDay: days[logDate.getDay()],
            dateHours: dateTextHours(logDate),
        });
    }

    for (let date in dates) {
        dateArray.push(dates[date]);
    }

    return dateArray;
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

export function convertFightLength(
    time,
    options = { leadingZeroSecond: true, leadingZeroMinute: true }
) {
    let hours = Math.floor(time / 1000 / 60 / 60);
    let mins = Math.floor(time / 1000 / 60) - hours * 60;
    let remainingSecs = Math.floor(time / 1000) - (mins * 60 + hours * 60 * 60);

    if (options.leadingZeroSecond && remainingSecs < 10) {
        remainingSecs = "0" + remainingSecs;
    }

    if (options.leadingZeroMinute && mins < 10) {
        mins = "0" + mins;
    }

    if (hours) {
        return `${hours}:${mins}:${remainingSecs}`;
    }
    return `${mins}:${remainingSecs}`;
}

export function talentTreeToSpec(fullSpecName, specs) {
    const regexp = new RegExp(fullSpecName, "ig");
    for (let specKey in specs) {
        if (regexp.exec(specs[specKey].label)) {
            return Number(specKey);
        }
    }

    return false;
}

export function getClassImg(classId) {
    return `/assets/classes/${classId}.jpg`;
}

export function getRaidImg(imageName) {
    return `/assets/raids/${imageName}`;
}

export function getBossImg(bossName, size = "s") {
    return `/assets/bosses/${bossName}/${size}.webp`;
}

export function getSpecImg(imageName) {
    return `/assets/specs/${imageName}.png`;
}

export function getRaceImg(imageName) {
    return `/assets/races/${imageName}.jpg`;
}

export function getFactionImg(faction) {
    return `/assets/faction/${!faction ? "alliance" : "horde"}.png`;
}

export function getRoleImg(role) {
    return `/assets/roles/${role}.svg`;
}

export function getExpansionImg(expansion) {
    return `/assets/expansionIcon/${expansion}.png`;
}

export function getClassBackgroundImg(classId) {
    return `/assets/backgrounds/classes/${classId}.webp`;
}

export function getInventorySlotImg(slotName) {
    return `/assets/inventoryslots/${slotName}.webp`;
}

export function getProfessionImg(professionName) {
    return `/assets/professions/${professionName}.png`;
}

export function getStatImg(professionName) {
    return `/assets/stats/${professionName}.svg`;
}

export function getRaceName(race) {
    const [raceId, genderId] = race.split(",");
    return `${characterRaceNames[raceId]} ${
        Number(genderId) ? "Female" : "Male"
    }`;
}

export function shortNumber(number) {
    if (number < 1000) {
        return Math.round(number);
    } else if (number < 1000 * 1000) {
        return `${(Math.round(number / 100) / 10).toFixed(1)}K`;
    } else {
        return `${(Math.round(number / 10000) / 100).toFixed(2)}M`;
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
    return `${date.getFullYear()}-${paddingZero(
        date.getMonth() + 1,
        2
    )}-${paddingZero(date.getDate(), 2)}`;
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

export function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getSocketInfo(type) {
    if (socketInfo[type]) {
        return {
            ...socketInfo[type],
            icon: `/assets/tooltip/${socketInfo[type].icon}.png`,
        };
    }

    return {
        icon: false,
    };
}

export function guildActivityBoundary() {
    const week = 1000 * 60 * 60 * 24 * 7;
    return getLatestWednesday(new Date(new Date().getTime() - week * 2));
}

export function shiftDays(day) {
    return day === 6 ? 0 : day + 1;
}

export function colorWeight(current, max) {
    const percent = Math.floor((current / max) * 100);
    if (percent < 20 && percent >= 1) {
        return 1;
    }

    return Math.floor(percent / 20) * 20;
}

export function validRealmGroup(realmGroup) {
    return constants.realmGroups.includes(realmGroup);
}

export function validRealm(realm) {
    for (let currentRealmName in shortRealms) {
        if (currentRealmName === realm) {
            return true;
        }
    }

    return false;
}

export function validClass(classId, realmGroup) {
    return !!constants[realmGroup].characterClassNames[classId];
}

export function isClassId(classId) {
    return !!characterClassNames[classId];
}

export function validSpec(specId, realmGroup) {
    return !!constants[realmGroup].specs[specId];
}

export function validDifficulty(difficulty, realmGroup) {
    for (const raid of constants[realmGroup].currentContent.raids) {
        if (raid.difficulties.includes(difficulty)) {
            return true;
        }
    }
    return false;
}

export function isRaidName(raidName) {
    for (const realmGroup of constants.realmGroups) {
        for (let raid of constants[realmGroup].currentContent.raids) {
            if (raid.name === raidName) {
                return true;
            }
        }
    }

    return false;
}

export function validRaidName(raidName, realmGroup) {
    for (let raid of constants[realmGroup].currentContent.raids) {
        if (raid.name === raidName) {
            return true;
        }
    }

    return false;
}

export function validRaidNameOfEnv(raidName, realmGroup, isSeasonal) {
    if (isSeasonal) {
        if (constants[realmGroup].currentContent.raids[0].name === raidName) {
            return true;
        }

        return false;
    }

    for (let raid of constants[realmGroup].currentContent.raids) {
        if (raid.name === raidName) {
            return true;
        }
    }

    return false;
}

export function getRealmGroupOfRaidName(raidName) {
    for (const realmGroup of constants.realmGroups) {
        for (let raid of constants[realmGroup].currentContent.raids) {
            if (raid.name === raidName) {
                return realmGroup;
            }
        }
    }

    return false;
}

export function validRole(role) {
    return role === "damage" || role === "heal" || role === "tank";
}

export function validFaction(faction) {
    return faction === 0 || faction === 1;
}

export function realmOfRealmGroup(realm, realmsOfGroup) {
    for (let key in realmsOfGroup) {
        if (realmsOfGroup[key] === realm) {
            return true;
        }
    }

    return false;
}

export function capitalize(string) {
    const capitalized = string.charAt(0).toUpperCase() + string.slice(1);

    return capitalized.length === string.length ? capitalized : string;
}

export function paddingZero(number, padding) {
    return String(number).padStart(padding, "0");
}

export function shortRealmToFull(shortRealmName) {
    for (const realmName in shortRealms) {
        if (shortRealms[realmName] === shortRealmName) {
            return realmName;
        }
    }

    return false;
}

export function getDefaultDifficulty(realmGroup) {
    return constants[realmGroup].defaultDifficulty;
}

export function getDefaultRaidName(realmGroup) {
    return constants[realmGroup].currentContent.raids[0].name;
}

export function raidNameToId(raidName) {
    for (const realmGroup of constants.realmGroups) {
        for (const raid of constants[realmGroup].currentContent.raids) {
            if (raid.name === raidName) {
                return raid.id;
            }
        }
    }

    return false;
}

export function readFiltersFromUrl(realmGroup, filterNames, location) {
    let filter = {};
    const defaultDifficulty = getDefaultDifficulty(realmGroup);

    const filterFromUrl = queryString.parse(
        location ? location.search : window.location.search
    );

    for (let filterName of filterNames) {
        switch (filterName) {
            case "raid":
                filter = {
                    ...filter,
                    raid: validRaidName(filterFromUrl.raid, realmGroup)
                        ? filterFromUrl.raid
                        : constants[realmGroup].currentContent.name,
                };

                break;

            case "difficulty":
                filter = {
                    ...filter,
                    difficulty: validDifficulty(
                        Number(filterFromUrl.difficulty),
                        realmGroup
                    )
                        ? Number(filterFromUrl.difficulty)
                        : defaultDifficulty,
                };

                break;

            case "faction":
                filter = {
                    ...filter,
                    faction:
                        filterFromUrl.faction !== "" &&
                        validFaction(Number(filterFromUrl.faction))
                            ? Number(filterFromUrl.faction)
                            : "",
                };

                break;

            case "class":
                filter = {
                    ...filter,
                    class:
                        validClass(filterFromUrl.class, realmGroup) ||
                        validSpec(filterFromUrl.class, realmGroup)
                            ? Number(filterFromUrl.class)
                            : "",
                };

                break;

            case "role":
                filter = {
                    ...filter,
                    role: validRole(filterFromUrl.role)
                        ? filterFromUrl.role
                        : "",
                };

                break;

            case "realm":
                filter = {
                    ...filter,
                    realm: validRealm(filterFromUrl.realm, realmGroup)
                        ? filterFromUrl.realm
                        : "",
                };

                break;
            default:
                continue;
        }
    }

    return filter;
}

export function readTabFromUrl(lowest, highest, location) {
    const filterFromUrl = queryString.parse(
        location ? location.search : window.location.search
    );

    return filterFromUrl.tab
        ? Number(filterFromUrl.tab) >= lowest &&
          Number(filterFromUrl.tab) <= highest
            ? Number(filterFromUrl.tab)
            : lowest
        : lowest;
}

export function isUrlSeasonal() {
    return new RegExp(/^\/seasonal/).test(window.location.pathname);
}

export function isPathSeasonal(pathname) {
    return new RegExp(/^\/seasonal/).test(pathname);
}

export function getSearchQueryString(queries) {
    return queryString.stringify(queries);
}

export function getDataSpecificationString(specifications) {
    return `${specifications.raidId} ${specifications.bossName} ${specifications.difficulty} ${specifications.combatMetric} ${specifications.realm} ${specifications.faction} ${specifications.class} ${specifications.role} ${specifications.page} ${specifications.pageSize}`;
}

export function getRealmGroupFromLocalStorage() {
    const realmGroup = localStorage.getItem("realmGroup");
    return validRealmGroup(realmGroup) ? realmGroup : "tauri";
}

export function getIngameBossIdFromBossName(bossName, difficulty, realmGroup) {
    for (const raid of constants[realmGroup].currentContent.raids) {
        for (const boss of raid.bosses) {
            if (boss.name === bossName && boss.bossIdOfDifficulty[difficulty]) {
                return boss.bossIdOfDifficulty[difficulty];
            }
        }
    }

    return false;
}

export function cleanFilters(filters) {
    let newFilters = {};

    for (let [key, value] of Object.entries(filters)) {
        if (value !== "") {
            if (key === "class" && !isClassId(value)) {
                newFilters["spec"] = Number(value);
            } else if (key === "class" || key === "faction") {
                newFilters[key] = Number(value);
            } else {
                newFilters[key] = value;
            }
        }
    }

    return newFilters;
}

export function talentsFromString(str, classId, talents) {
    let talentList = [];
    const talentCode = /\d.*/.exec(str)[0];
    for (let i = 0; i < talentCode.length; i++) {
        if (talentCode[i] === ".") {
            talentList.push({
                id: 0,
                label: "Missing",
                image: "",
                row: 0,
                column: 0,
            });
        } else {
            talentList.push(
                talents[classId].find(
                    (element) =>
                        element.row === i &&
                        element.column === Number(talentCode[i])
                )
            );
        }
    }

    return talentList;
}

export function getRealmGroupsMetaData() {
    let metaData = [];
    for (const realmGroupName of constants.realmGroups) {
        metaData.push({
            label: realmGroupName,
            expansion: constants[realmGroupName].expansion,
        });
    }

    return metaData;
}

export function getRealmGroupOfRealm(realmName) {
    for (const realmGroupName of constants.realmGroups) {
        for (const realmNameOfGroup of constants[realmGroupName].realms) {
            if (realmName === realmNameOfGroup) {
                return realmGroupName;
            }
        }
    }

    return false;
}

export const PATREON_CLIENT =
    "uhMK9LosJjR5KF-rFhyex3xbs_L76gPgctPGPoT7wF3Ek8psCcmNmfpM8sCmeZwA";

export const devEnv = process.env.NODE_ENV === "development" ? true : false;
