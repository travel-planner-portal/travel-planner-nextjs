import React, { useState } from "react";
import {
  Sun,
  AlertCircle,
  Camera,
  Coffee,
  Hotel,
  Car,
  Clock,
  Calendar,
  MapPin,
  Fuel,
  Mountain,
  Utensils,
  ParkingCircle,
  Phone,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SparkleIcon, RightArrowIcon } from "../../assets/images";

const TripDetails = ({ tripData = {}, onBack }) => {
  const [selectedStop, setSelectedStop] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Default values for overview data
  const overview = tripData?.overview || {
    title: "Trip Details",
    description: "Trip details are being loaded...",
    duration: "N/A",
    distance: "N/A",
    fuelEstimate: "N/A",
    highlights: [],
    bestTimeToTravel: "N/A",
    roadConditions: "N/A",
  };

  // Default values for safety data
  const safety = tripData?.safety || {
    precautions: [],
  };

  // Default values for stops
  const stops = tripData?.stops || [];

  const renderStopCard = (stop, index) => {
    if (!stop) return null;

    const {
      name = "Stop",
      timeFromStart = "N/A",
      distanceFromStart = "N/A",
      image = "",
      description = "",
      attractions = [],
      foodOptions = [],
      stayOptions = [],
    } = stop;

    return (
      <motion.div
        key={name}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`relative bg-white rounded-[28px] p-6 mb-6 cursor-pointer transition-all
                  ${
                    selectedStop?.name === name ? "ring-2 ring-[#8CB500]" : ""
                  }`}
        onClick={() => setSelectedStop(stop)}
      >
        {/* Trip Stop Number */}
        <div className="absolute -left-4 -top-4 w-8 h-8 bg-[#8CB500] rounded-full flex items-center justify-center text-white font-rubikmedium_500">
          {index + 1}
        </div>

        <div className="flex justify-between items-start mb-4 ml-4">
          <div>
            <h3 className="text-xl font-rubikmedium_500 text-darkBlack">
              {name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-[#6D6D6D] mt-1">
              <Clock className="w-4 h-4" />
              {timeFromStart}
              <span className="mx-2">•</span>
              <Car className="w-4 h-4" />
              {distanceFromStart}
            </div>
          </div>
        </div>

        {image && (
          <div className="relative h-48 mb-4 rounded-[20px] overflow-hidden group">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
          </div>
        )}

        <p className="text-[#6D6D6D] mb-6">{description}</p>

        {/* Activities and Amenities Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { type: "attractions", icon: Mountain, count: attractions.length },
            { type: "food", icon: Utensils, count: foodOptions.length },
            { type: "stay", icon: Hotel, count: stayOptions.length },
          ].map(
            ({ type, icon: Icon, count }) =>
              count > 0 && (
                <div
                  key={type}
                  className="bg-[#F3FFC9] rounded-2xl p-4 text-center cursor-pointer hover:bg-[#E7F7D1] transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedStop({ ...stop, activeTab: type });
                  }}
                >
                  <Icon className="w-5 h-5 mx-auto text-[#8CB500] mb-2" />
                  <span className="text-sm font-rubikmedium_500 text-darkBlack capitalize">
                    {type}
                  </span>
                </div>
              )
          )}
        </div>

        {/* Detailed Information */}
        <AnimatePresence mode="wait">
          {selectedStop?.name === name && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-dashed border-[#8CB5004D] pt-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedStop.activeTab === "attractions" &&
                  attractions.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="font-rubikmedium_500 text-darkBlack">
                        Must-Visit Spots
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {attractions.map((attraction, i) => (
                          <div
                            key={i}
                            className="bg-[#F3FFC9] rounded-xl p-3 flex gap-3"
                          >
                            <Camera className="w-5 h-5 text-[#8CB500] flex-shrink-0" />
                            <div>
                              <p className="font-rubikmedium_500 text-darkBlack">
                                {attraction.name || "Attraction"}
                              </p>
                              <p className="text-sm text-[#6D6D6D]">
                                {attraction.timingInfo ||
                                  "Timing information not available"}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {selectedStop.activeTab === "food" &&
                  foodOptions.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="font-rubikmedium_500 text-darkBlack">
                        Food & Refreshments
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {foodOptions.map((option, i) => (
                          <div
                            key={i}
                            className="bg-[#F3FFC9] rounded-xl p-3 flex gap-3"
                          >
                            <Coffee className="w-5 h-5 text-[#8CB500]" />
                            <span className="text-[#6D6D6D]">{option}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {selectedStop.activeTab === "stay" &&
                  stayOptions.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="font-rubikmedium_500 text-darkBlack">
                        Accommodation Options
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {stayOptions.map((option, i) => (
                          <div
                            key={i}
                            className="bg-[#F3FFC9] rounded-xl p-3 flex gap-3"
                          >
                            <Hotel className="w-5 h-5 text-[#8CB500]" />
                            <span className="text-[#6D6D6D]">{option}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  // Early return if no tripData
  if (!tripData) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-rubikmedium_500 text-darkBlack mb-4">
            No trip data available
          </h2>
          <button
            onClick={onBack}
            className="bg-darkBlack text-white px-6 py-2 rounded-full font-rubikmedium_500 hover:bg-[#8CB500] transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center text-[#6D6D6D] hover:text-darkBlack mb-8 font-rubikmedium_500"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
          Back to Planning
        </motion.button>

        {/* Trip Overview Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#F3FFC9] rounded-[28px] p-8 mb-8"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl font-rubikmedium_500 text-darkBlack mb-2">
                {overview.title}
              </h2>
              <div className="flex items-center gap-4 text-[#6D6D6D]">
                {overview.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    {overview.duration}
                  </div>
                )}
                {overview.distance && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    {overview.distance}
                  </div>
                )}
                {overview.fuelEstimate && (
                  <div className="flex items-center gap-2">
                    <Fuel className="w-5 h-5" />
                    {overview.fuelEstimate}
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="bg-white p-3 rounded-full hover:bg-[#8CB500] hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
              </button>
              <button className="bg-darkBlack text-white px-6 py-2 rounded-full font-rubikmedium_500 hover:bg-[#8CB500] transition-colors">
                Start Navigation
              </button>
            </div>
          </div>

          <p className="text-[#6D6D6D] mb-6">{overview.description}</p>

          {overview.highlights?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {overview.highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/50 p-4 rounded-2xl flex items-center gap-3"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <SparkleIcon color="#8CB500" className="w-5 h-5" />
                  </div>
                  <p className="text-darkBlack">{highlight}</p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stops Timeline */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-rubikmedium_500 text-darkBlack mb-6">
              Your Journey Stops
            </h3>
            {stops.length > 0 ? (
              stops.map((stop, index) => renderStopCard(stop, index))
            ) : (
              <div className="bg-white rounded-[28px] p-6 text-center">
                <p className="text-[#6D6D6D]">
                  No stops planned for this journey yet.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Essential Information Card */}
              <div className="bg-white rounded-[28px] p-6">
                <h3 className="text-lg font-rubikmedium_500 text-darkBlack mb-4">
                  Essential Information
                </h3>
                <div className="space-y-4">
                  {overview.bestTimeToTravel && (
                    <div className="bg-[#F3FFC9] rounded-xl p-4">
                      <p className="text-sm font-rubikmedium_500 text-darkBlack mb-2">
                        Best Time to Travel
                      </p>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-[#8CB500]" />
                        <p className="text-[#6D6D6D]">
                          {overview.bestTimeToTravel}
                        </p>
                      </div>
                    </div>
                  )}

                  {overview.roadConditions && (
                    <div className="bg-[#F3FFC9] rounded-xl p-4">
                      <p className="text-sm font-rubikmedium_500 text-darkBlack mb-2">
                        Road Conditions
                      </p>
                      <div className="flex items-center gap-2">
                        <Car className="w-5 h-5 text-[#8CB500]" />
                        <p className="text-[#6D6D6D]">
                          {overview.roadConditions}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="bg-[#F3FFC9] rounded-xl p-4">
                    <p className="text-sm font-rubikmedium_500 text-darkBlack mb-2">
                      Parking Info
                    </p>
                    <div className="flex items-center gap-2">
                      <ParkingCircle className="w-5 h-5 text-[#8CB500]" />
                      <p className="text-[#6D6D6D]">
                        Available at all major stops
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Safety Information Card */}
              {safety.precautions?.length > 0 && (
                <div className="bg-white rounded-[28px] p-6">
                  <h3 className="text-lg font-rubikmedium_500 text-darkBlack mb-4">
                    Safety Tips
                  </h3>
                  <div className="space-y-3">
                    {safety.precautions.map((precaution, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 bg-[#FFF7E7] rounded-xl p-4"
                      >
                        <AlertCircle className="w-5 h-5 text-[#CA8E52] flex-shrink-0" />
                        <p className="text-sm text-[#6D6D6D]">{precaution}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
