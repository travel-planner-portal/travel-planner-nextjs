import axios from "axios";

// Base configurations
const API_BASE_URL = "https://travelgo-537037621947.us-central1.run.app/api";

const TIMEOUT = 120000;

// Create Axios instance
const createAxiosInstance = (additionalHeaders = {}, responseType = "json") => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: TIMEOUT,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      ...additionalHeaders,
    },
    responseType,
  });

  return instance;
};

// Instances for different needs
const defaultInstance = createAxiosInstance();
const downloadInstance = createAxiosInstance(
  { "Content-Type": "application/x-www-form-urlencoded" },
  "blob"
);

// Common API handlers
const handleResponse = (response) => {
  const { message, status } = response.data;
  switch (response.status) {
    case 400:
      return {
        status: "validation",
        message: message || "Validation error",
        errors: response.data.errors,
      };
    case 401:
      return {
        status: "unauthorized",
        message: message || "Unauthorized",
        errors: {},
      };
    default:
      return {
        status: "ok",
        message: "Processed successfully",
        payload: response.data,
      };
  }
};

const handleError = (error) => {
  const errorCode = error.response?.status || "network";
  const errorMessages = {
    400: "Bad Request",
    401: "Please login again.",
    404: "Resource not found.",
    405: "Method not supported.",
    500: "An error occurred. Technical support has been notified.",
  };
  return {
    status: errorMessages[errorCode] ? errorMessages[errorCode] : "network",
    message:
      errorMessages[errorCode] || "Please check your network connection.",
    errors: {},
  };
};

// General request function
const request = async (
  method,
  url,
  data = null,
  instance = defaultInstance
) => {
  try {
    const config = { method, url, data };
    const response = await instance(config);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

// API Functions
const API = {
  get: (url) => request("get", url),
  post: (url, data) => request("post", url, data),
  patch: (url, data) => request("patch", url, data),
  download: (url) => request("get", url, null, downloadInstance),
};

// Centralized Endpoints
const ENDPOINTS = {
  AUTH: {
    LOGIN: "/login",
  },
  UTILITY: {
    DROPDOWN: "/risk/dropdown",
    HISTORY: (id) => `/risk/history/${id}`,
  },
};

// API Wrapper Functions
const APIFunctions = {
  login: (data) => API.post(ENDPOINTS.AUTH.LOGIN, data),
  fetchRiskHistory: (riskId) => API.get(ENDPOINTS.UTILITY.HISTORY(riskId)),
};

export { API, APIFunctions, ENDPOINTS };
