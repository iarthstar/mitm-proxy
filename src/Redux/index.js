import { createStore, applyMiddleware, compose } from "redux";

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import thunkMiddleware from "redux-thunk";
import rootReducer from "./Reducers";

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['page']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [thunkMiddleware];
const middlewareEnhancer = applyMiddleware(...middlewares)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(persistedReducer, undefined, composeEnhancers(middlewareEnhancer));
export const persistor = persistStore(store);