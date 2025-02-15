import {
  ADD_USER_DATA,
  UPDATE_USER_DATA,
  FETCH_USER_DATA,
  ADD_EXPLORE_TYPE,
  FETCH_PAGE,
  UPDATE_PAGE,
  CACHE_TRIP_SUGGESTIONS,
  CACHE_INTERESTS,
  CACHE_TRIP_PREFERENCES,
  CACHE_MAIN_TRIP_DATA,
  SET_INITIAL_FETCH_DONE,
  SET_INITIAL_FETCH_DONE_INTERESTS_PAGE,
  SET_INITIAL_FETCH_DONE_DESTINATION_PAGE,
  SET_INITIAL_FETCH_DONE_MAIN_PAGE,
  SET_INITIAL_FETCH_DONE_ITERNARY_PAGE,
  SET_INITIAL_FETCH_DONE_ROUTE_PAGE,
  CACHE_ROUTE_OPTIONS,
  CACHE_TRAVEL_INFO,
  SET_INITIAL_FETCH_DONE_TRAVEL_INFO,
  SET_INITIAL_FETCH_DONE_IMAGES,
  CACHE_PLACE_IMAGES,
  SET_INITIAL_FETCH_DONE_PLACE_IMAGES,
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

export const cacheInterests = (data) => ({
  type: CACHE_INTERESTS,
  payload: data,
});

export const cacheTripPreferences = (data) => ({
  type: CACHE_TRIP_PREFERENCES,
  payload: data,
});

export const cacheMainTripData = (data) => ({
  type: CACHE_MAIN_TRIP_DATA,
  payload: data,
});

export const cacheRouteOptions = (data) => ({
  type: CACHE_ROUTE_OPTIONS,
  payload: data,
});

export const cacheTravelInfo = (data) => ({
  type: CACHE_TRAVEL_INFO,
  payload: data,
});

export const cachePlaceImages = (data) => ({
  type: CACHE_PLACE_IMAGES,
  payload: data,
});
export const setInitialFetchDoneInterestPage = (status) => ({
  type: SET_INITIAL_FETCH_DONE_INTERESTS_PAGE,
  payload: status,
});

export const setInitialFetchDoneDestinationPage = (status) => ({
  type: SET_INITIAL_FETCH_DONE_DESTINATION_PAGE,
  payload: status,
});

export const setInitialFetchDoneIternaryPage = (status) => ({
  type: SET_INITIAL_FETCH_DONE_ITERNARY_PAGE,
  payload: status,
});

export const setInitialFetchDoneRoutePage = (status) => ({
  type: SET_INITIAL_FETCH_DONE_ROUTE_PAGE,
  payload: status,
});

export const setInitialFetchDoneTravelInfo = (status) => ({
  type: SET_INITIAL_FETCH_DONE_TRAVEL_INFO,
  payload: status,
});

export const setInitialFetchDonePlaceImages = (status) => ({
  type: SET_INITIAL_FETCH_DONE_PLACE_IMAGES,
  payload: status,
});
