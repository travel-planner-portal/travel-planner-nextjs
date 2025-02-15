import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import {
  LeftAngleArrowIcon,
  SmallClockIcon,
  SmallMapPin,
  VideoIcon,
} from "../../assets/images";
import ImageGalleryModal from "./ImageGalleryModal";
import VideoModal from "./VideoModal";

const DetailItinerayTabs = ({
  trip,
  setExpandedDay,
  expandedDay,
  totalDays,
  onLoadMore,
  isLoading,
}) => {
  const [showVideos, setShowVideos] = useState(false);

  if (!trip || !trip.days) {
    return <div>Loading trip details...</div>;
  }

  const allDays = Array.from({ length: totalDays }, (_, i) => i + 1);
  const loadedDays = trip.days.map((day) => day.day);

  const handleDayClick = (dayNum) => {
    console.log("handleDayClick", dayNum);
    if (!loadedDays.includes(dayNum)) {
      onLoadMore?.();
    } else {
      setExpandedDay(dayNum);
    }
  };

  return (
    <>
      <div className="mt-[32px] pb-[18px]  border-b border-solid border-[#BCBCBC] overflow-x-auto scrollbar-hide  flex w-full flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-start w-[calc(100%-3rem)] md:w-[calc(100%-20rem)] overflow-x-auto scrollbar-hide  ">
          {allDays.map((dayNum) => {
            const isLoaded = loadedDays.includes(dayNum);
            return (
              <button
                onClick={() => !isLoading && handleDayClick(dayNum)}
                key={dayNum}
                disabled={isLoading}
                className={`px-3 py-[6px]  cursor-pointer border border-solid ${
                  dayNum === 1 ? "rounded-l-full" : ""
                } ${dayNum === totalDays ? "rounded-r-full" : ""}
              ${
                expandedDay === dayNum
                  ? "border-normalTextColor"
                  : "border-lightBlack"
              }
              ${!isLoaded ? "opacity-50 cursor-not-allowed" : ""}
              whitespace-nowrap
              `}
              >
                <p
                  className={`text-[16px] ${
                    expandedDay === dayNum
                      ? "text-normalTextColor font-rubikmedium_500"
                      : "text-lightBlack font-rubikregular_400"
                  }`}
                >
                  Day {dayNum}
                </p>
              </button>
            );
          })}
        </div>
        <button
          onClick={() => setShowVideos(true)}
          className="flex items-center px-4 py-2 bg-[#FDFDE5] rounded-full hover:bg-gray-50 transition ml-4 border border-[#E5DD64]"
        >
          {/* <div className="md:flex hidden"> */}
          <VideoIcon />
          {/* </div> */}
          <span className="text-sm text-[#414141] font-medium ml-2 md:flex hidden">
            Watch videos
          </span>
        </button>
      </div>

      <VideoModal
        isOpen={showVideos}
        onClose={() => setShowVideos(false)}
        location={trip.destination}
      />

      {trip.days.map((day) => (
        <DaySectionAccordian
          key={day.day}
          {...day}
          isExpanded={expandedDay === day.day}
          onToggle={() =>
            setExpandedDay(expandedDay === day.day ? null : day.day)
          }
        />
      ))}
    </>
  );
};

const DaySectionAccordian = ({
  day,
  title,
  description,
  activities,
  isExpanded,
  onToggle,
}) => (
  <div className="border-b border-[#EFEFEF] last:border-b-0">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between pt-[33px] pb-4"
    >
      <div className="flex flex-row items-start  justify-start gap-2">
        <div
          className={`scale-50 ${
            isExpanded ? "-rotate-90" : "rotate-90"
          } pt-[2px] md:pt-2`}
        >
          <LeftAngleArrowIcon />
        </div>
        <div className="flex flex-row items-start justify-start gap-4">
          <span className="text-[16px] leading-[21px] md:text-[20px] font-rubikregular_400 md:leading-[26px] tracking-[-0.8px] text-[#818181] whitespace-nowrap">
            Day {day}
          </span>
          <h3 className="md:text-[20px] text-[16px] leading-[20px] md:leading-[26px] font-rubikmedium_500 tracking-[0.4px] text-lightBlack text-left">
            {title}
          </h3>
        </div>
      </div>
    </button>
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          {description && (
            <p className="text-[#414141] text-[16px] mb-6 px-4">
              {description}
            </p>
          )}
          <div className="flex flex-col gap-4 pb-6">
            {activities.map((activity, index) => (
              <ActivityCard key={index} {...activity} />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const ActivityCard = ({ name, location, time, image, details }) => {
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const formatTimings = (timeString) => {
    return timeString.split(",").map((slot) => slot.trim());
  };

  return (
    <>
      <div className="flex w-full gap-4 p-3 bg-[#FEFEF8] border border-solid border-[#EFEFEF] rounded-[16px] flex-row items-start justify-between shadow-sm">
        <div className="flex flex-row items-center justify-start gap-5">
          <img
            src={image || "/images/placeholder.jpg"}
            alt={name}
            className="w-[89px] h-[59px] md:w-[110px] md:h-[73px] rounded-[8px] object-cover md:flex hidden"
          />
          <div className="flex flex-col items-start justify-start gap-2">
            <div className="flex items-start md:items-center gap-[6px] md:gap-2">
              <div className="scale-75 md:scale-100 flex flex-col items-center justify-center">
                <SmallMapPin />
              </div>

              <h3 className="text-darkBlack font-rubikregular_400 text-[16px] md:text-[20px] leading-[20px] md:leading-[26px]">
                {name}
              </h3>
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
              <SmallClockIcon />
              <span className="text-lightBlack font-rubikregular_400 text-[11px] md:text-[14px]">
                {time}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowOffCanvas(true)}
          className="md:px-3 px-[9.659px] py-[4.83px] md:py-[6px] text-[11px] md:text-[14px] text-lightBlack font-rubikregular_400 border border-solid border-lightBlack rounded-full hover:bg-gray-50"
        >
          Details
        </button>
      </div>

      {showOffCanvas && (
        <>
          <div
            className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 overflow-y-auto ${
              showOffCanvas ? "translate-x-0" : "translate-x-full"
            } z-50 ${window.innerWidth < 768 ? "w-[100vw]" : "w-[50vw]"}`}
          >
            <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
              <img
                src={image || "/images/placeholder.jpg"}
                alt={name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent hidden md:block"></div>
              <div className="absolute top-0 left-0 w-full py-[16px] px-[16px] md:py-[32px] md:px-[32px] flex justify-between items-center">
                <button
                  onClick={() => setShowOffCanvas(false)}
                  className="text-black bg-white flex text-sm rounded-[24px] gap-2 items-center py-[6px] px-[12px]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Close
                </button>
              </div>
              <div className="absolute bottom-0 left-0 w-full py-[24px] px-[32px] flex justify-between items-center hidden md:flex">
                <div className="flex items-center text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-[28px] font-[600]">{name}</span>
                </div>
                <button
                  onClick={() => setShowGallery(true)}
                  className="text-black bg-white flex text-sm rounded-[24px] gap-2 items-center py-[6px] px-[12px]"
                >
                  <svg
                    width="14"
                    height="11"
                    viewBox="0 0 14 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.99967 10.871C4.78856 10.871 4.58856 10.8237 4.39967 10.729C4.21079 10.6343 4.05523 10.5039 3.93301 10.3377L0.333008 5.53768L3.93301 0.737679C4.05523 0.571012 4.21079 0.440568 4.39967 0.346346C4.58856 0.252123 4.78856 0.20479 4.99967 0.204346H12.333C12.6997 0.204346 13.0137 0.33479 13.275 0.595679C13.5363 0.856568 13.6668 1.17057 13.6663 1.53768V9.53768C13.6663 9.90435 13.5359 10.2183 13.275 10.4797C13.0141 10.741 12.7001 10.8715 12.333 10.871H4.99967Z"
                      fill="#2E2B36"
                    />
                  </svg>
                  View Images
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-[26px] px-[16px] pt-[24px]">
              <div className="flex justify-between items-center md:hidden border-b pb-[8px]">
                <div className="flex items-start ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 mt-[5px]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-[20px] text-[#414141] font-[600]">
                    {name}
                  </span>
                </div>
              </div>

              <div className="bg-white pb-[24px] pt-[0px] flex flex-col gap-[28px]">
                {details?.openingHours && (
                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[#818181] text-[14px] font-[600] leading-[17px]">
                      Open close time
                    </p>
                    <div className="flex flex-col gap-[4px]">
                      {formatTimings(details.openingHours).map(
                        (timeSlot, index) => (
                          <p
                            key={index}
                            className="text-[#414141] text-[16px] font-normal"
                          >
                            {timeSlot}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                )}

                {details?.description && (
                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[#818181] text-[14px] font-[600] leading-[17px]">
                      Description
                    </p>
                    <p className="text-[#414141] text-[16px] font-normal">
                      {details.description}
                    </p>
                  </div>
                )}

                {details?.location && (
                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[#818181] text-[14px] font-[600] leading-[17px]">
                      Location
                    </p>
                    <p className="text-[#414141] text-[16px] font-normal">
                      {details.location}
                    </p>
                  </div>
                )}

                {details?.tips && (
                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[#818181] text-[14px] font-[600] leading-[17px]">
                      Tips
                    </p>
                    <p className="text-[#414141] text-[16px] font-normal">
                      {details.tips}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowOffCanvas(false)}
          />
        </>
      )}

      <ImageGalleryModal
        isOpen={showGallery}
        onClose={() => setShowGallery(false)}
        images={[
          {
            id: 1,
            url: image || "/images/placeholder.jpg",
            alt: name,
          },
        ]}
      />
    </>
  );
};

export default DetailItinerayTabs;
