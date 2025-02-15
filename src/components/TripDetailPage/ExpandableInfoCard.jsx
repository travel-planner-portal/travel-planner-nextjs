import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  FoodIcon,
  LocationIcon,
  StayIcon,
  LeftAngleArrowIcon,
} from "../../assets/images";
import { getTravelInfo } from "../../network/networkCalls";
import { useDispatch, useSelector } from "react-redux";
import {
  cacheTravelInfo,
  setInitialFetchDoneTravelInfo,
} from "../../action/otherAction";

const LoadingSkeleton = () => (
  <div className="flex md:flex-row flex-col items-start justify-start gap-4 w-full max-w-5xl mt-4">
    {[1, 2, 3].map((index) => (
      <div
        key={index}
        className="flex w-full md:w-auto items-start gap-4 rounded-[16px] border border-solid border-[#EFEFEF] bg-[rgba(249,249,249,0.50)]"
      >
        <div className="p-4 w-full">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="w-5 h-5 rounded bg-gray-200 animate-pulse" />
          </div>
          <div className="mt-4 pl-12">
            <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const ExpandableInfoCard = ({
  destination,
  fromsavestrippage,
  saveTripData,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [travelInfo, setTravelInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const travelInfoCache = useSelector((state) => state.pageURL.travelInfoCache);
  const initialFetchDoneTravelInfo = useSelector(
    (state) => state.userData.initialFetchDoneTravelInfo
  );

  useEffect(() => {
    if (fromsavestrippage && saveTripData?.travelInfo) {
      setTravelInfo(saveTripData.travelInfo);
      return;
    }
    const fetchTravelInfo = async () => {
      if (!destination) return;
      if (
        initialFetchDoneTravelInfo &&
        travelInfoCache?.data &&
        travelInfoCache.params?.destination === destination
      ) {
        setTravelInfo(travelInfoCache.data);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const info = await getTravelInfo(destination);

        if (info) {
          setTravelInfo(info);
          dispatch(
            cacheTravelInfo({
              data: info,
              params: { destination },
            })
          );
          dispatch(setInitialFetchDoneTravelInfo(true));
        }
      } catch (error) {
        console.error("Error fetching travel info:", error);
        setError("Failed to load travel information");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTravelInfo();
  }, [
    destination,
    dispatch,
    initialFetchDoneTravelInfo,
    travelInfoCache,
    fromsavestrippage,
    saveTripData,
  ]);

  if (isLoading) return <LoadingSkeleton />;
  if (error)
    return <div className="w-full text-center text-red-500 p-4">{error}</div>;
  if (!travelInfo) return null;

  return (
    <div className="w-full mt-[36px] md:mt-[48px]">
      <div
        className="flex items-center gap-2 mb-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={`${
            isOpen ? "rotate-90" : "rotate-180"
          } scale-50 duration-300 ease-in-out`}
        >
          <LeftAngleArrowIcon />
        </div>
        <h2 className="text-[#818181] text-[20px] font-rubikregular_400 leading-[26px] tracking-[-0.8px]">
          Travel Information
        </h2>
      </div>

      {isOpen && (
        <div className="flex md:flex-row flex-col items-start justify-start gap-4 w-full">
          <Section
            icon={<FoodIcon />}
            title="Suggested food to try"
            items={travelInfo.suggestedFood || []}
            iconBackground="bg-gray-100"
          />
          <Section
            icon={<LocationIcon />}
            title="Must visited places & activities"
            items={travelInfo.mustVisitPlaces || []}
            iconBackground="bg-purple-50"
          />
          <Section
            icon={<StayIcon />}
            title="Places near to stay"
            items={travelInfo.placesToStay || []}
            iconBackground="bg-blue-50"
          />
        </div>
      )}
    </div>
  );
};

const Section = ({ icon, title, items = [], iconBackground }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!Array.isArray(items)) {
    console.error(`Items for section "${title}" is not an array:`, items);
    return null;
  }

  return (
    <div className="flex w-full md:w-auto items-start gap-4 rounded-[16px] border border-solid border-[#EFEFEF] bg-[rgba(249,249,249,0.50)]">
      <div className="p-4 w-full">
        <div className="flex items-center justify-between gap-[2vw]">
          <div className="flex items-center gap-3">
            <div
              className={`${iconBackground} rounded-full flex items-start justify-start`}
            >
              <span className="text-xl">{icon}</span>
            </div>
            <h4 className="text-[#818181] text-[12px] md:text-[16px] font-rubikregular_400 leading-normal md:leading-[26px]">
              {title}
            </h4>
          </div>

          <ChevronDown
            onClick={() => setIsExpanded(!isExpanded)}
            className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 cursor-pointer ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>

        <div className="mt-[3px] ml-10">
          {items.length > 0 && (
            <div className="flex flex-row items-center justify-start gap-2">
              <p className="text-[16px] md:text-[20px] text-[#818181] font-rubikmedium_500 leading-normal md:leading-[26px]">
                {items[0]}
              </p>
            </div>
          )}
        </div>

        <div
          className={`overflow-hidden transition-all duration-200 ${
            isExpanded ? "max-h-48 mt-[7px]" : "max-h-0"
          }`}
        >
          <div className="space-y-[7px] ml-10">
            {items.slice(1).map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-gray-600"
              >
                <p className="text-[16px] md:text-[20px] text-[#818181] font-rubikmedium_500 leading-normal md:leading-[26px]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandableInfoCard;
