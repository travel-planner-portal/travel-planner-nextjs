import { makeRequest } from "./apiHelpers";
import { API_URLS } from "./apiUrls";

export const verifyPhoneToken = async (idToken) => {
  const data = await makeRequest({
    method: "post",
    url: API_URLS.VERIFY_PHONE_TOKEN,
    data: { idToken },
  });
  return data;
};

export const verifyGoogleToken = async (idToken) => {
  const data = await makeRequest({
    method: "post",
    url: API_URLS.VERIFY_GOOGLE_TOKEN,
    data: { idToken },
  });
  return data;
};
export const completeRegistration = async (formData) => {
  return await makeRequest({
    method: "post",
    url: API_URLS.COMPLETE_SIGNUP,
    data: formData,
  });
};

export const completeGoogleRegistration = async (formData) => {
  return await makeRequest({
    method: "post",
    url: API_URLS.COMPLETE_GOOGLE_REGISTRATION,
    data: formData,
  });
};

export const getProfile = async () => {
  const data = await makeRequest({
    method: "get",
    url: API_URLS.GET_PROFILE,
  });
  return data;
};

export const logoutUser = () => {
  const itemsToClear = [
    "token",
    "userState",
    "logintype",
    "number",
    "email",
    "userPickupAddress",
    "lastSource",
  ];

  itemsToClear.forEach((item) => localStorage.removeItem(item));
};

export const storeUserData = (response) => {
  if (response.success && response.token) {
    localStorage.setItem("token", response.token);
    localStorage.setItem("userState", JSON.stringify(response.user));

    if (response.user.phoneNumber) {
      localStorage.setItem("number", response.user.phoneNumber);
      localStorage.setItem("logintype", "phone");
    } else if (response.user.email) {
      localStorage.setItem("email", response.user.email);
      localStorage.setItem("logintype", "google");
    }
  }
};
export const getTripPreferences = async () => {
  const data = await makeRequest({
    method: "get",
    url: API_URLS.GET_TRIP_PREFERENCES,
  });
  return data;
};

export const createExploreType = async (exploreTypeData) => {
  const data = await makeRequest({
    method: "post",
    url: API_URLS.CREATE_TRIP_TYPE,
    data: exploreTypeData,
  });
  return data;
};

export const getTripSuggestions = async (
  days,
  budget,
  interests,
  tripType,
  page
) => {
  const data = await makeRequest({
    method: "post",
    url: API_URLS.GET_TRIP_SUGGESTIONS,
    data: { days, budget, interests, tripType, page },
  });
  return data;
};

export const getTrendingTrips = async () => {
  const data = await makeRequest({
    method: "get",
    url: API_URLS.GET_TRENDING_TRIPS,
  });
  return data;
};

export const getRouteOptions = async (source, destination) => {
  const data = await makeRequest({
    method: "post",
    url: API_URLS.GET_ROUTE_OPTIONS,
    data: { source, destination },
  });
  return data;
};

export const getPlaceImages = async (placeName, page = 1) => {
  const data = await makeRequest({
    method: "get",
    url: API_URLS.GET_PLACE_IMAGES,
    params: { placeName, page },
  });
  return data;
};

export const checkSavedTripStatus = async (destination, duration) => {
  const response = await makeRequest({
    method: "get",
    url: `${API_URLS.CHECK_SAVED_TRIP}/${destination}/${duration}`,
  });
  return response.data;
};

export const saveTrip = async (tripData) => {
  const response = await makeRequest({
    method: "post",
    url: API_URLS.SAVE_TRIP,
    data: tripData,
  });
  return response.data;
};

export const unsaveTrip = async (destination, duration) => {
  const response = await makeRequest({
    method: "delete",
    url: `${API_URLS.DELETE_SAVED_TRIP}/${destination}/${duration}`,
  });
  return response.data;
};
export const getSavedTripDetail = async (destination, duration) => {
  const response = await makeRequest({
    method: "get",
    url: `/saved-trips/${destination}/${duration}`,
  });
  return response;
};
export const getSavedTrips = async () => {
  const response = await makeRequest({
    method: "get",
    url: API_URLS.GET_SAVED_TRIPS,
  });
  return response;
};

export const getTravelInfo = async (placeName) => {
  const response = await makeRequest({
    method: "get",
    url: `${API_URLS.TRAVEL_INFO}?placeName=${placeName}`,
  });
  return response;
};
