import React, { useRef, useState } from "react";
import {
  GoogleMapIcon,
  SmallClockIcon,
  SmallMapPin,
} from "../../assets/images";
import { PenIcon } from "lucide-react";
import { useCustomAutocomplete } from "../../hooks/useCustomAutocomplete";
import { useGoogleMapsApi } from "../../hooks/useGoogleMapsApi";
import RouteInfoSkeleton from "../ui/RouteInfoSkelton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RouteInfo = ({
  modeOfTransport,
  setSelectedMode,
  selectedMode,
  isModal,
  setIsModal,
  source,
  destination,
  onSourceChange,
  routeData,
  loading,
  error,
  setActiveTab,
}) => {
  const getCurrentModeData = () => {
    if (!routeData?.routes) return null;
    const mode = selectedMode.toLowerCase();
    return routeData.routes[mode === "railway" ? "train" : mode];
  };
  const handleOpenGoogleMaps = () => {
    const mapsUrl = `https://www.google.com/maps/dir/${encodeURIComponent(
      source
    )}/${encodeURIComponent(destination)}`;
    window.open(mapsUrl, "_blank");
  };

  const modeData = getCurrentModeData();

  const handleEditSource = () => {
    setIsModal(true);
  };

  if (loading) {
    return <RouteInfoSkeleton />;
  }

  if (error) {
    return <div className="w-full text-center py-8 text-red-500">{error}</div>;
  }

  if (!source) {
    setIsModal(true);
  }

  return (
    <div className="w-full flex flex-col items-start justify-start gap-8 mt-8 relative">
      {isModal && (
        <Modal
          setIsModal={setIsModal}
          onSourceChange={onSourceChange}
          currentSource={source}
          setActiveTab={setActiveTab}
        />
      )}
      <div className="w-full flex flex-row items-center justify-between gap-4 overflow-x-auto  scrollbar-hide">
        <div className="flex flex-row items-center justify-start">
          {modeOfTransport.map((mode, index) => (
            <button
              onClick={() => setSelectedMode(mode)}
              key={index}
              className={`px-3 py-[6px] border border-solid text-[16px] 
                ${index === 0 ? "rounded-l-full" : ""}
                ${index + 1 === modeOfTransport.length ? "rounded-r-full" : ""}
                ${
                  mode === selectedMode
                    ? "border-normalTextColor text-[#414141] font-rubikmedium_500"
                    : "font-rubikregular_400 border-lightBlack text-[#818181]"
                }`}
            >
              {mode}
            </button>
          ))}
        </div>
        <div className="flex flex-row items-center justify-between gap-2">
          <button
            onClick={handleEditSource}
            className="p-[5px] border border-solid rounded-full"
          >
            <PenIcon />
          </button>
          <p className="text-[16px] font-rubikregular_400 leading-5 text-lightBlack whitespace-nowrap">
            {source}
            {/* (22 Nov, 2024) */}
          </p>
        </div>
      </div>

      {modeData && (
        <div className="grid grid-cols-12 w-full gap-[5vw]">
          <div className="col-span-12 md:col-span-6 w-full flex flex-col items-start justify-start">
            {modeData.stops.map((stop, index) => (
              <React.Fragment key={index}>
                <LocationCard
                  location={stop.location}
                  time={stop.time}
                  buttonName={
                    index === modeData.stops.length - 1
                      ? "It's your destination"
                      : "Details"
                  }
                />
                {index < modeData.stops.length - 1 && (
                  <DotVerticalLine
                    time={stop.duration?.replace(/[^0-9]/g, "") || "0"}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="col-span-12 md:col-span-6 w-full flex flex-col items-start justify-start gap-5 border border-solid border-[#F4F4F4] bg-[#FEFEF8] rounded-[16px] p-6 min-h-11">
            <div className="w-full flex flex-row items-center justify-between">
              <div className="flex flex-row items-start  justify-start gap-2">
                <div className="pt-[3px]">
                  <SmallMapPin />
                </div>
                <p className="text-darkBlack text-[22px] font-rubikmedium_500 leading-[26px] capitalize">
                  {source} to {destination}
                </p>
              </div>
              <button
                onClick={handleOpenGoogleMaps}
                className="py-[5.6px] px-2 rounded-[12px] border-solid border border-[#EFEFEF] hover:bg-gray-50 transition-colors"
              >
                <GoogleMapIcon />
              </button>
            </div>

            {selectedMode.toLowerCase() === "bus" &&
              modeData.stops[0]?.pickupPoints && (
                <div className="flex flex-col items-start justify-start gap-2">
                  <p className="text-lightBlack text-[14px] font-rubikregular_400">
                    Pickup Location
                  </p>
                  <div className="flex flex-row gap-2 flex-wrap">
                    {modeData.stops[0].pickupPoints.map((point, index) => (
                      <p
                        key={index}
                        className="px-3 py-[6px] border border-solid rounded-[16px] border-lightBlack text-[14px] text-[#414141] font-rubikregular_400 leading-[17px]"
                      >
                        {point.location} ({point.timing})
                      </p>
                    ))}
                  </div>
                </div>
              )}

            <div className="flex flex-col items-start justify-start gap-2">
              <p className="text-lightBlack text-[14px] font-rubikregular_400">
                Average Fare
              </p>
              <p className="text-[18px] text-normalTextColor font-rubikregular_400">
                {selectedMode.toLowerCase() === "flight" ? (
                  <>
                    {modeData.fare?.economy || "N/A"} -{" "}
                    {modeData.fare?.business || "N/A"}
                  </>
                ) : selectedMode.toLowerCase() === "bus" ? (
                  <>{modeData.totalFare || "N/A"}</>
                ) : (
                  <>
                    {typeof modeData.fare === "object"
                      ? `${modeData.fare?.sleeper || "N/A"} - ${
                          modeData.fare?.ac2tier || "N/A"
                        }`
                      : modeData.fare || "N/A"}
                  </>
                )}
              </p>
            </div>

            <div className="flex flex-col items-start justify-start gap-2">
              <p className="text-lightBlack text-[14px] font-rubikregular_400">
                Average time between {source} to {destination}
              </p>
              <p className="text-[18px] text-normalTextColor font-rubikregular_400">
                {modeData.averageTime}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Modal = ({ setIsModal, onSourceChange, currentSource, setActiveTab }) => {
  const searchInputRef = useRef(null);
  const [pickupAddress, setPickupAddress] = useState(currentSource || "");
  const [pickupDate, setPickupDate] = useState("");
  const { isLoaded, loadError } = useGoogleMapsApi({
    libraries: ["places"],
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  const handlePlaceSelect = (address) => {
    setPickupAddress(address);
  };

  useCustomAutocomplete(searchInputRef, handlePlaceSelect, isLoaded);

  const handleSave = () => {
    if (pickupAddress) {
      localStorage.setItem("userPickupAddress", pickupAddress);
      onSourceChange(pickupAddress);
      setIsModal(false);
    }
  };

  const handleClose = () => {
    if (!currentSource) {
      setActiveTab("detailed");
    }
    setIsModal(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-[100] backdrop-blur-sm bg-black/30" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[95%] max-w-[650px]">
        <div className="bg-[#FFFFF0] rounded-[24px] shadow-2xl border border-[#E5DD64]/20">
          <div className="flex items-center justify-between p-6 border-b border-[#E5DD64]/20">
            <h3 className="text-xl font-rubikmedium_500 text-darkBlack">
              Edit Travel Details
            </h3>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-[#E5DD64]/10 rounded-full transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
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
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  className="text-sm font-rubikregular_500 text-gray-700"
                  htmlFor="pickUpAddress"
                >
                  Pickup Address *
                </label>
                <div className="relative">
                  <input
                    ref={searchInputRef}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#E5DD64]/30 focus:border-[#E5DD64] focus:outline-none text-gray-700 font-rubikregular_400 transition-colors bg-white/50"
                    id="pickUpAddress"
                    type="text"
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    placeholder="Search for city..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-rubikregular_500 text-gray-700">
                  Travel Date
                </label>
                <div className="relative">
                  <DatePicker
                    selected={pickupDate}
                    onChange={(date) => setPickupDate(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select a date"
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#E5DD64]/30 focus:border-[#E5DD64] focus:outline-none text-gray-700 font-rubikregular_400 transition-colors bg-white/50"
                    popperPlacement="bottom-start"
                    popperModifiers={{
                      flip: {
                        enabled: false,
                      },
                      preventOverflow: {
                        enabled: true,
                        escapeWithReference: false,
                        boundariesElement: "viewport",
                      },
                      offset: {
                        offset: [0, 10], // Add some offset to ensure space below
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-[#E5DD64]/20 flex justify-end gap-4">
            <button
              onClick={handleClose}
              className="px-6 py-2.5 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors font-rubikregular_400"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!pickupAddress}
              className={`px-8 py-2.5 rounded-xl font-rubikmedium_500 transition-colors ${
                pickupAddress
                  ? "bg-[#E5DD64] text-darkBlack hover:bg-[#E5DD64]/90"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const DotVerticalLine = ({ time }) => (
  <div className="px-[21px] flex flex-row items-center justify-start gap-2">
    <div className="border-l border-dashed h-[54px] border-lightBlack" />
    <p className="text-lightBlack text-[14px] font-rubikregular_400">
      {time}hrs
    </p>
  </div>
);

const LocationCard = ({ location, time, buttonName }) => (
  <div
    className="w-full p-3 bg-[#FEFEF8] flex flex-row items-start rounded-[16px] justify-between"
    style={{ boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.10)" }}
  >
    <div className="flex flex-col items-start justify-start gap-2">
      <div className="flex flex-row items-center justify-start gap-2">
        <SmallMapPin />
        <p className="text-darkBlack text-[20px] font-rubikregular_400 leading-[26px]">
          {location}
        </p>
      </div>
      <p className="flex flex-row items-center justify-start gap-2">
        <SmallClockIcon />
        <span className="text-[14px] font-rubikregular_400 text-lightBlack">
          {time}
        </span>
      </p>
    </div>
    <button className="text-[14px] font-rubikregular_400 text-lightBlack px-3 py-[6px] border border-solid rounded-[16px] border-lightBlack">
      {buttonName}
    </button>
  </div>
);

export default RouteInfo;
