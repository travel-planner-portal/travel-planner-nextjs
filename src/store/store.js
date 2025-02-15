// store/store.js
"use client";

import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import userDataReducer from "../reducer/userDataReducer";
import otherReducer from "../reducer/otherReducer";

const rootReducer = combineReducers({
  userData: userDataReducer,
  pageURL: otherReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["pageURL", "userData"], // Specify reducers to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
