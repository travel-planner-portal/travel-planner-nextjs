import React from "react";
import { useSelector } from "react-redux";
import { DetailIcon, PersonalizedIcon } from "../../assets/images";
import { RouteIcon } from "lucide-react";

const TabsChangeButton = ({
  activeTab,
  setActiveTab,
  setIsModal,
  destinationfromProps,
}) => {
  const { destination, source } = useSelector((state) => state.userData);
  const finalDestination = destination ?? destinationfromProps;
  const handleRouteTab = () => {
    setActiveTab("routeTo");
    if (!source) {
      setIsModal(true);
    }
  };

  return (
    <div className="flex gap-6 border-b mt-16 border-solid border-lightBlack overflow-x-auto scrollbar-hide">
      <button
        className={`pb-2 px-2 font-medium border-b-2 transition-colors gap-2 flex flex-row items-center justify-center ${
          activeTab === "detailed"
            ? "border-[#2E2B36] text-[#2E2B36]"
            : "border-transparent text-[#818181]"
        }`}
        onClick={() => setActiveTab("detailed")}
      >
        <DetailIcon
          color={`${activeTab === "detailed" ? "#2E2B36" : "#818181"}`}
        />
        <span className="whitespace-nowrap">Detailed itinerary</span>
      </button>
      <button
        className={`pb-2 px-2 font-medium border-b-2 transition-colors gap-2 flex flex-row items-center justify-center ${
          activeTab === "routeTo"
            ? "border-[#2E2B36] text-[#2E2B36]"
            : "border-transparent text-[#818181]"
        }`}
        onClick={handleRouteTab}
      >
        <div className="rotate-90">
          <RouteIcon
            color={`${activeTab === "routeTo" ? "#2E2B36" : "#818181"}`}
          />
        </div>
        <span className="whitespace-nowrap">Route to {finalDestination}</span>
      </button>
    </div>
  );
};

export default TabsChangeButton;
