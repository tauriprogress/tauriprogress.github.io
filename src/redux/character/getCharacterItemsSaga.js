import { put, call, takeEvery, select } from "redux-saga/effects";
import {
    characterItemsSetLoading,
    characterItemsSetError,
    characterItemsFill,
    CHARACTER_ITEMS_FETCH,
} from "./actions";
import {
    characterItemsLoadingSelector,
    characterItemsSelector,
} from "./selectors";
import { getServerUrl } from "../sagas/helpers";

async function getData(serverUrl, items, realm) {
    return await fetch(`${serverUrl}/getitems`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            items: items,
            realm: realm,
        }),
    }).then((res) => res.json());
}

function* fetchCharacterItems({ payload }) {
    try {
        const { items, realm } = payload;

        const loading = yield select(characterItemsLoadingSelector);

        if (loading) {
            return;
        }

        const currentItems = yield select(characterItemsSelector);

        const filteredIds = items.filter((item) => !currentItems[item.id]);

        yield put(characterItemsSetLoading(true));

        const serverUrl = yield getServerUrl();
        const response = yield call(getData, serverUrl, filteredIds, realm);

        if (!response.success) {
            throw new Error(response.errorstring);
        } else {
            yield put(characterItemsFill(response.response));
        }
    } catch (err) {
        yield put(characterItemsSetError(err.message));
    }
}

export default function* getCharacterItemsSaga() {
    yield takeEvery(CHARACTER_ITEMS_FETCH, fetchCharacterItems);
}
