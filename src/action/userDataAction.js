// actions.js
import {
  ADD_USER_DATA,
  UPDATE_USER_DATA,
  FETCH_USER_DATA,
  ADD_EXPLORE_TYPE,
  FETCH_PAGE,
  UPDATE_PAGE,
  CACHE_TRIP_SUGGESTIONS,
} from "./actionType";

export const addUserData = (data) => {
  return {
    type: ADD_USER_DATA,
    payload: data,
  };
};

export const updateUserData = (data) => {
  return {
    type: UPDATE_USER_DATA,
    payload: data,
  };
};

export const fetchUserData = () => {
  return {
    type: FETCH_USER_DATA,
  };
};

export const addExploreType = (exploreTypeData) => ({
  type: ADD_EXPLORE_TYPE,
  payload: exploreTypeData,
});

export const updatePageURL = (url) => {
  return {
    type: UPDATE_PAGE,
    payload: url,
  };
};

export const fetchPageURL = () => {
  return {
    type: FETCH_PAGE,
  };
};

export const cacheTripSuggestions = (data) => ({
  type: CACHE_TRIP_SUGGESTIONS,
  payload: data,
});
