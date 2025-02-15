import {
  ADD_USER_DATA,
  UPDATE_USER_DATA,
  FETCH_USER_DATA,
  ADD_EXPLORE_TYPE,
  SET_INITIAL_FETCH_DONE,
  SET_INITIAL_FETCH_DONE_INTERESTS_PAGE,
  SET_INITIAL_FETCH_DONE_DESTINATION_PAGE,
  SET_INITIAL_FETCH_DONE_ITERNARY_PAGE,
  SET_INITIAL_FETCH_DONE_ROUTE_PAGE,
  SET_INITIAL_FETCH_DONE_TRAVEL_INFO,
  SET_INITIAL_FETCH_DONE_IMAGES,
  SET_INITIAL_FETCH_DONE_PLACE_IMAGES,
} from "../action/actionType";

const initialState = {
  duration: null,
  budget: null,
  destination: null,
  startDate: null,
  endDate: null,
  tripType: null,
  interest: null,
  path: "Discover",
  exploreTypes: [],
  initialFetchDoneInterest: false,
  initialFetchDoneDestination: false,
  initialFetchDoneIternary: false,
  initialFetchDoneRoute: false,
  initialFetchDoneTravelInfo: false,
  initialFetchDoneImages: false,
};

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };

    case UPDATE_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case ADD_EXPLORE_TYPE:
      return {
        ...state,
        exploreTypes: [...state.exploreTypes, action.payload],
      };

    case FETCH_USER_DATA:
      return state;
    case SET_INITIAL_FETCH_DONE:
      return {
        ...state,
        initialFetchDone: action.payload,
      };
    case SET_INITIAL_FETCH_DONE_INTERESTS_PAGE:
      return {
        ...state,
        initialFetchDoneInterest: action.payload,
      };
    case SET_INITIAL_FETCH_DONE_DESTINATION_PAGE:
      return {
        ...state,
        initialFetchDoneDestination: action.payload,
      };
    case SET_INITIAL_FETCH_DONE_ITERNARY_PAGE:
      return {
        ...state,
        initialFetchDoneIternary: action.payload,
      };
    case SET_INITIAL_FETCH_DONE_ROUTE_PAGE:
      return {
        ...state,
        initialFetchDoneRoute: action.payload,
      };
    case SET_INITIAL_FETCH_DONE_TRAVEL_INFO:
      return {
        ...state,
        initialFetchDoneTravelInfo: action.payload,
      };
    case SET_INITIAL_FETCH_DONE_PLACE_IMAGES:
      return {
        ...state,
        initialFetchDoneImages: action.payload,
      };
    default:
      return state;
  }
};

export default userDataReducer;
