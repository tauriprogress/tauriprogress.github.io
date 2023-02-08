import { createBrowserHistory } from "history";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import createRootReducer from "./reducer";

import saga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

function configureStore(preloadedState) {
    const store = createStore(
        createRootReducer(),
        preloadedState,
        applyMiddleware(sagaMiddleware)
    );

    sagaMiddleware.run(saga);

    return store;
}

const store = configureStore();

export default store;
