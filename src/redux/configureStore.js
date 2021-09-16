import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import { Race } from "./race";

export default function configureStore() {
  const store = createStore(
    combineReducers({
      race: Race,
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
}
