import React, { useEffect, useState } from "react";
import { getSavedTrips, getPlaceImages } from "../network/networkCalls";
import { TripCardSkeleton } from "../components/features/TripCard/TripCardSkeleton";
import TripCard from "../components/features/TripCard/TripCard";

const SavedTripsPage = () => {
  const [state, setState] = useState({
    trips: [],
    images: {},
    loading: true,
    error: null,
    imagesLoading: true,
  });
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const tripsData = await fetchSavedTrips();
      if (tripsData.length > 0) {
        fetchTripImages(tripsData);
      } else {
        setState((prev) => ({ ...prev, imagesLoading: false }));
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        imagesLoading: false,
        error: "Failed to load trips",
      }));
    }
  };

  const fetchSavedTrips = async () => {
    try {
      const response = await getSavedTrips();
      const tripsArray = Array.isArray(response.data)
        ? response.data
        : [response.data];
      setState((prev) => ({ ...prev, trips: tripsArray, loading: false }));
      return tripsArray;
    } catch (error) {
      console.error("Error fetching saved trips:", error);
      throw error;
    }
  };

  const colors = [
    "bg-[#E5F7FF]",
    "bg-[#FFF5E5]",
    "bg-[#FFE5F3]",
    "bg-[#E5FFE8]",
    "bg-[#F3E5FF]",
    "bg-[#FFE5E5]",
  ];

  const fetchTripImages = async (trips) => {
    try {
      const imagesData = await Promise.all(
        trips.map((trip) => getPlaceImages(trip.destination, 1))
      );
      const imagesMap = trips.reduce((acc, trip, index) => {
        acc[trip.destination] = imagesData[index]?.photos?.[0] || null;
        return acc;
      }, {});
      setState((prev) => ({
        ...prev,
        images: imagesMap,
        imagesLoading: false,
      }));
    } catch (error) {
      console.error("Error fetching images:", error);
      setState((prev) => ({ ...prev, imagesLoading: false }));
    }
  };
  const { trips, images, loading, imagesLoading, error } = state;
  if (loading) {
    return (
      <div className="container mx-auto max-w-[88rem] px-4 py-8 mt-[73px] md:mt-[92px]">
        <h1 className="text-3xl font-bold mb-6">Saved Trips</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <TripCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 mt-[73px] md:mt-[92px]">
        <div className="text-red-500 text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-[88rem] px-4 py-8 mt-[73px] md:mt-[92px]">
      <h1 className="text-3xl font-bold mb-6">Saved Trips</h1>

      {trips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip, index) =>
            imagesLoading ? (
              <TripCardSkeleton key={`${trip.destination}-${trip.duration}`} />
            ) : (
              <TripCard
                key={`${trip.destination}-${trip.duration}`}
                trip={trip}
                image={images[trip.destination]}
                color={colors[index % colors.length]}
              />
            )
          )}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-8">
          No saved trips yet. Start exploring to save your favorite trips!
        </div>
      )}
    </div>
  );
};

export default SavedTripsPage;
