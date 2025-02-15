import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LeftAngleArrowIcon, RightArrowIcon } from "../../assets/images";
import toast from "react-hot-toast";
import { getTripSuggestions } from "../../network/networkCalls";
import {
  UPDATE_USER_DATA,
  SET_INITIAL_FETCH_DONE,
} from "../../action/actionType";
import { useAuth } from "../../context/AuthContext";
import { useNavigationContext } from "../../context/NavigationContext";
import {
  BackButtonSkeleton,
  DestinationSkeleton,
  HeadingSkeleton,
} from "../ui/DestinationSkeleton";
import {
  updatePageURL,
  cacheTripSuggestions,
  setInitialFetchDoneDestinationPage,
} from "../../action/otherAction";
import { getPlaceAndState } from "../../utils/utilsFunction";
import { useRouter } from "next/navigation";

const DestinationCard = ({
  destination,
  duration,
  budget,
  image_link,
  color,
  onClick,
}) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    className={`${color} p-4 rounded-[16px] flex flex-col items-start justify-start gap-4 text-left relative w-full md:w-[350px]`}
    onClick={onClick}
  >
    <img
      className="w-full h-[147px] rounded-t-[16px] object-cover"
      src={image_link || "/images/placeholder.jpg"}
      alt={destination}
    />
    <div className="w-full flex flex-row items-center justify-between">
      <div>
        <p className="text-[#818181] font-rubikregular_400 text-[16px] ">
          {getPlaceAndState(destination)?.state}
        </p>
        <div className="flex flex-col">
          <h3 className="text-[#2E2B36] text-[28px] font-rubikmedium_500 leading-[32px]">
            {getPlaceAndState(destination)?.place}
          </h3>
        </div>
      </div>
      <div className="w-auto aspect-square bg-darkBlack rounded-full flex flex-col items-center justify-center p-2 -rotate-45 duration-300 ease-in-out hover:-rotate-0">
        <RightArrowIcon />
      </div>
    </div>
    <div className="flex gap-4 w-[100%]">
      <div className="bg-white/50 w-[50%] px-3 py-1 rounded-lg">
        <p className="text-[#818181] font-rubikregular_400 text-[12px] ">
          Duration
        </p>
        <p className="text-[#2E2B36] text-[18px] font-rubikregular_400 ">
          {duration}
        </p>
      </div>
      <div className="bg-white/50 w-[50%] px-3 py-1 rounded-lg">
        <p className="text-[#818181] font-rubikregular_400 text-[12px] ">
          Budget
        </p>
        <p className="text-[#2E2B36] text-[18px] font-rubikregular_400 ">
          {budget}
        </p>
      </div>
    </div>
  </motion.button>
);

const DestinationSelection = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const userData = useSelector((state) => state.userData);
  const tripSuggestionsCache = useSelector(
    (state) => state.pageURL.tripSuggestionsCache
  );
  const initialFetchDoneDestination = useSelector(
    (state) => state.userData.initialFetchDoneDestination
  );
  const dispatch = useDispatch();

  const colors = [
    "bg-[#E5F7FF]",
    "bg-[#FFF5E5]",
    "bg-[#FFE5F3]",
    "bg-[#E5FFE8]",
    "bg-[#F3E5FF]",
    "bg-[#FFE5E5]",
  ];

  const fetchDestinations = async (page = 1, isLoadMore = false) => {
    if (
      !userData.duration ||
      !userData.budget ||
      !userData.interest ||
      !userData.tripType
    ) {
      console.log("Please complete your preferences first");
      toast.error("Please complete your preferences first");
      return;
    }

    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const response = await getTripSuggestions(
        userData.duration,
        userData.budget,
        userData.interest,
        userData.tripType,
        page
      );

      if (response.success) {
        if (page === 1) {
          setDestinations(response.data);
          dispatch(setInitialFetchDoneDestinationPage(true));
          dispatch(
            cacheTripSuggestions({
              data: response.data,
              params: {
                duration: userData.duration,
                budget: userData.budget,
                interest: userData.interest,
                tripType: userData.tripType,
              },
            })
          );
        } else {
          setDestinations((prev) => [...prev, ...response.data]);
        }
        setHasMore(response.pagination.hasMore);
        setCurrentPage(response.pagination.currentPage);
      }
    } catch (error) {
      console.error("Error fetching destinations:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    if (initialFetchDoneDestination) {
      setDestinations(tripSuggestionsCache.data);
      setLoading(false);
    }
  }, [initialFetchDoneDestination, tripSuggestionsCache]);

  useEffect(() => {
    if (
      !initialFetchDoneDestination &&
      userData.duration &&
      userData.budget &&
      userData.interest &&
      userData.tripType
    ) {
      fetchDestinations(1);
    }
  }, [initialFetchDoneDestination, userData]);

  useEffect(() => {
    if (tripSuggestionsCache && tripSuggestionsCache.params) {
      const { duration, budget, interest, tripType } =
        tripSuggestionsCache.params;
      const currentParams = {
        duration: userData.duration,
        budget: userData.budget,
        interest: userData.interest,
        tripType: userData.tripType,
      };

      if (
        duration === currentParams.duration &&
        budget === currentParams.budget &&
        JSON.stringify(interest) === JSON.stringify(currentParams.interest) &&
        tripType === currentParams.tripType
      ) {
        setDestinations(tripSuggestionsCache.data);
        setLoading(false);
      } else {
        fetchDestinations(1);
      }
    }
  }, [tripSuggestionsCache, userData]);

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      fetchDestinations(currentPage + 1, true);
    }
  };

  const { isAuthenticated } = useAuth();
  const { setIsLogin, setIsWapper, isLogin } = useNavigationContext();
  const [pendingDestination, setPendingDestination] = useState(null);

  const handleDestinationSelect = (destination) => {
    if (!isAuthenticated) {
      setPendingDestination(destination);
      setIsLogin(true);
      setIsWapper(true);
      return;
    }
    navigateToDestination(destination);
  };

  const navigateToDestination = (destination) => {
    dispatch({
      type: UPDATE_USER_DATA,
      payload: {
        destination: destination.name,
        duration: destination.duration,
        budget: destination.budget,
      },
    });

    const formattedDestination = destination.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const url = `/tripdetailspage/${formattedDestination}${destination.duration}days`;
    router.push(url);
  };

  useEffect(() => {
    if (pendingDestination && !isLogin) {
      if (!isAuthenticated) {
        navigateToDestination(pendingDestination);
      } else {
        navigateToDestination(pendingDestination);
      }
      setPendingDestination(null);
    }
  }, [isLogin, pendingDestination, isAuthenticated]);

  const onBack = () => {
    router.push("/discover/interests");
  };

  return (
    <div className="container max-w-[88rem] relative flex flex-col px-4 items-center justify-center mt-[73px] md:mt-[92px] mx-auto">
      {loading ? (
        <BackButtonSkeleton />
      ) : (
        <button
          onClick={onBack}
          className="mb-8 flex items-center justify-start sticky top-[92px] self-start gap-2 md:gap-5 text-gray-600 hover:text-gray-900"
        >
          <div className="md:scale-100 scale-50">
            <LeftAngleArrowIcon />
          </div>
          <span className="text-[#2E2B36] text-[16px] md:text-[28px] font-rubikregular_400 tracking-[-1.12px]">
            Back
          </span>
        </button>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-[28px] md:pl-[15vw] w-full"
      >
        {loading ? (
          <HeadingSkeleton />
        ) : (
          <h2 className="text-[#2E2B36] text-[20px] font-rubikregular_400 ">
            Select a destination for your trip
          </h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && currentPage === 1
            ? Array.from({ length: 6 }).map((_, index) => (
                <DestinationSkeleton key={index} />
              ))
            : destinations.map((destination, index) => (
                <DestinationCard
                  key={index}
                  destination={destination.name}
                  duration={destination.duration}
                  budget={destination.budget}
                  image_link={destination.image_link}
                  color={colors[index % colors.length]}
                  onClick={() => handleDestinationSelect(destination)}
                />
              ))}
        </div>

        {hasMore && !loading && (
          <div className="w-full flex justify-center mt-8 pb-3">
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="px-6 py-3 bg-[#FDFDE5] rounded-full hover:bg-gray-50 disabled:opacity-50 transition-all duration-300 flex items-center gap-2"
            >
              {loadingMore ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900" />
                  Loading more...
                </>
              ) : (
                <>
                  <span>Load More Destinations</span>
                  <RightArrowIcon color="#414141" className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}

        {loadingMore && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <DestinationSkeleton key={`loading-more-${index}`} />
            ))}
          </div>
        )}

        {!hasMore && destinations.length > 0 && (
          <div className="text-center text-gray-600 mt-8">
            No more destinations available
          </div>
        )}

        {!loading && destinations.length === 0 && (
          <div className="text-center text-red-500 mt-8">
            No destinations found. Please try different preferences.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DestinationSelection;
