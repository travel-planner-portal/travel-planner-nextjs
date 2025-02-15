// app/store/store.js
"use client";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk"; // Changed this line

const pageURLReducer = (state = { pageURL: "/" }, action) => {
  switch (action.type) {
    case "UPDATE_PAGE_URL":
      return { ...state, pageURL: action.payload };
    default:
      return state;
  }
};

// src/store/store.js
const userDataInitialState = {
  duration: null,
  budget: null,
  interest: null,
  tripType: null,
  destination: null,
  startDate: null,
  endDate: null,
};

const userDataReducer = (state = userDataInitialState, action) => {
  switch (action.type) {
    case "ADD_USER_DATA":
      return {
        ...state,
        ...action.payload, // Merge new data with existing data
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  userData: userDataReducer,
  pageURL: pageURLReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["pageURL", "userData"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
        ],
      },
    }),
});

export const persistor = persistStore(store);

// Export action creators
export const updatePageURL = (url) => ({
  type: "UPDATE_PAGE_URL",
  payload: url,
});
