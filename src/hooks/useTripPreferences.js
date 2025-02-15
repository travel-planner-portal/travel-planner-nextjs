// hooks/useTripPreferences.js
import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTripPreferences } from "../network/networkCalls";
import toast from "react-hot-toast";
import {
  cacheTripPreferences,
  setInitialFetchDoneInterestPage,
} from "../action/otherAction";

export const useTripPreferences = () => {
  const dispatch = useDispatch();
  const isMounted = useRef(false);

  const cachedPreferences = useSelector(
    (state) => state.pageURL?.tripPreferencesCache
  );
  const initialFetchDone = useSelector(
    (state) => state.userData?.initialFetchDoneInterest
  );

  const [preferences, setPreferences] = useState({
    tripTypes: [],
    exploreTypes: { main: [], additional: [] },
    profanityList: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isValidPreferenceData = useCallback((data) => {
    return Boolean(
      data &&
        Array.isArray(data.tripTypes) &&
        data.tripTypes.length > 0 &&
        data.exploreTypes?.main &&
        Array.isArray(data.exploreTypes.main) &&
        data.exploreTypes.main.length > 0
    );
  }, []);

  const fetchPreferences = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if we have valid cached data and it's not too old (e.g., less than 1 hour old)
      if (
        cachedPreferences?.data &&
        isValidPreferenceData(cachedPreferences.data) &&
        cachedPreferences.timestamp &&
        Date.now() - cachedPreferences.timestamp < 3600000 // 1 hour
      ) {
        console.log("Using cached preferences data");
        setPreferences(cachedPreferences.data);
        dispatch(setInitialFetchDoneInterestPage(true));
        setLoading(false);
        return;
      }

      console.log("Fetching new preferences data");
      const response = await getTripPreferences();

      if (response.success && isValidPreferenceData(response.data)) {
        dispatch(cacheTripPreferences({ data: response.data }));
        setPreferences(response.data);
        dispatch(setInitialFetchDoneInterestPage(true));
      } else {
        throw new Error("Invalid preference data");
      }
    } catch (error) {
      console.error("Error fetching preferences:", error);
      setError(error.message);

      if (
        cachedPreferences?.data &&
        isValidPreferenceData(cachedPreferences.data)
      ) {
        setPreferences(cachedPreferences.data);
        setError(null);
      } else {
        toast.error("Failed to load preferences");
      }
    } finally {
      setLoading(false);
    }
  }, [dispatch, isValidPreferenceData, cachedPreferences]);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;

      if (
        initialFetchDone &&
        cachedPreferences?.data &&
        isValidPreferenceData(cachedPreferences.data)
      ) {
        console.log("Using cached data from mount");
        setPreferences(cachedPreferences.data);
        setLoading(false);
      } else {
        fetchPreferences();
      }
    }

    return () => {
      isMounted.current = false;
    };
  }, []);

  const refetch = useCallback(() => {
    dispatch(setInitialFetchDoneInterestPage(false));
    fetchPreferences();
  }, [dispatch, fetchPreferences]);

  return {
    preferences,
    loading,
    error,
    refetch,
  };
};
