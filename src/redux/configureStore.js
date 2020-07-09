import { applyMiddleware, createStore } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { mainReducer, epics } from "./mainReducer";
import * as ajaxcalls from "./ajaxcalls";
import { createLogger } from "redux-logger";

const epicMiddleware = createEpicMiddleware();

const initialState = {};
function configureStore() {
  var middleware;
  if (process.env.NODE_ENV === "development") {
    const logger = createLogger();
    middleware = applyMiddleware(epicMiddleware, logger);
  } else {
    middleware = applyMiddleware(epicMiddleware);
  }
  const store = createStore(mainReducer, initialState, middleware);

  epicMiddleware.run(epics(ajaxcalls));

  return store;
}

export const store = configureStore();
