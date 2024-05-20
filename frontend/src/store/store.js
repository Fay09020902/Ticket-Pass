import { applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { legacy_createStore as createStore} from 'redux'

import sessionReducer from './session';
import eventReducer from './event';
import seatsReducer from './seats';
import ticketReducer from './ticket';

const rootReducer = combineReducers({
  session: sessionReducer,
  events: eventReducer,
  seats: seatsReducer,
  tickets: ticketReducer,
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
