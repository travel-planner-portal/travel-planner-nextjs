// src/middleware/userDataMiddleware.js
export const userDataMiddleware = (store) => (next) => (action) => {
  if (action.type === "ADD_USER_DATA") {
    const currentState = store.getState().userData;
    action.payload = {
      ...currentState,
      ...action.payload,
      interest: action.payload.interest || currentState.interest || [],
      tripType: action.payload.tripType || currentState.tripType || "",
    };
  }
  return next(action);
};
