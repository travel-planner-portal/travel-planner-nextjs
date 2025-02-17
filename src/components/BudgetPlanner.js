import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { useGoogleMapsApi } from "../hooks/useGoogleMapsApi";
import { addUserData } from "../action/userDataAction";
import { updatePageURL } from "../action/otherAction";
import {
  MinusIcon,
  PlusIcon,
  RefreshCircleIcon,
  RightArrowIcon,
  RupeeCircleIcon,
  SearchIcon,
  SparkleIcon,
  SparkleNonFillIcon,
} from "../assets/images";
import { getTrendingTrips } from "../network/networkCalls";
import { useCustomAutocomplete } from "../hooks/useCustomAutocomplete";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { store } from "@/store/store";
import RoadTripPlanner from "@/app/roadtrip/page";

const BudgetPlanner = ({ inputData, defaultTab }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(tab || defaultTab || "discover");
  useEffect(() => {
    if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    window.history.pushState({}, "", url);
    onClose();
  };

  const updateURLWithTab = (tab) => {
    const currentURL = new URL(window.location.href);
    currentURL.searchParams.set("tab", tab);
    history.pushState({}, "", currentURL.toString());
  };

  useEffect(() => {
    const handleURLChange = () => {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      if (tabParam) {
        setActiveTab(tabParam);
      }
    };

    window.addEventListener("popstate", handleURLChange);
    return () => window.removeEventListener("popstate", handleURLChange);
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      addUserData({
        budget: null,
        duration: null,
        destination: null,
        startDate: null,
        endDate: null,
        path: activeTab === "discover" ? "Discover" : "Destination",
      })
    );
  }, [activeTab, dispatch]);

  return (
    <div>
      <div className="w-full px-4 md:px-6 flex flex-col items-center  mt-[86px]">
        <div className="flex flex-col items-center justify-center gap-2 w-full max-w-3xl">
          <div className="relative">
            <div className="absolute md:-top-4 -left-3 -top-3">
              <SparkleNonFillIcon />
            </div>
            <p className="text-darkBlack text-2xl sm:text-[36px] font-rubikmedium_500 tracking-[-1.44px] text-center">
              AI Trip planner
            </p>
          </div>
          <p className="text-darkBlack text-sm sm:text-[16px] font-rubikregular_400 text-center">
            Confused About Your Travel Destination?
          </p>
        </div>

        <div className="mt-4 sm:mt-6 w-full max-w-xs sm:max-w-md">
          <div className="bg-[rgba(213,255,73,0.16)] p-1.5 rounded-[50px] flex flex-wrap gap-1 sm:gap-2 justify-center">
            {["discover", "destination", "roadtrip"].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  const url = new URL(window.location.href);
                  url.searchParams.set("tab", tab);
                  window.history.pushState({}, "", url);
                }}
                className={`relative flex px-4 sm:px-5 py-2 sm:py-3 rounded-[40px] text-sm sm:text-[14px] font-rubikmedium_500 capitalize transition-colors
        ${
          activeTab === tab ? "text-white" : "text-gray-500 hover:text-gray-700"
        }`}
                whileHover={activeTab !== tab ? { scale: 1.02 } : {}}
                whileTap={{ scale: 0.98 }}
              >
                {activeTab === tab && (
                  <motion.div
                    className="absolute inset-0 bg-darkBlack rounded-[40px]"
                    layoutId="activeTab"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-0">
                  {tab === "roadtrip" ? "Road Trip" : tab}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {activeTab === "discover" ? (
              <Discover inputData={inputData} />
            ) : activeTab === "destination" ? (
              <Destination inputData={inputData} />
            ) : (
              <RoadTripPlanner inputData={inputData} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const Discover = ({ inputData }) => {
  const dispatch = useDispatch();
  const [days, setDays] = useState(inputData?.duration || "");
  const [budget, setBudget] = useState(inputData?.budget || "");
  const [errors, setErrors] = useState({ days: "", budget: "" });
  const router = useRouter();

  const MAX_DAYS = 10;
  const MIN_BUDGET = 1000;
  const MAX_BUDGET = 1000000;

  const validateDays = (value) => {
    if (value < 1) {
      return "Duration must be at least 1 day";
    }
    if (value > MAX_DAYS) {
      return `Duration cannot exceed ${MAX_DAYS} days`;
    }
    return "";
  };

  const validateBudget = (value) => {
    if (!value) return "";
    const numValue = Number(value);
    if (isNaN(numValue)) {
      return "Please enter a valid number";
    }
    if (numValue < MIN_BUDGET) {
      return `Budget must be at least ₹${MIN_BUDGET.toLocaleString()}`;
    }
    if (numValue > MAX_BUDGET) {
      return `Budget cannot exceed ₹${MAX_BUDGET.toLocaleString()}`;
    }
    return "";
  };

  const handleDaysChange = (increment) => {
    setDays((prev) => {
      const newValue = (prev || 0) + increment;
      const error = validateDays(newValue);
      setErrors((prevErrors) => ({ ...prevErrors, days: error }));
      return newValue >= 1 && newValue <= MAX_DAYS ? newValue : prev;
    });
  };

  const handleBudgetChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");

    if (value === "") {
      setBudget("");
      setErrors((prevErrors) => ({ ...prevErrors, budget: "" }));
      return;
    }

    const numValue = Number(value);
    if (numValue <= MAX_BUDGET) {
      setBudget(value);
      const error = validateBudget(numValue);
      setErrors((prevErrors) => ({ ...prevErrors, budget: error }));
    }
  };

  const handleBudgetKeyDown = (e) => {
    if (
      [46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
      (e.keyCode === 65 && e.ctrlKey === true) ||
      (e.keyCode === 67 && e.ctrlKey === true) ||
      (e.keyCode === 86 && e.ctrlKey === true) ||
      (e.keyCode >= 35 && e.keyCode <= 39)
    ) {
      return;
    }
    if (
      (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("text");
    if (!/^\d*$/.test(pastedData)) {
      e.preventDefault();
    }
  };

  const handleProceed = () => {
    const daysError = validateDays(days);
    const budgetError = validateBudget(budget);

    setErrors({ days: daysError, budget: budgetError });

    if (!daysError && !budgetError && days && budget) {
      const currentState = store.getState().userData;
      dispatch(
        addUserData({
          ...currentState,
          duration: days,
          budget: Number(budget),
          path: "Discover",
        })
      );

      router.push("/interestpage");
    }
  };
  return (
    <div className="flex w-full flex-col items-center justify-start gap-4 mt-12">
      <div className="md:w-[528px] w-full">
        <div className="flex items-center gap-2 mb-4">
          <SparkleIcon color={"#8CB500"} />
          <h1 className="text-xl sm:text-[28px] tracking-[-1.12px] text-[#8CB500] font-rubikregular_400">
            Plan with us, we'll find!
          </h1>
        </div>

        <motion.div
          className="px-4 sm:px-10 py-4 sm:py-5 bg-[#F3FFC9] rounded-[28px] w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="pb-4 sm:pb-[22px] border-b border-dashed border-[#8CB5004D] flex flex-col gap-4 sm:gap-[18px]">
            <div className="flex flex-row items-center justify-start gap-3 sm:gap-4">
              <RefreshCircleIcon />
              <span className="text-base sm:text-[20px] font-rubikregular_400 tracking-[-0.8px] text-darkBlack">
                How long can you travel (in days)?
              </span>
            </div>
            <div className="flex flex-col gap-2 pl-4 sm:pl-10">
              <div className="flex items-center">
                <div className="flex items-center gap-3 sm:gap-5">
                  <motion.button
                    onClick={() => handleDaysChange(-1)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <MinusIcon />
                  </motion.button>
                  <span className="w-[90px] text-base sm:text-[20px] text-[#BCBCBC] font-rubikregular_400 tracking-[-0.8px] text-center">
                    {days ? String(days).padStart(2, "0") : "Add Days"}
                  </span>
                  <motion.button
                    onClick={() => handleDaysChange(1)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <PlusIcon />
                  </motion.button>
                </div>
                <span className="text-base sm:text-[20px] text-[#6D6D6D] font-rubikregular_400 tracking-[-0.8px] ml-2">
                  days
                </span>
              </div>
              {errors.days && (
                <span className="text-red-500 text-sm">{errors.days}</span>
              )}
            </div>
          </div>

          <div className="py-4 sm:py-5 flex flex-col items-start justify-start gap-4 sm:gap-[18px]">
            <div className="flex flex-row items-center justify-start gap-3 sm:gap-4">
              <RupeeCircleIcon />
              <span className="text-base sm:text-[20px] font-rubikregular_400 tracking-[-0.8px] text-darkBlack">
                What's your travel budget?
              </span>
            </div>

            <div className="flex flex-col gap-2 pl-4 sm:pl-10">
              <div className="flex items-center justify-start gap-3 sm:gap-5">
                <input
                  type="text"
                  inputMode="numeric"
                  value={budget}
                  onChange={handleBudgetChange}
                  onKeyDown={handleBudgetKeyDown}
                  onPaste={handlePaste}
                  className={`text-base sm:text-[20px] text-[#BCBCBC] font-rubikregular_400 tracking-[-0.8px] bg-transparent border-none outline-none ${
                    budget ? "w-[120px]" : "w-[115px]"
                  }`}
                  placeholder="Enter budget"
                />
                <span className="text-base sm:text-[20px] text-[#6D6D6D] font-rubikregular_400 tracking-[-0.8px]">
                  ₹ / person
                </span>
              </div>
              {errors.budget && (
                <span className="text-red-500 text-sm">{errors.budget}</span>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.button
        onClick={handleProceed}
        disabled={!days || !budget || errors.days || errors.budget}
        className="bg-darkBlack mt-4 md:mt-0 cursor-pointer disabled:bg-opacity-50 disabled:cursor-not-allowed flex flex-row items-center justify-center gap-2 sm:gap-3 text-white py-2 px-6 sm:px-7 rounded-[50px] text-base sm:text-[20px] font-rubikmedium_500 tracking-[-0.8px]"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Proceed
        <RightArrowIcon />
      </motion.button>
    </div>
  );
};

const DestinationCardSkeleton = () => {
  return (
    <div className="p-4 sm:p-6 flex flex-row items-center justify-between gap-3 sm:gap-5 rounded-[34px] w-full bg-[#f0f0f0] animate-pulse">
      <div className="w-full">
        <div className="h-6 sm:h-8 bg-gray-200 rounded-md w-3/4 mb-2"></div>
        <div className="h-4 sm:h-5 bg-gray-200 rounded-md w-1/2"></div>
      </div>
      <div className="p-2 sm:p-4 w-8 sm:w-12 aspect-square rounded-full bg-gray-200 shrink-0"></div>
    </div>
  );
};

export const SkeletonGrid = () => {
  return (
    <>
      {[1, 2, 3, 4].map((item) => (
        <DestinationCardSkeleton key={item} />
      ))}
    </>
  );
};

const Destination = ({ inputData }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(inputData?.destination || "");
  const searchInputRef = useRef(null);
  const [destinationCards, setDestinationCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { isLoaded, loadError } = useGoogleMapsApi({
    libraries: ["places"],
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  const handlePlaceSelect = (address) => {
    setSearchQuery(address);
    handleProceedDestination(address);
  };
  useCustomAutocomplete(searchInputRef, handlePlaceSelect, isLoaded);
  useEffect(() => {
    const fetchTrendingTrips = async () => {
      try {
        setIsLoading(true);
        const response = await getTrendingTrips();

        if (response.success) {
          setDestinationCards(
            response.data.map((trip) => ({
              title: trip.tripName,
              placetype: trip.famousFor,
              bgColor: trip.cardBgColor,
              arrowBgColor: adjustColor(trip.cardBgColor, -20),
              placetypeColor: adjustColor(trip.cardBgColor, -40),
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching trending trips:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingTrips();
  }, []);

  const adjustColor = (hex, percent) => {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;
    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  };

  if (loadError) {
    return (
      <div className="text-red-500 p-4 text-center">
        Error loading Google Maps API: {loadError.message}
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
      </div>
    );
  }

  const handleProceedDestination = (title) => {
    if (title) {
      dispatch(addUserData({ destination: title }));
      router.push("/dates");
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-start gap-4 mt-12 md:px-4">
      <div className="flex flex-col items-center justify-start w-full max-w-md md:max-w-2xl mx-auto">
        <div className="flex items-center gap-2 w-full">
          <SparkleIcon color="#CA8E52" />
          <h1 className="text-xl sm:text-[28px] tracking-[-1.12px] text-[#CA8E52] font-rubikregular_400">
            Where are you traveling next?
          </h1>
        </div>
        <motion.div
          className="p-3 sm:p-[18px] gap-2 flex items-center w-full bg-[#F7EFE7] rounded-tl-[28px] rounded-tr-[28px] rounded-bl-[40px] rounded-br-[40px] mt-4 sm:mt-7"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <SearchIcon className="shrink-0" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter a city or a place you want"
            className="bg-transparent outline-none border-none text-lg sm:text-[24px] font-rubikregular_400 tracking-[-0.96px] text-[#9E9994] w-full md:w-[400px]"
          />
        </motion.div>
      </div>

      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-[58px] w-full max-w-6xl">
        {isLoading ? (
          <SkeletonGrid />
        ) : (
          destinationCards.map((card, index) => (
            <DestinationNameCard
              key={index}
              tittle={card.title}
              placetype={card.placetype}
              placetypeColor={card.placetypeColor}
              bgColor={card.bgColor}
              arrowBgColor={card.arrowBgColor}
              handleProceedDestination={handleProceedDestination}
            />
          ))
        )}
      </motion.div>
    </div>
  );
};

const DestinationNameCard = ({
  bgColor,
  tittle,
  placetype,
  placetypeColor,
  arrowBgColor,
  handleProceedDestination,
}) => {
  return (
    <motion.button
      onClick={() => handleProceedDestination(tittle)}
      className="p-4 sm:p-6 flex flex-row items-center justify-between gap-3 sm:gap-5 rounded-[34px] w-full"
      style={{ backgroundColor: bgColor }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1 }}
    >
      <div>
        <p className="text-base sm:text-[24px] font-rubikregular_400 tracking-[0.48px] text-darkBlack text-left">
          {tittle}
        </p>
        <p
          className="text-sm sm:text-[16px] font-rubikregular_400 text-left"
          style={{ color: placetypeColor }}
        >
          {placetype}
        </p>
      </div>
      <motion.div
        className="p-2 sm:p-4 w-8 sm:w-auto aspect-square flex flex-col items-center justify-center rounded-full"
        style={{ backgroundColor: arrowBgColor }}
        whileHover={{ rotate: 0 }}
        initial={{ rotate: -45 }}
      >
        <RightArrowIcon color="#2E2B36" />
      </motion.div>
    </motion.button>
  );
};

export default BudgetPlanner;
