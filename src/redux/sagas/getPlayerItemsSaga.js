import { serverUrl } from "tauriprogress-constants/urls";

import { put, call, takeEvery, select } from "redux-saga/effects";
import {
    playerItemsLoading,
    playerItemsSetError,
    playerItemsFill
} from "../actions";

async function getData(ids, realm) {
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

function* fetchPlayerItems({ payload }) {
    try {
        const { ids, realm } = payload;

        const loading = yield select(state => state.player.items.loading);

        if (loading) {
            return;
        }

        const currentItems = yield select(state => state.player.items.data);

        const filteredIds = ids.filter(guid => !currentItems[guid]);

        yield put(playerItemsLoading(true));

        const response = yield call(getData, filteredIds, realm);

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(playerItemsFill(response.response));
        }
    } catch (err) {
        yield put(playerItemsSetError(err.message));
    }
}

export default function* getPlayerItemsSaga() {
    yield takeEvery("PLAYER_ITEMS_FETCH", fetchPlayerItems);
}
