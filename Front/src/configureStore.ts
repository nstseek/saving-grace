import logger from 'redux-logger';
import {
  createStore,
  combineReducers,
  applyMiddleware,
  CombinedState
} from 'redux';
import SystemStore, { SystemState } from './stores/system/system.store';

export type AppState = CombinedState<{
  system: SystemState;
}>;
export default function configureStore() {
  const rootReducer = combineReducers<AppState>({
    system: SystemStore
  });
  const middlewares =
    process.env.NODE_ENV === 'development'
      ? [logger]
      : [];
  const store = createStore(rootReducer, applyMiddleware(...middlewares));
  return store;
}

export const store = configureStore();
