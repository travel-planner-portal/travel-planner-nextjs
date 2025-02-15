import React from "react";
import { AnimatePresence } from "framer-motion";
import BudgetPlanner from "../BudgetPlanner";
import { useSearchParams } from "next/navigation";

const Hero = ({ inputData }) => {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab");

  return (
    <AnimatePresence mode="wait">
      <BudgetPlanner defaultTab={defaultTab} inputData={inputData} />
    </AnimatePresence>
  );
};
export default Hero;
