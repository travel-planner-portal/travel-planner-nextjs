import {
  CACHE_INTERESTS,
  CACHE_MAIN_TRIP_DATA,
  CACHE_PLACE_IMAGES,
  CACHE_ROUTE_OPTIONS,
  CACHE_TRAVEL_INFO,
  CACHE_TRIP_PREFERENCES,
  CACHE_TRIP_SUGGESTIONS,
  FETCH_PAGE,
  UPDATE_PAGE,
} from "../action/actionType";

const initialState = {
  pageURL: "",
  tripSuggestionsCache: {
    data: null,
    params: null,
  },
  interestsCache: {
    data: null,
    params: null,
  },
  tripPreferencesCache: {
    data: null,
    params: null,
  },
  mainTripDataCache: {
    data: null,
    params: null,
  },
  routeOptionsCache: {
    data: null,
    params: null,
  },
  travelInfoCache: {
    data: null,
    params: null,
  },
  placeImagesCache: {
    data: {},
    params: null,
  },
};

const otherReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PAGE:
      return {
        ...state,
        pageURL: action.payload,
      };
    case FETCH_PAGE:
      return state;
    case CACHE_TRIP_SUGGESTIONS:
      return {
        ...state,
        tripSuggestionsCache: action.payload,
      };
    case CACHE_INTERESTS:
      return {
        ...state,
        interestsCache: action.payload,
      };
    case CACHE_TRIP_PREFERENCES:
      return {
        ...state,
        tripPreferencesCache: action.payload,
      };
    case CACHE_MAIN_TRIP_DATA:
      return {
        ...state,
        mainTripDataCache: action.payload,
      };
    case CACHE_ROUTE_OPTIONS:
      return {
        ...state,
        routeOptionsCache: action.payload,
      };
    case CACHE_TRAVEL_INFO:
      return {
        ...state,
        travelInfoCache: action.payload,
      };
    case CACHE_PLACE_IMAGES:
      return {
        ...state,
        placeImagesCache: action.payload,
      };

    default:
      return state;
  }
};

export default otherReducer;
