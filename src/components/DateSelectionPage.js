import { useNavigationContext } from "../context/NavigationContext";
import DateSelection from "../components/sections/DateSelection";
import { useDispatch } from "react-redux";
import { updatePageURL } from "../action/otherAction";
import { addUserData } from "../action/userDataAction";
import { useRouter } from "next/navigation";

const DateSelectionPage = ({ inputData }) => {
  const router = useRouter();
  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };
  const dispatch = useDispatch();
  const { setPlanData } = useNavigationContext();

  const handleDateProceed = (dates) => {
    if (dates) {
      const duration = calculateDuration(dates.startDate, dates.endDate);
      console.log("Calculated duration:", duration);
      dispatch(
        addUserData({
          startDate: dates.startDate.toISOString(),
          endDate: dates.endDate.toISOString(),
          duration: duration,
          destination: inputData.destination,
        })
      );
      setPlanData((prev) => ({
        ...prev,
        dates,
        duration,
      }));
      router.push("/interestpage");
    }
  };
  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className="background-image-homepage">
      {" "}
      <DateSelection
        onBack={handleBack}
        onProceed={handleDateProceed}
        selectedDestination={inputData.destination}
      />
    </div>
  );
};

export default DateSelectionPage;
