import { put, call, select } from "redux-saga/effects";
import { fillRaidBossCharacters } from "../../actions";
import { getServerUrl, takeLatestIfTrue } from "../helpers";
import { getDataSpecificationString } from "../../../helpers";
import { cleanFilters } from "./helpers";
import {
    setRaidBossCharactersError,
    setRaidBossCharactersLoading
} from "../../actions/raidBoss/characters";

async function getData(
    serverUrl,
    raidId,
    bossName,
    combatMetric,
    filters,
    page,
    pageSize
) {
    return await fetch(`${serverUrl}/getboss/characters`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            raidId: raidId,
            bossName: bossName,
            combatMetric: combatMetric,
            filters: cleanFilters(filters),
            page: page,
            pageSize: pageSize
        })
    }).then(res => res.json());
}

function* fetchRaidBossCharacters({ payload }) {
    try {
        yield put(setRaidBossCharactersLoading());

        const { raidId, bossName, filters, combatMetric, page, pageSize } =
            payload;

        const dataSpecificationString = getDataSpecificationString({
            ...filters,
            raidId,
            bossName,
            combatMetric,
            page,
            pageSize
        });

        const serverUrl = yield getServerUrl();
        const response = yield call(
            getData,
            serverUrl,
            raidId,
            bossName,
            combatMetric,
            filters,
            page,
            pageSize
        );

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(
                fillRaidBossCharacters({
                    characters: response.response.characters,
                    itemCount: response.response.itemCount,
                    dataSpecificationString: dataSpecificationString
                })
            );
        }
    } catch (err) {
        yield put(setRaidBossCharactersError(err.message));
    }
}

function* conditionToFetch({ payload }) {
    const { raidId, bossName, filters, combatMetric, page, pageSize } = payload;

    const dataSpecificationString = getDataSpecificationString({
        ...filters,
        raidId,
        bossName,
        combatMetric,
        page,
        pageSize
    });
    const oldDataSpecificationString = yield select(
        state => state.raidBoss.characters.dataSpecificationString
    );

    return dataSpecificationString !== oldDataSpecificationString;
}

export default function* getRaidBossCharacters() {
    yield takeLatestIfTrue(
        "RAIDBOSS_CHARACTERS_FETCH",
        conditionToFetch,
        fetchRaidBossCharacters
    );
}
