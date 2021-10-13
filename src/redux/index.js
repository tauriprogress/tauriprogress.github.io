import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import createRootReducer from "./reducer";
import updateHistoryStateMiddleware from "./reducer/updateHistoryStateMiddleware";

import saga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

function configureStore(preloadedState) {
    const store = createStore(
        createRootReducer(history),
        preloadedState,
        applyMiddleware(
            updateHistoryStateMiddleware(history),
            routerMiddleware(history),
            sagaMiddleware
        )
    );

    sagaMiddleware.run(saga);

    return store;
}

const store = configureStore();

export default store;
