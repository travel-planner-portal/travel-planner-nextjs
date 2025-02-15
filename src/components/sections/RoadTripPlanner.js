import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  MapPin,
  Car,
  Settings2,
  Navigation,
  AlertCircle,
  Loader2,
  Sun,
  Clock,
  DollarSign,
  Camera,
  Coffee,
  Hotel,
} from "lucide-react";

const RoadTripPlanner = ({ inputData, defaultTab = "roadtrip" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
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
  const [roadTripData, setRoadTripData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedStop, setSelectedStop] = useState(null);

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
      const response = await axios.post(
        "http://localhost:8080/api/road-trip",
        formData
      );
      setRoadTripData(response.data.data);
      setCurrentStep(1);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to plan trip. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const renderPlanningForm = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <div className="space-y-6">
          {/* Location Inputs */}
          <div className="space-y-6">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 mr-2" />
                Starting Point
              </label>
              <input
                type="text"
                name="source"
                value={formData.source}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your starting location"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Navigation className="w-4 h-4 mr-2" />
                Destination
              </label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your destination"
              />
            </div>
          </div>

          {/* Preferences Section */}
          <div className="border-t pt-6">
            <h3 className="flex items-center text-lg font-medium text-gray-900 mb-4">
              <Settings2 className="w-5 h-5 mr-2" />
              Travel Preferences
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="scenicRoutes"
                    checked={formData.preferences.scenicRoutes}
                    onChange={(e) =>
                      handlePreferenceChange("scenicRoutes", e.target.checked)
                    }
                    className="rounded text-blue-500 focus:ring-blue-500 mr-2"
                  />
                  <span className="text-sm text-gray-700">
                    Prefer scenic routes
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="avoidTolls"
                    checked={formData.preferences.avoidTolls}
                    onChange={(e) =>
                      handlePreferenceChange("avoidTolls", e.target.checked)
                    }
                    className="rounded text-blue-500 focus:ring-blue-500 mr-2"
                  />
                  <span className="text-sm text-gray-700">
                    Avoid toll roads
                  </span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget (₹)
                </label>
                <input
                  type="range"
                  min="10000"
                  max="200000"
                  step="5000"
                  value={formData.preferences.budget}
                  onChange={(e) =>
                    handlePreferenceChange("budget", parseInt(e.target.value))
                  }
                  className="w-full"
                />
                <div className="text-right text-sm text-gray-600">
                  ₹{formData.preferences.budget.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <div className="flex">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              onClick={handleSubmit}
              disabled={loading || !formData.source || !formData.destination}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium 
                       hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                       focus:ring-blue-500 disabled:opacity-50 transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5 mr-2" />
                  Planning Trip...
                </>
              ) : (
                <>
                  <Car className="w-5 h-5 mr-2" />
                  Plan My Trip
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderStopCard = (stop, index) => (
    <motion.div
      key={stop.name}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`bg-white rounded-lg shadow-lg p-6 mb-6 cursor-pointer transition-all
                ${
                  selectedStop?.name === stop.name ? "ring-2 ring-blue-500" : ""
                }`}
      onClick={() => setSelectedStop(stop)}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{stop.name}</h3>
          <p className="text-sm text-gray-600">{stop.type}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium text-gray-900">
            {stop.distanceFromStart} from start
          </span>
          <span className="text-xs text-gray-500">{stop.timeFromStart}</span>
        </div>
      </div>

      {stop.image && (
        <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
          <img
            src={stop.image}
            alt={stop.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
        </div>
      )}

      <p className="text-gray-700 mb-4">{stop.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Attractions */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            Attractions
          </h4>
          <ul className="space-y-2">
            {stop.attractions.map((attraction, i) => (
              <li key={i} className="flex items-start space-x-2">
                <Camera className="w-4 h-4 text-blue-500 mt-1" />
                <div>
                  <p className="text-sm font-medium">{attraction.name}</p>
                  <p className="text-xs text-gray-600">
                    {attraction.timingInfo}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Food and Stay Options */}
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Food Options
            </h4>
            <ul className="space-y-1">
              {stop.foodOptions.map((option, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <Coffee className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-gray-600">{option}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Stay Options
            </h4>
            <ul className="space-y-1">
              {stop.stayOptions.map((option, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <Hotel className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-gray-600">{option}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderTripDetails = () => (
    <div className="max-w-6xl mx-auto">
      {/* Trip Overview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {roadTripData.overview.title}
        </h2>
        <p className="text-gray-700 mb-6">
          {roadTripData.overview.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roadTripData.overview.highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 p-4 rounded-lg"
            >
              <p className="text-gray-800">{highlight}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stops Timeline */}
        <div className="lg:col-span-2">
          {roadTripData.stops.map((stop, index) => renderStopCard(stop, index))}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Trip Overview
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Best Time to Travel
                  </p>
                  <div className="flex items-center space-x-2">
                    <Sun className="w-5 h-5 text-yellow-500" />
                    <p className="text-gray-900">
                      {roadTripData.overview.bestTimeToTravel}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Road Conditions
                  </p>
                  <p className="text-gray-900">
                    {roadTripData.overview.roadConditions}
                  </p>
                </div>
              </div>
            </div>

            {/* Safety Information */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Safety Information
              </h3>
              <div className="space-y-4">
                {roadTripData.safety.precautions.map((precaution, index) => (
                  <div key={index} className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">{precaution}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Road Trip Planner
          </h1>
          <p className="text-lg text-gray-600">
            Plan your perfect journey with personalized stops and
            recommendations
          </p>
        </motion.div>

        {/* Main Content with AnimatePresence */}
        <AnimatePresence mode="wait">
          {currentStep === 0 ? (
            <motion.div
              key="planning"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {renderPlanningForm()}
            </motion.div>
          ) : (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <button
                  onClick={() => setCurrentStep(0)}
                  className="flex items-center text-gray-600 hover:text-gray-900"
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
                </button>
              </div>
              {renderTripDetails()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RoadTripPlanner;
