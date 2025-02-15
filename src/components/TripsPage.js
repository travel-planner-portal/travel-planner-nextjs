import { useNavigationContext } from "../context/NavigationContext";
import DestinationSelection from "../components/sections/DestinationSelection";
import { useDispatch } from "react-redux";
import { updatePageURL } from "../action/otherAction";
import { addUserData } from "../action/userDataAction";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const destinations = [
  { id: 1, destination: "Ladakh", duration: 5, budget: 10000 },
  { id: 2, destination: "Kashmir", duration: 5, budget: 10000 },
  { id: 3, destination: "Manali", duration: 5, budget: 10000 },
  { id: 4, destination: "Shimla", duration: 5, budget: 10000 },
  { id: 5, destination: "Goa", duration: 5, budget: 10000 },
  { id: 6, destination: "Kerala", duration: 5, budget: 10000 },
];

const TripsPage = ({ inputData }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { setPlanData } = useNavigationContext();

  useEffect(() => {
    if (
      !inputData.budget ||
      !inputData.duration ||
      !inputData.tripType ||
      !inputData.interest
    ) {
      console.log("inputData", inputData);
      toast.error("Please complete all required steps first");
      router.push("/");
      return;
    }
  }, [inputData, router]);

  useEffect(() => {
    console.log("DestinationSelection inputData:", inputData);
    if (
      !inputData.budget ||
      !inputData.duration ||
      !inputData.tripType ||
      !inputData.interest
    ) {
      toast.error("Please complete your preferences first");
    }
  }, [inputData]);

  const handleBack = () => {
    router.push("/interests");
  };

  const handleSelectDestination = (destination) => {
    const updatedData = {
      ...inputData,
      destination: destination.destination,
      duration: destination.duration || inputData.duration,
      budget: destination.budget || inputData.budget,
    };

    setPlanData((prev) => ({ ...prev, ...updatedData }));
    dispatch(addUserData(updatedData));
    router.push(`/trips/${destination.id}`);
  };

  return (
    <DestinationSelection
      destinations={destinations}
      onBack={handleBack}
      onSelect={handleSelectDestination}
      userData={inputData}
    />
  );
};

export default TripsPage;
