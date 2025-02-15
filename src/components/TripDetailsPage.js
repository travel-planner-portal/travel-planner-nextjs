import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DetailItinerayTabs from "../components/TripDetailPage/DetailItinerayTabs";
import ExpandableInfoCard from "../components/TripDetailPage/ExpandableInfoCard";
import GeneralInfo from "../components/TripDetailPage/GeneralInfo";
import Header from "../components/TripDetailPage/Header";
import ImageGallery from "../components/TripDetailPage/ImageGallery";
import PersonalizedDetails from "../components/TripDetailPage/PersonalizedDetails";
import RoteInfo from "../components/TripDetailPage/RoteInfo";
import TabsChangeButton from "../components/TripDetailPage/TabsChangeButton";
import { makeRequest } from "../network/apiHelpers";
import { getRouteOptions } from "../network/networkCalls";
import { Loader } from "lucide-react";
import { addUserData } from "../action/userDataAction";
import TravelLoader from "../components/common/TravelLoader";
import { useAuth } from "../context/AuthContext";
import { useNavigationContext } from "../context/NavigationContext";
import {
  cacheMainTripData,
  cacheRouteOptions,
  setInitialFetchDoneIternaryPage,
  setInitialFetchDoneRoutePage,
} from "../action/otherAction";
import RouteInfo from "../components/TripDetailPage/RoteInfo";

const LoadMoreButton = ({ onClick, loading }) => (
  <button
    onClick={onClick}
    disabled={loading}
    className="px-6 py-2 bg-[#FDFDE5] rounded-full hover:bg-gray-50 disabled:opacity-50 flex items-center gap-2 mx-auto"
  >
    {loading ? (
      <>
        <Loader className="w-4 h-4 animate-spin" />
        <span>Loading more days...</span>
      </>
    ) : (
      "Load More Days"
    )}
  </button>
);

const RetryButton = ({ onClick, loading }) => (
  <button
    onClick={onClick}
    disabled={loading}
    className="px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800"
  >
    {loading ? (
      <>
        <Loader className="w-4 h-4 animate-spin" />
        <span>Retrying...</span>
      </>
    ) : (
      "Try Again"
    )}
  </button>
);

const formatDestinationForDisplay = (destination) => {
  if (!destination || typeof destination !== "string") return "";

  // Remove URL encoding and format properly
  return destination
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const TripDetailsPage = ({ initialDestination, initialDuration }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const mainTripDataCache = useSelector(
    (state) => state.pageURL.mainTripDataCache
  );
  const routeOptionsCache = useSelector(
    (state) => state.pageURL.routeOptionsCache
  );
  const initialFetchDoneIternary = useSelector(
    (state) => state.userData.initialFetchDoneIternary
  );
  const initialFetchDoneRoute = useSelector(
    (state) => state.userData.initialFetchDoneRoute
  );

  const [expandedDay, setExpandedDay] = useState(1);
  const [isModal, setIsModal] = useState(false);
  const [itineraryData, setItineraryData] = useState(null);
  const [routeData, setRouteData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [routeLoading, setRouteLoading] = useState(true);
  const [error, setError] = useState(null);
  const [routeError, setRouteError] = useState(null);

  const modeOfTransport = ["Bus", "Railway", "Flight"];
  const [selectedMode, setSelectedMode] = useState(modeOfTransport[0]);
  const savedSource =
    localStorage.getItem("userPickupAddress") ||
    localStorage.getItem("lastSource");
  const [source, setSource] = useState(savedSource || "");
  const [activeTab, setActiveTab] = useState("detailed");

  const [startInfo, setStartInfo] = useState({
    pickup: "",
    pickupDateTime: "",
    arrival: "",
    arrivalDateTime: "",
  });

  const [endInfo, setEndInfo] = useState({
    pickup: "",
    pickupDateTime: "",
    arrival: "",
    arrivalDateTime: "",
  });

  const rawDestination = initialDestination || userData.destination;
  const rawDuration = initialDuration || userData.duration;

  const finalDestination =
    typeof rawDestination === "string"
      ? formatDestinationForDisplay(rawDestination)
      : "";

  const finalDuration =
    typeof rawDuration === "number"
      ? rawDuration
      : parseInt(rawDuration, 10) || null;

  const fetchInitialData = async () => {
    if (!finalDestination || !finalDuration) {
      console.error("Missing required data:", {
        finalDestination,
        finalDuration,
      });
      return;
    }

    try {
      setLoading(true);
      setRouteLoading(true);
      setError(null);
      setRouteError(null);

      const [itineraryResponse, routeResponse] = await Promise.all([
        makeRequest({
          method: "post",
          url: "/trip/itinerary",
          data: {
            destination: finalDestination,
            duration: finalDuration,
            page: 1,
          },
        }),
        getRouteOptions(source, finalDestination),
      ]);

      if (itineraryResponse?.data) {
        setItineraryData(itineraryResponse.data);
        setHasMore(itineraryResponse.data.hasMore);
        setCurrentPage(1);

        dispatch(
          cacheMainTripData({
            data: itineraryResponse.data,
            params: {
              destination: finalDestination,
              duration: finalDuration,
            },
          })
        );
        dispatch(setInitialFetchDoneIternaryPage(true));
      }

      if (routeResponse?.success) {
        setRouteData(routeResponse.data);
        dispatch(
          cacheRouteOptions({
            data: routeResponse.data,
            params: {
              source,
              destination: finalDestination,
            },
          })
        );
        dispatch(setInitialFetchDoneRoutePage(true));
      }
    } catch (err) {
      console.error("Error fetching initial data:", err);
      setError("Failed to load trip details. Please try again.");
    } finally {
      setLoading(false);
      setRouteLoading(false);
    }
  };
  useEffect(() => {
    if (initialFetchDoneIternary && mainTripDataCache?.data) {
      const { destination: cachedDestination, duration: cachedDuration } =
        mainTripDataCache.params || {};
      if (
        cachedDestination === finalDestination &&
        cachedDuration === finalDuration
      ) {
        setItineraryData(mainTripDataCache.data);
        setLoading(false);
      }
    }
  }, [
    initialFetchDoneIternary,
    mainTripDataCache,
    finalDestination,
    finalDuration,
  ]);

  useEffect(() => {
    if (initialFetchDoneRoute && routeOptionsCache?.data) {
      const { source: cachedSource, destination: cachedDestination } =
        routeOptionsCache.params || {};
      if (cachedSource === source && cachedDestination === finalDestination) {
        setRouteData(routeOptionsCache.data);
        setRouteLoading(false);
      }
    }
  }, [initialFetchDoneRoute, routeOptionsCache, source, finalDestination]);

  useEffect(() => {
    const shouldFetchData =
      !initialFetchDoneIternary ||
      !mainTripDataCache?.data ||
      mainTripDataCache.params?.destination !== finalDestination ||
      mainTripDataCache.params?.duration !== finalDuration;

    if (shouldFetchData && finalDestination && finalDuration) {
      fetchInitialData();
    }
  }, [
    initialFetchDoneIternary,
    finalDestination,
    finalDuration,
    mainTripDataCache,
  ]);
  useEffect(() => {
    if (savedSource && !userData.source) {
      dispatch(addUserData({ source: savedSource }));
    }
  }, [dispatch, savedSource, userData.source]);

  const { isAuthenticated } = useAuth();
  const { setIsLogin, setIsWapper } = useNavigationContext();

  const handleAuthCheck = () => {
    if (!isAuthenticated) {
      setIsLogin(true);
      setIsWapper(true);
      return false;
    }
    return true;
  };

  const loadMore = async () => {
    if (!handleAuthCheck() || !hasMore || loading) return;

    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      const response = await makeRequest({
        method: "post",
        url: "/trip/itinerary",
        data: {
          destination: finalDestination,
          duration: finalDuration,
          page: nextPage,
        },
      });

      if (response?.data) {
        setItineraryData((prev) => ({
          ...prev,
          days: [...(prev?.days || []), ...response.data.days],
        }));
        setHasMore(response.data.hasMore);
        setCurrentPage(nextPage);
      }
    } catch (err) {
      console.error("Error loading more data:", err);
      setError("Failed to load more days. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSourceChange = (newSource) => {
    if (newSource !== source) {
      setSource(newSource);
      localStorage.setItem("lastSource", newSource);
      updateRouteData(newSource);
    }
  };

  const updateRouteData = async (newSource) => {
    try {
      setRouteLoading(true);
      setRouteError(null);

      const response = await getRouteOptions(newSource, finalDestination);

      if (response?.success) {
        setRouteData(response.data);
        dispatch(
          cacheRouteOptions({
            data: response.data,
            params: {
              newSource,
              destination: finalDestination,
            },
          })
        );
      }
    } catch (error) {
      console.error("Error updating route data:", error);
      setRouteError("Failed to update route information");
    } finally {
      setRouteLoading(false);
    }
  };

  if (loading && !itineraryData) {
    return <TravelLoader />;
  }

  if (!finalDestination || !finalDuration) {
    return (
      <div className="container max-w-[88rem] mx-auto px-4 min-h-screen mt-[73px] md:mt-[92px] flex items-center justify-center">
        <div className="text-red-500">
          Missing required trip data. Please go back and try again.
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-[88rem] mx-auto px-4 min-h-screen mt-[73px] md:mt-[92px] flex items-center justify-center">
        <div className="text-red-500">{error}</div>
        <div className="flex justify-center items-center mt-4">
          <RetryButton onClick={fetchInitialData} loading={loading} />
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-[88rem] mx-auto mt-[73px] md:mt-[92px]">
      {finalDestination && <ImageGallery placeName={finalDestination} />}
      <Header
        itineraryData={itineraryData}
        routeData={routeData}
        destinationfromprops={finalDestination || ""}
        durationfromprops={finalDuration || 0}
        budget={userData.budget}
      />
      <div className="general-info">
        <GeneralInfo
          destination={finalDestination}
          stationsData={routeData?.nearestStations}
        />
      </div>
      <ExpandableInfoCard
        saveTripData={null}
        destination={finalDestination}
        fromsavestrippage={false}
      />

      <div className="tabs-section">
        <TabsChangeButton
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setIsModal={setIsModal}
          destinationfromProps={finalDestination}
        />
      </div>
      {activeTab === "detailed" && itineraryData && (
        <>
          <DetailItinerayTabs
            trip={itineraryData}
            expandedDay={expandedDay}
            setExpandedDay={setExpandedDay}
            totalDays={finalDuration}
            onLoadMore={loadMore}
            isLoading={loading}
          />
          {hasMore && (
            <div className="text-center mt-6 mb-4">
              <LoadMoreButton onClick={loadMore} loading={loading} />
            </div>
          )}
        </>
      )}
      {activeTab === "personalized" && (
        <PersonalizedDetails
          startInfo={startInfo}
          endInfo={endInfo}
          setEndInfo={setEndInfo}
          setStartInfo={setStartInfo}
        />
      )}
      {activeTab === "routeTo" && (
        <>
          <RouteInfo
            selectedMode={selectedMode}
            setSelectedMode={setSelectedMode}
            modeOfTransport={modeOfTransport}
            isModal={isModal}
            setIsModal={setIsModal}
            source={source}
            destination={finalDestination}
            onSourceChange={handleSourceChange}
            routeData={routeData}
            loading={routeLoading}
            error={routeError}
            setActiveTab={setActiveTab}
          />
          {routeError && (
            <div className="flex justify-center items-center mt-4">
              <RetryButton onClick={updateRouteData} loading={routeLoading} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TripDetailsPage;
