// hooks/useTripPreferences.js
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTripPreferences } from "../network/networkCalls";
import toast from "react-hot-toast";
import {
  cacheTripPreferences,
  setInitialFetchDoneInterestPage,
} from "../action/otherAction";

export const useTripPreferences = () => {
  const dispatch = useDispatch();
  // Get the raw cache data from Redux
  const tripPreferencesCache = useSelector((state) => {
    const pageURLState = state.pageURL;

    // Check if tripPreferencesCache exists and has data
    if (pageURLState?.tripPreferencesCache?.data) {
      return pageURLState.tripPreferencesCache;
    }
    return null;
  });

  const initialFetchDoneInterest = useSelector(
    (state) => state.userData?.initialFetchDoneInterest || false
  );

  const [preferences, setPreferences] = useState({
    tripTypes: [],
    exploreTypes: { main: [], additional: [] },
    profanityList: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isValidPreferenceData = (data) => {
    return (
      data &&
      Array.isArray(data.tripTypes) &&
      data.exploreTypes &&
      Array.isArray(data.exploreTypes.main)
    );
  };

  const fetchPreferences = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if we have valid cached data
      if (
        tripPreferencesCache &&
        isValidPreferenceData(tripPreferencesCache.data)
      ) {
        console.log("Using cached preferences data");
        setPreferences(tripPreferencesCache.data);
        dispatch(setInitialFetchDoneInterestPage(true));
        setLoading(false);
        return;
      }

      console.log("Fetching new preferences data");
      const response = await getTripPreferences();

      if (response.success && isValidPreferenceData(response.data)) {
        dispatch(
          cacheTripPreferences({
            data: response.data,
            timestamp: Date.now(),
          })
        );
        setPreferences(response.data);
        dispatch(setInitialFetchDoneInterestPage(true));
      } else {
        throw new Error("Invalid or missing preference data");
      }
    } catch (error) {
      console.error("Error in fetchPreferences:", error);
      setError(error.message);
      toast.error("Failed to load preferences");

      // Fallback to cache if available
      if (
        tripPreferencesCache &&
        isValidPreferenceData(tripPreferencesCache.data)
      ) {
        setPreferences(tripPreferencesCache.data);
        setError(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Skip API call if we have valid cached data and initialFetchDoneInterest is true
    if (
      tripPreferencesCache &&
      isValidPreferenceData(tripPreferencesCache.data) &&
      initialFetchDoneInterest
    ) {
      console.log("Using cached data from useEffect");
      setPreferences(tripPreferencesCache.data);
      setLoading(false);
      return;
    }

    // Fetch data if no valid cache or initialFetchDoneInterest is false
    console.log("Fetching new data from useEffect");
    fetchPreferences();
  }, []); // Empty dependency array since we only want this to run once

  const refetch = () => {
    dispatch(setInitialFetchDoneInterestPage(false));
    fetchPreferences();
  };

  return {
    preferences,
    loading,
    error,
    refetch,
  };
};
