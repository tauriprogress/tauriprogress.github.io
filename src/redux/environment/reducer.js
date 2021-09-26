import constants from "tauriprogress-constants";
import {
    getRealmGroupOfLocalStorage,
    isUrlSeasonal,
    getRealmGroupFromLocalStorage
} from "../../helpers";
import {
    ENVIRONMENT_REALMGROUP_SET,
    ENVIRONMENT_SEASON_TOGGLE
} from "./actions";

const devEnv = process.env.NODE_ENV === "development" ? true : false;
const defaultRealmGroup = getRealmGroupFromLocalStorage();

if (devEnv) {
    for (const realmGroup of ["tauri", "crystalsong"]) {
        constants[realmGroup].urls.server =
            realmGroup === "tauri"
                ? "http://localhost:3001"
                : "http://localhost:3002";

        constants[realmGroup].urls.seasonal = "http://localhost:3003";
    }
}

function getSeasonalDefaultState() {
    const currentTime = new Date().getTime();

    const defaultRealmGroup = getRealmGroupOfLocalStorage();

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
        isSeasonal: hasSeasonal && isUrlSeasonal(),
        hasSeasonal: hasSeasonal,
        isSeasonRunning: isSeasonRunning,
        seasonName: seasonName,
        startTime: startTime,
        finishTime: finishTime,
        nextStartTime: nextStartTime,
        nextSeasonName: nextSeasonName
    };
}

function getConstantsDefaultState(realmGroup, isSeasonal) {
    return {
        ...constants[realmGroup],
        currentContent: {
            ...constants[realmGroup].currentContent,
            raids: isSeasonal
                ? [constants[realmGroup].currentContent.raids[0]]
                : constants[realmGroup].currentContent.raids
        }
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
        seasonal: seasonalState
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
                seasonal: getSeasonalDefaultState()
            };

        case ENVIRONMENT_SEASON_TOGGLE:
            const seasonalState = getSeasonalDefaultState();
            return {
                ...state,
                ...getConstantsDefaultState(
                    state.realmGroup,
                    seasonalState.isSeasonal
                ),
                seasonal: seasonalState
            };
        default:
            return state;
    }
}

export default environmentReducer;
