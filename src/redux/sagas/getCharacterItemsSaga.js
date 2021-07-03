import { put, call, takeEvery, select } from "redux-saga/effects";
import {
    setCharacterItemsLoading,
    setCharacterItemsError,
    fillCharacterItems
} from "../actions";
import { getServerUrl } from "./helpers";

async function getData(serverUrl, ids, realm) {
    return await fetch(`${serverUrl}/getitems`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ids: ids,
            realm: realm
        })
    }).then(res => res.json());
}

function* fetchCharacterItems({ payload }) {
    try {
        const { ids, realm } = payload;

        const loading = yield select(state => state.character.items.loading);

        if (loading) {
            return;
        }

        const currentItems = yield select(state => state.character.items.data);

        const filteredIds = ids.filter(guid => !currentItems[guid]);

        yield put(setCharacterItemsLoading(true));

        const serverUrl = yield getServerUrl();
        const response = yield call(getData, serverUrl, filteredIds, realm);

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(fillCharacterItems(response.response));
        }
    } catch (err) {
        yield put(setCharacterItemsError(err.message));
    }
}

export default function* getCharacterItemsSaga() {
    yield takeEvery("CHARACTER_ITEMS_FETCH", fetchCharacterItems);
}
