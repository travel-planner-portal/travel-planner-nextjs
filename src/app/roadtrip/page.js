"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TripDiscovery from "../../components/roadtrip/TripDiscovery";
import TripDetails from "../../components/roadtrip/TripDetails";

const RoadTripPlanner = ({ defaultTab = "discover" }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [roadTripData, setRoadTripData] = useState(null);

  const handlePlanComplete = (data) => {
    setRoadTripData(data);
    setCurrentStep(1);
  };

  const handleBack = () => {
    setCurrentStep(0);
  };

  return (
    <AnimatePresence mode="wait">
      {currentStep === 0 ? (
        <motion.div
          key="discovery"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
        >
          <TripDiscovery onPlanComplete={handlePlanComplete} />
        </motion.div>
      ) : (
        <motion.div
          key="details"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <TripDetails tripData={roadTripData} onBack={handleBack} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RoadTripPlanner;
