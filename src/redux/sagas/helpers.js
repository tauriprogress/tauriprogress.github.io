import { fork, take, cancel, select } from "redux-saga/effects";

import { environmentServerUrlSelector } from "../../redux/selectors";

export function* getServerUrl() {
    return yield select((state) => {
        return environmentServerUrlSelector(state);
    });
}

export function takeLatestIfTrue(actionName, generatorFunctionCondition, saga) {
    return fork(function* () {
        let lastSaga;

        while (true) {
            const action = yield take(actionName);

            if (!(yield generatorFunctionCondition(action))) {
                continue;
            }
            if (lastSaga) {
                yield cancel(lastSaga);
            }

            lastSaga = yield fork(saga, action);
        }
    });
}
