import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSavedTripDetail } from "../network/networkCalls";
import { formatStationsData } from "../utils/formatters";
import { TRANSPORT_MODES } from "../constants";
import DetailItinerayTabs from "../components/TripDetailPage/DetailItinerayTabs";
import ExpandableInfoCard from "../components/TripDetailPage/ExpandableInfoCard";
import GeneralInfo from "../components/TripDetailPage/GeneralInfo";
import Header from "../components/TripDetailPage/Header";
import ImageGallery from "../components/TripDetailPage/ImageGallery";
import PersonalizedDetails from "../components/TripDetailPage/PersonalizedDetails";
import RoteInfo from "../components/TripDetailPage/RoteInfo";
import TabsChangeButton from "../components/TripDetailPage/TabsChangeButton";

const SavedTripDetailPage = () => {
  const { destination, duration } = useParams();

  const [pageState, setPageState] = useState({
    activeTab: "detailed",
    expandedDay: 1,
    isModal: false,
    selectedMode: TRANSPORT_MODES[0],
    source: localStorage.getItem("lastSource") || "Delhi",
  });

  const [tripData, setTripData] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    fetchSavedTripDetail();
  }, [destination, duration]);

  const fetchSavedTripDetail = async () => {
    try {
      setTripData((prev) => ({ ...prev, loading: true, error: null }));
      const response = await getSavedTripDetail(destination, duration);
      setTripData((prev) => ({ ...prev, data: response.data }));
    } catch (error) {
      console.error("Error fetching saved trip:", error);
      setTripData((prev) => ({
        ...prev,
        error: "Failed to load trip details",
      }));
    } finally {
      setTripData((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleSourceChange = (newSource) => {
    if (newSource !== pageState.source) {
      setPageState((prev) => ({ ...prev, source: newSource }));
      localStorage.setItem("lastSource", newSource);
    }
  };
  if (tripData.loading) {
    return <LoadingState />;
  }

  if (tripData.error) {
    return <ErrorState message={tripData.error} />;
  }

  if (!tripData.data) {
    return <EmptyState />;
  }

  return (
    <div className="container max-w-[88rem] mx-auto px-4 mt-[73px] md:mt-[92px]">
      <ImageGallery placeName={destination} />

      <Header
        destinationfromprops={destination}
        durationfromprops={duration}
        itineraryData={tripData.data?.itineraryData}
        routeData={tripData.data?.routeData}
      />

      <div className="general-info">
        <GeneralInfo
          stationsData={formatStationsData(tripData.data?.routeData)}
        />
      </div>

      <ExpandableInfoCard
        destination={tripData.destination}
        saveTripData={tripData.data}
        fromsavestrippage={true}
      />

      <div className="tabs-section">
        <TabsChangeButton
          activeTab={pageState.activeTab}
          setActiveTab={(tab) =>
            setPageState((prev) => ({ ...prev, activeTab: tab }))
          }
          setIsModal={(modal) =>
            setPageState((prev) => ({ ...prev, isModal: modal }))
          }
          destinationfromProps={destination}
        />
      </div>

      {pageState.activeTab === "detailed" && tripData.data?.itineraryData && (
        <DetailItinerayTabs
          trip={tripData.data.itineraryData}
          expandedDay={pageState.expandedDay}
          setExpandedDay={(day) =>
            setPageState((prev) => ({ ...prev, expandedDay: day }))
          }
          totalDays={parseInt(duration)}
        />
      )}

      {pageState.activeTab === "personalized" && (
        <PersonalizedDetails
          startInfo={tripData.data?.startInfo || DEFAULT_INFO}
          endInfo={tripData.data?.endInfo || DEFAULT_INFO}
        />
      )}

      {pageState.activeTab === "routeTo" && (
        <RoteInfo
          selectedMode={pageState.selectedMode}
          setSelectedMode={(mode) =>
            setPageState((prev) => ({ ...prev, selectedMode: mode }))
          }
          modeOfTransport={TRANSPORT_MODES}
          isModal={pageState.isModal}
          setIsModal={(modal) =>
            setPageState((prev) => ({ ...prev, isModal: modal }))
          }
          source={pageState.source}
          destination={destination}
          onSourceChange={handleSourceChange}
          routeData={tripData.data?.routeData}
          loading={false}
          error={null}
        />
      )}
    </div>
  );
};

const DEFAULT_INFO = {
  pickup: "",
  pickupDateTime: "",
  arrival: "",
  arrivalDateTime: "",
};

const LoadingState = () => (
  <div className="container max-w-[88rem] mx-auto px-4 min-h-screen mt-[73px] md:mt-[92px] flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
  </div>
);

const ErrorState = ({ message }) => (
  <div className="container max-w-[88rem] mx-auto px-4 min-h-screen mt-[73px] md:mt-[92px] flex items-center justify-center">
    <div className="text-red-500">{message}</div>
  </div>
);

const EmptyState = () => (
  <div className="container max-w-[88rem] mx-auto px-4 min-h-screen mt-[73px] md:mt-[92px] flex items-center justify-center">
    <div className="text-gray-500">Trip not found</div>
  </div>
);

export default SavedTripDetailPage;
