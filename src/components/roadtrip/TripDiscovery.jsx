import React, { useState } from "react";
import {
  MapPin,
  Navigation,
  Settings2,
  Car,
  AlertCircle,
  Loader2,
  Clock,
  Mountain,
  AlertTriangle,
} from "lucide-react";
import { motion } from "framer-motion";
import { SparkleIcon, RightArrowIcon } from "../../assets/images";
import RoadTripLoader from "./RoadTripLoader";

const RoadTripPlanner = ({ inputData, onPlanComplete }) => {
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    preferences: {
      scenicRoutes: true,
      avoidTolls: false,
      avoidHighways: false,
      budget: 50000,
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      preferences:
        type === "checkbox"
          ? {
              ...prev.preferences,
              [name]: checked,
            }
          : prev.preferences,
    }));
  };

  const handlePreferenceChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://travelgo-backend-141065095049.us-central1.run.app/api/road-trip",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      onPlanComplete(data.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to plan trip. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ... other handlers remain the same

  return (
    <div className="flex w-full flex-col items-center justify-start gap-4 mt-12">
      <div className="md:w-[528px] w-full">
        <div className="flex items-center gap-2 mb-4">
          <Car className="w-6 h-6 text-[#8CB500]" />
          <h1 className="text-xl sm:text-[28px] tracking-[-1.12px] text-[#8CB500] font-rubikmedium_500">
            Let's plan your epic road trip!
          </h1>
        </div>

        <motion.div
          className="px-4 sm:px-10 py-4 sm:py-5 bg-[#F3FFC9] rounded-[28px] w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {/* Journey Details Section */}
          <div className="pb-6 mb-6 border-b border-dashed border-[#8CB5004D]">
            <h2 className="text-lg font-rubikmedium_500 text-darkBlack mb-4">
              Your Journey Details
            </h2>

            {/* Starting Point */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-[#8CB500]" />
                <span className="text-base font-rubikmedium_500 text-darkBlack">
                  Where's your starting point?
                </span>
              </div>
              <input
                type="text"
                name="source"
                value={formData.source}
                onChange={handleInputChange}
                className="w-full px-6 py-3 bg-white rounded-full text-darkBlack font-rubikregular_400 text-base tracking-[-0.8px] focus:outline-none focus:ring-2 focus:ring-[#8CB500] placeholder-[#BCBCBC]"
                placeholder="Enter city or specific location"
              />
            </div>

            {/* Destination */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Navigation className="w-5 h-5 text-[#8CB500]" />
                <span className="text-base font-rubikmedium_500 text-darkBlack">
                  Where to?
                </span>
              </div>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                className="w-full px-6 py-3 bg-white rounded-full text-darkBlack font-rubikregular_400 text-base tracking-[-0.8px] focus:outline-none focus:ring-2 focus:ring-[#8CB500] placeholder-[#BCBCBC]"
                placeholder="Dream destination"
              />
            </div>
          </div>

          {/* Trip Preferences */}
          <div className="mb-6">
            <h2 className="flex items-center gap-2 text-lg font-rubikmedium_500 text-darkBlack mb-4">
              <Settings2 className="w-5 h-5 text-[#8CB500]" />
              Customize Your Journey
            </h2>

            <div className="space-y-4 pl-4">
              {/* Route Preferences */}
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-2 bg-white/80 p-3 rounded-xl">
                  <input
                    type="checkbox"
                    name="scenicRoutes"
                    checked={formData.preferences.scenicRoutes}
                    onChange={(e) =>
                      handlePreferenceChange("scenicRoutes", e.target.checked)
                    }
                    className="rounded-full text-[#8CB500] focus:ring-[#8CB500]"
                  />
                  <span className="text-sm text-darkBlack font-rubikregular_400">
                    Scenic routes
                  </span>
                  <Mountain className="w-4 h-4 text-[#8CB500] ml-auto" />
                </label>

                <label className="flex items-center gap-2 bg-white/80 p-3 rounded-xl">
                  <input
                    type="checkbox"
                    name="avoidHighways"
                    checked={formData.preferences.avoidHighways}
                    onChange={(e) =>
                      handlePreferenceChange("avoidHighways", e.target.checked)
                    }
                    className="rounded-full text-[#8CB500] focus:ring-[#8CB500]"
                  />
                  <span className="text-sm text-darkBlack font-rubikregular_400">
                    Avoid highways
                  </span>
                  <svg
                    className="w-4 h-4 text-[#8CB500] ml-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                  </svg>{" "}
                </label>
              </div>

              {/* Time & Budget */}
              <div className="space-y-4 mt-4">
                <div>
                  <label className="block text-sm text-darkBlack font-rubikmedium_500 mb-2">
                    Estimated Travel Duration
                  </label>
                  <select
                    value={formData.preferences.estimatedDuration}
                    onChange={(e) =>
                      handlePreferenceChange(
                        "estimatedDuration",
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-2 rounded-xl bg-white text-darkBlack"
                  >
                    <option value="1-2">1-2 days</option>
                    <option value="2-3">2-3 days</option>
                    <option value="4-5">4-5 days</option>
                    <option value="7+">Week or longer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-darkBlack font-rubikmedium_500 mb-2">
                    Trip Budget
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="10000"
                      max="200000"
                      step="5000"
                      value={formData.preferences.budget}
                      onChange={(e) =>
                        handlePreferenceChange(
                          "budget",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full accent-[#8CB500]"
                    />
                    <div className="flex justify-between text-sm text-[#6D6D6D]">
                      <span>₹10,000</span>
                      <span>
                        ₹{formData.preferences.budget.toLocaleString()}
                      </span>
                      <span>₹2,00,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
              <div className="flex">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Submit Button */}
      {/* Update the Submit Button section */}
      <motion.div className="flex flex-col items-center gap-4">
        {loading ? (
          <RoadTripLoader
            source={formData.source}
            destination={formData.destination}
          />
        ) : (
          <motion.button
            onClick={handleSubmit}
            disabled={!formData.source || !formData.destination}
            className="bg-darkBlack mt-6 cursor-pointer disabled:bg-opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-white py-3 px-8 rounded-[50px] text-base font-rubikmedium_500"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Plan My Road Trip
            <RightArrowIcon />
          </motion.button>
        )}
      </motion.div>

      <div className="w-full max-w-6xl mt-12 mb-12">
        <h2 className="text-xl font-rubikmedium_500 text-darkBlack mb-6 px-4">
          Popular Road Trip Routes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              name: "Manali to Leh",
              desc: "Epic Himalayan adventure through high mountain passes",
              duration: "5-7 days",
              distance: "474 km",
              color: "#FFE7D6",
            },
            {
              name: "Mumbai to Goa",
              desc: "Coastal drive with beautiful beaches & seafood stops",
              duration: "2-3 days",
              distance: "590 km",
              color: "#E7F7EF",
            },
            {
              name: "Chennai to Pondicherry",
              desc: "Scenic East Coast Road with French colonial charm",
              duration: "1-2 days",
              distance: "155 km",
              color: "#F7EFE7",
            },
            {
              name: "Delhi to Agra",
              desc: "Historical journey through the heritage corridor",
              duration: "1 day",
              distance: "233 km",
              color: "#E7EFF7",
            },
          ].map((trip) => (
            <motion.button
              key={trip.name}
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  source: trip.name.split(" to ")[0],
                  destination: trip.name.split(" to ")[1],
                  preferences: {
                    ...prev.preferences,
                    estimatedDuration: trip.duration,
                  },
                }));
              }}
              className="p-6 flex flex-col gap-4 rounded-[34px] w-full"
              style={{ backgroundColor: trip.color }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="space-y-2">
                <h3 className="text-lg font-rubikmedium_500 text-darkBlack">
                  {trip.name}
                </h3>
                <p className="text-sm text-[#6D6D6D]">{trip.desc}</p>
              </div>
              <div className="flex items-center justify-between text-sm text-[#6D6D6D]">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {trip.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Car className="w-4 h-4" />
                  {trip.distance}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoadTripPlanner;
