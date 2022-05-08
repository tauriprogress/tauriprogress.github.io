import * as cons from "tauriprogress-constants";
import { isUrlSeasonal, getRealmGroupFromLocalStorage } from "../../helpers";
import {
    ENVIRONMENT_REALMGROUP_SET,
    ENVIRONMENT_SEASON_TOGGLE,
    ENVIRONMENT_SET,
} from "./actions";

let constants = JSON.parse(JSON.stringify(cons));

const devEnv = process.env.NODE_ENV === "development" ? true : false;
const defaultRealmGroup = getRealmGroupFromLocalStorage();

if (devEnv) {
    for (const realmGroup of cons.realmGroups) {
        let url;
        switch (realmGroup) {
            case "tauri":
                url = "http://localhost:3001";
                break;
            case "crystalsong":
                url = "http://localhost:3002";
                break;
            case "mistblade":
                url = "http://localhost:3004";
                break;
            default:
                url = "http://localhost:3001";
                break;
        }

        constants[realmGroup].urls.server = url;

        constants[realmGroup].urls.seasonal = "http://localhost:3003";
    }
}

function getSeasonalDefaultState(isSeasonal) {
    const currentTime = new Date().getTime();

    const defaultRealmGroup = getRealmGroupFromLocalStorage();

    const seasons = constants[defaultRealmGroup].seasons;

    const hasSeasonal = !!(seasons.length > 0);

    let isSeasonRunning = false;
    let seasonName = undefined;
    let startTime = false;
    let finishTime = false;
    let nextStartTime = false;
    let nextSeasonName = undefined;

    for (const season of seasons) {
        const currentStartTime = new Date(season.start).getTime();
        const currentFinishTime = new Date(season.finish).getTime();
        if (currentTime > currentStartTime && currentTime < currentFinishTime) {
            isSeasonRunning = true;
            seasonName = season.name;
            startTime = currentStartTime;
            finishTime = currentFinishTime;
        }

        if (!nextStartTime && currentTime < currentStartTime) {
            nextStartTime = currentStartTime;
            nextSeasonName = season.name;
        }
    }
    return {
        isSeasonal: isSeasonal !== undefined ? isSeasonal : isUrlSeasonal(),
        hasSeasonal: hasSeasonal,
        isSeasonRunning: isSeasonRunning,
        seasonName: seasonName,
        startTime: startTime,
        finishTime: finishTime,
        nextStartTime: nextStartTime,
        nextSeasonName: nextSeasonName,
    };
}

function getConstantsDefaultState(realmGroup, isSeasonal) {
    return {
        ...constants[realmGroup],
        currentContent: {
            ...constants[realmGroup].currentContent,
            raids: isSeasonal
                ? [constants[realmGroup].currentContent.raids[0]]
                : constants[realmGroup].currentContent.raids,
        },
    };
}

const seasonalState = getSeasonalDefaultState();

if (!seasonalState.hasSeasonal && isUrlSeasonal()) {
    window.history.replaceState(
        window.history.state,
        document.title,
        window.location.origin
    );
}

const defaultState = JSON.parse(
    JSON.stringify({
        ...getConstantsDefaultState(
            defaultRealmGroup,
            seasonalState.isSeasonal
        ),
        realmGroup: defaultRealmGroup,
        seasonal: seasonalState,
    })
);

function environmentReducer(state = defaultState, action) {
    switch (action.type) {
        case ENVIRONMENT_REALMGROUP_SET:
            const realmGroup = action.payload;
            localStorage.setItem("realmGroup", realmGroup);
            return {
                ...state,
                ...constants[realmGroup],
                realmGroup: realmGroup,
                seasonal: getSeasonalDefaultState(false),
            };

        case ENVIRONMENT_SEASON_TOGGLE:
            const seasonalState = getSeasonalDefaultState(
                !state.seasonal.isSeasonal
            );

            return {
                ...state,
                ...getConstantsDefaultState(
                    state.realmGroup,
                    seasonalState.isSeasonal
                ),
                seasonal: seasonalState,
            };
        case ENVIRONMENT_SET:
            localStorage.setItem("realmGroup", action.payload.realmGroup);
            return {
                ...state,
                ...getConstantsDefaultState(
                    action.payload.realmGroup,
                    action.payload.isSeasonal
                ),
                realmGroup: action.payload.realmGroup,
                seasonal: getSeasonalDefaultState(action.payload.isSeasonal),
            };
        default:
            return state;
    }
}

export default environmentReducer;
