"use client";

import React, { useState, useEffect } from "react";
import { useNavigationContext } from "../../context/NavigationContext";
import { User, Users, Heart, UserPlus, X } from "lucide-react";
import { LeftAngleArrowIcon, RightArrowIcon } from "../../assets/images";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { updatePageURL } from "../../action/otherAction";
import { useDispatch, useSelector } from "react-redux";
import { addExploreType, addUserData } from "../../action/userDataAction";
import { useTripPreferences } from "../../hooks/useTripPreferences";
import { LoadingSkeleton } from "../../components/ui/LoadingSkeleton";
import { cacheInterests } from "../../action/otherAction";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { store } from "@/store/store";

const iconMapping = {
  solo: User,
  partner: Heart,
  friends: Users,
  family: UserPlus,
  college: Users,
};

const ErrorMessage = ({ message, onRetry }) => (
  <div className="w-full flex flex-col items-center justify-center min-h-[400px] space-y-4">
    <p className="text-red-500">{message}</p>
    <button
      onClick={onRetry}
      className="px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800"
    >
      Try Again
    </button>
  </div>
);

const page = ({ inputData }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { setPlanData } = useNavigationContext();

  const [exploreName, setExploreName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const { preferences, loading, error, refetch } = useTripPreferences();
  const reduxExploreTypes = useSelector((state) => state.userData.exploreTypes);
  const currentUserData = useSelector((state) => state.userData);
  const interestsCache = useSelector((state) => state.pageURL.interestsCache);
  const initialFetchDone = useSelector(
    (state) => state.userData.initialFetchDone
  );

  const currentState = useSelector((state) => state.userData);
  const [tripType, setTripType] = useState(currentState?.tripType || "");
  const [interests, setInterests] = useState(currentState?.interest || []);

  const onBack = () => {
    dispatch(
      addUserData({
        tripType: tripType,
        interest: interests,
      })
    );

    if (currentState?.path === "Destination") {
      router.push("/dates");
    } else {
      router.push("/");
    }
  };
  useEffect(() => {
    if (inputData?.tripType) {
      setTripType(inputData.tripType);
    }
    if (inputData?.interest?.length > 0) {
      setInterests(inputData.interest);
    }
  }, [inputData]);

  const exploreTypes = [
    ...(preferences?.exploreTypes?.main?.map((type) => ({
      id: type.key,
      label: ` ${type.label}`,
    })) || []),
    ...(reduxExploreTypes || []).map((type) => ({
      id: type.key,
      label: ` ${type.label}`,
    })),
  ].filter(
    (type, index, self) => index === self.findIndex((t) => t.id === type.id)
  );

  const handleAddClick = () => {
    setShowInput(true);
  };
  const containsProfanity = (text) => {
    const profanityList = preferences?.profanityList || [];
    const sanitizedText = text.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, "");
    const words = sanitizedText.split(/\s+/);

    return words.some((word) =>
      profanityList.some(
        (badWord) => word.includes(badWord) || badWord.includes(word)
      )
    );
  };

  const handleCreateExploreType = (e) => {
    e.preventDefault();

    const trimmedName = exploreName.trim();
    if (!trimmedName || trimmedName.length < 2) {
      toast.error("Interest name must be at least 2 characters");
      return;
    }

    if (containsProfanity(trimmedName)) {
      toast.error("Please use appropriate language for interest names");
      setExploreName("");
      return;
    }
    const allTypes = [...exploreTypes.map((type) => type.label.toLowerCase())];
    if (allTypes.includes(trimmedName.toLowerCase())) {
      toast.error("This interest already exists");
      return false;
    }

    setIsSubmitting(true);
    try {
      const newKey = trimmedName.toLowerCase().replace(/\s+/g, "-");
      const exploreTypeData = {
        key: newKey,
        label: trimmedName,
        icon: "✨",
        order: Date.now(),
        category: "main",
      };

      dispatch(addExploreType(exploreTypeData));
      const newType = {
        id: exploreTypeData.key,
        label: exploreTypeData.label,
        key: exploreTypeData.key,
        icon: exploreTypeData.icon,
      };
      const updatedExploreTypes = [...(reduxExploreTypes || []), newType];
      dispatch(addUserData({ exploreTypes: updatedExploreTypes }));

      setInterests((prev) => {
        if (!prev.includes(newKey)) {
          return [...prev, newKey];
        }
        return prev;
      });
      setExploreName("");
      setShowInput(false);
      toast.success("Interest added successfully");
    } catch (error) {
      toast.error("Failed to add interest");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleExploreNameChange = (e) => {
    const value = e.target.value;
    setExploreName(value);
  };

  const handleInterestClick = (id) => {
    setInterests((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      }
      return [...prev, id];
    });
  };

  const handleProceed = () => {
    const currentState = store.getState().userData;
    console.log("currentState", currentState);
    if (!tripType) {
      toast.error("Please select a trip type");
      return;
    } else if (interests.length === 0) {
      toast.error("Please select at least one interest");
      return;
    }
    dispatch(
      addUserData({
        ...currentState,
        interest: interests,
        tripType: tripType,
        exploreTypes: reduxExploreTypes || [],
      })
    );

    if (currentState?.path?.toLowerCase() === "destination") {
      console.log("Destination path");
      const formattedDestination = currentState.destination
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      console.log(
        "Navigate to",
        `/tripdetailspage/${formattedDestination}-${currentState.duration || 0}`
      );
      router.push(
        `/tripdetailspage/${formattedDestination}-${currentState.duration || 0}`
      );
    } else {
      console.log("Discover path");
      router.push("/trips");
    }
  };

  const handleSkip = () => {
    if (inputData?.path === "Discover") {
      router.push("/trips");
    } else {
      navigate(`/trips/${inputData?.destination}`);
    }
  };

  useEffect(() => {
    if (interestsCache && interestsCache.params) {
      const { tripType: cachedTripType, interest: cachedInterests } =
        interestsCache.params;
      const currentParams = {
        tripType,
        interest: interests,
      };

      if (
        cachedTripType === currentParams.tripType &&
        JSON.stringify(cachedInterests) ===
          JSON.stringify(currentParams.interest)
      ) {
        setInterests(interestsCache.data);
      } else {
        dispatch(
          cacheInterests({
            data: interests,
            params: {
              tripType,
              interest: interests,
            },
          })
        );
      }
    }
  }, [interestsCache, tripType, interests, dispatch]);

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  const tripTypes =
    preferences?.tripTypes?.map((type) => ({
      id: type.key,
      label: type.label,
      icon: iconMapping[type.key.toLowerCase()] || User,
    })) || [];

  return (
    <div className="container background-image-homepage flex flex-col items-center max-w-[88rem] md:w-[80%] mx-auto px-4 md:px-6 pb-6 pt-[9px] md:pt-[28px]">
      <button
        onClick={onBack}
        className="mb-6 md:mb-8 mt-16 flex items-center justify-start self-start gap-2 md:gap-5 text-gray-600 hover:text-gray-900"
      >
        <div className="scale-50 md:scale-75">
          <LeftAngleArrowIcon />
        </div>
        <span className="text-darkBlack text-[16px] md:text-[28px] font-rubikregular_500 tracking-[-0.56px] md:tracking-[-1.12px]">
          {inputData?.path === "Destination" ? inputData?.destination : "Back"}{" "}
        </span>
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-8 md:space-y-12 w-full max-w-4xl md:pl-[10vw]"
      >
        <div className="flex flex-col items-start justify-start gap-4 md:gap-7">
          <h2 className="text-darkBlack text-[16px] md:text-[20px] font-rubikregular_400 leading-[20px] md:leading-[26px]">
            What kind of trip are you planning?
          </h2>
          <div className="flex flex-row items-center justify-start flex-wrap gap-2 md:gap-5">
            {tripTypes.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTripType((prev) => (prev === id ? "" : id))}
                className={`px-3 leading-auto py-1.5 md:px-4 md:py-2 rounded-full flex flex-row items-center justify-center gap-1.5 md:gap-2 border border-solid transition-all ${
                  tripType === id
                    ? "border-[#88B537] bg-[#F3FFCC]"
                    : "border-gray-200 hover:border-[#88B537]"
                }`}
              >
                <Icon className="w-3 h-3 md:w-4 md:h-4" />
                <span className="text-[14px] md:text-[16px] font-rubikregular_400 leading-[18px] md:leading-[20px]">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start justify-start gap-4 md:gap-7">
          <h2 className="text-darkBlack text-[16px] md:text-[20px] font-rubikregular_400 leading-[20px] md:leading-[26px]">
            What do you want to explore?
          </h2>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {exploreTypes.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => handleInterestClick(id)}
                className={`px-3 py-1.5 md:px-4 md:py-2 text-[14px] md:text-[16px] leading-[18px] md:leading-[20px] rounded-full text-darkBlack font-rubikregular_400 border border-solid transition-all ${
                  interests.includes(id)
                    ? "border-[#88B537] bg-[#F3FFCC]"
                    : "border-gray-200 hover:border-[#88B537]"
                }`}
              >
                {label}
              </button>
            ))}
            {showInput ? (
              <form
                onSubmit={handleCreateExploreType}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  onChange={handleExploreNameChange}
                  value={exploreName}
                  placeholder="Write your interest here"
                  className="px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-gray-200 text-[14px] md:text-[16px] leading-[18px] md:leading-[20px] focus:outline-none focus:border-[#88B537] min-w-[200px]"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={isSubmitting || !exploreName.trim()}
                  className="px-4 py-1.5 md:py-2 rounded-full bg-[#88B537] text-white text-[14px] md:text-[16px] leading-[18px] md:leading-[20px] disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Add
                </button>
              </form>
            ) : (
              <button
                onClick={handleAddClick}
                className="px-3 py-1.5 md:px-4 md:py-2 rounded-full border-2 border-dashed text-[14px] md:text-[16px] leading-[18px] md:leading-[20px] border-[#6F7C8E] hover:border-gray-400"
              >
                + Add additional
              </button>
            )}
          </div>
        </div>
      </motion.div>

      <div className="flex flex-row items-center gap-6 md:gap-14 bottom-8 md:bottom-[15vh] mt-16">
        <button
          onClick={handleProceed}
          disabled={!tripType || interests.length === 0}
          className="bg-darkBlack flex flex-row items-center justify-center gap-2 md:gap-3 text-white py-1.5 md:py-2 px-5 md:px-7 rounded-[50px] text-[16px] md:text-[20px] font-rubikmedium_500 tracking-[-0.64px] md:tracking-[-0.8px] disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Proceed
          <RightArrowIcon className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>
    </div>
  );
};

export default page;
