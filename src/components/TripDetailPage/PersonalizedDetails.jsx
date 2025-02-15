import React from "react";
import { PinIcon, RightYellowIcon } from "../../assets/images";

const PersonalizedDetails = ({
  startInfo,
  setEndInfo,
  setStartInfo,
  endInfo,
}) => {
  return (
    <div className="w-full">
      <p className="text-[#414141] font-rubikregular_400 text-[20px] leading-[26px]  mt-8">
        Plan your journey your way—add dates, pickup, and drop-off points to
        make it uniquely yours and personalized!
      </p>
      <JourneyStartDetails startInfo={startInfo} setStartInfo={setStartInfo} />
      <JourneyEndDetails endInfo={endInfo} setEndInfo={setEndInfo} />
    </div>
  );
};

export default PersonalizedDetails;

const JourneyStartDetails = ({ setStartInfo, startInfo }) => {
  return (
    <div className="w-full flex flex-col items-start justify-start mt-10 gap-4">
      <div className="flex flex-row items-center justify-start relative gap-1 border-b  pb-1 border-solid border-normalTextColor  ">
        <PinIcon />
        <span className="text-[#414141] font-rubikmedium_500 text-[20px] leading-[26px] ">
          {" "}
          Journey start info
        </span>
      </div>
      <div className="w-full py-6 px-4 bg-[#FDFDE5] rounded-[16px] flex flex-row items-center justify-between gap-5">
        <div className="flex  flex-col items-start justify-start gap-1 w-full">
          <label
            className="text-[12px] font-rubikregular_400 text-lightBlack"
            htmlFor="pickUpAddress"
          >
            Pickup address
          </label>
          <input
            className="px-3 py-[10px] text-lightBlack text-[14px] w-full font-rubikregular_400 outline-none leading-[20px] border border-solid border-[#F2F2CD] rounded-[8px] "
            id="pickUpAddress"
            type="text"
            placeholder="Enter your pickup address"
            value={startInfo.pickup}
            onChange={(e) =>
              setStartInfo({ ...startInfo, pickup: e.target.value })
            }
          />
        </div>
        <div className="flex  flex-col items-start justify-start gap-1 w-full">
          <label
            className="text-[12px] font-rubikregular_400 text-lightBlack"
            htmlFor="pickUpDate"
          >
            Date (optional)
          </label>
          <input
            className="px-3 py-[10px] text-lightBlack text-[14px] w-full font-rubikregular_400 outline-none leading-[20px] border border-solid border-[#F2F2CD] rounded-[8px] "
            id="pickUpDate"
            type="datetime-local"
            placeholder="Enter your pickup date"
            value={startInfo.pickupDateTime}
            onChange={(e) =>
              setStartInfo({ ...startInfo, pickupDateTime: e.target.value })
            }
          />
        </div>
        <div>
          <RightYellowIcon />
        </div>
        <div className="flex  flex-col items-start justify-start gap-1 w-full">
          <label
            className="text-[12px] font-rubikregular_400 text-lightBlack"
            htmlFor="DestinationAddress"
          >
            Pickup address
          </label>
          <input
            className="px-3 py-[10px] text-lightBlack text-[14px] w-full font-rubikregular_400 outline-none leading-[20px] border border-solid border-[#F2F2CD] rounded-[8px] "
            id="DestinationAddress"
            type="text"
            placeholder="Enter your Destination address"
            value={startInfo.destination}
            onChange={(e) =>
              setStartInfo({ ...startInfo, destination: e.target.value })
            }
          />
        </div>
        <div className="flex  flex-col items-start justify-start gap-1 w-full">
          <label
            className="text-[12px] font-rubikregular_400 text-lightBlack"
            htmlFor="arrivalDate"
          >
            Date and time (optional)
          </label>
          <input
            className="px-3 py-[10px] text-lightBlack text-[14px] w-full font-rubikregular_400 outline-none leading-[20px] border border-solid border-[#F2F2CD] rounded-[8px] "
            id="arrivalDate"
            type="datetime-local"
            placeholder="Select arrival date and time"
            value={startInfo.arrivalDateTime}
            onChange={(e) =>
              setStartInfo({ ...startInfo, arrivalDateTime: e.target.value })
            }
          />
        </div>
        <button className="px-10 py-[10px] text-[14px] font-rubikregular_400 text-normalTextColor leading-[20px] bg-[#E5DD64] rounded-[8px] ">
          Save
        </button>
      </div>
    </div>
  );
};
const JourneyEndDetails = ({ endInfo, setEndInfo }) => {
  return (
    <div className="w-full flex flex-col items-start justify-start mt-10 gap-4">
      <div className="flex flex-row items-center justify-start relative gap-1 border-b  pb-1 border-solid border-normalTextColor  ">
        <PinIcon />
        <span className="text-[#414141] font-rubikmedium_500 text-[20px] leading-[26px] ">
          {" "}
          Journey end info
        </span>
      </div>
      <div className="w-full py-6 px-4 bg-[#FDFDE5] rounded-[16px] flex flex-row items-center justify-between gap-5">
        <div className="flex  flex-col items-start justify-start gap-1 w-full">
          <label
            className="text-[12px] font-rubikregular_400 text-lightBlack"
            htmlFor="pickUpAddress"
          >
            Pickup address
          </label>
          <input
            className="px-3 py-[10px] text-lightBlack text-[14px] w-full font-rubikregular_400 outline-none leading-[20px] border border-solid border-[#F2F2CD] rounded-[8px] "
            id="pickUpAddress"
            type="text"
            placeholder="Enter your pickup address"
            value={endInfo.pickupAddress}
            onChange={(e) =>
              setEndInfo({ ...endInfo, pickupAddress: e.target.value })
            }
          />
        </div>
        <div className="flex  flex-col items-start justify-start gap-1 w-full">
          <label
            className="text-[12px] font-rubikregular_400 text-lightBlack"
            htmlFor="pickUpDate"
          >
            Date (optional)
          </label>
          <input
            className="px-3 py-[10px] text-lightBlack text-[14px] w-full font-rubikregular_400 outline-none leading-[20px] border border-solid border-[#F2F2CD] rounded-[8px] "
            id="pickUpDate"
            type="datetime-local"
            placeholder="Enter your pickup date"
            value={endInfo.pickupDate}
            onChange={(e) =>
              setEndInfo({ ...endInfo, pickupDate: e.target.value })
            }
          />
        </div>
        <div>
          <RightYellowIcon />
        </div>
        <div className="flex  flex-col items-start justify-start gap-1 w-full">
          <label
            className="text-[12px] font-rubikregular_400 text-lightBlack"
            htmlFor="DestinationAddress"
          >
            Pickup address
          </label>
          <input
            className="px-3 py-[10px] text-lightBlack text-[14px] w-full font-rubikregular_400 outline-none leading-[20px] border border-solid border-[#F2F2CD] rounded-[8px] "
            id="DestinationAddress"
            type="text"
            placeholder="Enter your Destination address"
            value={endInfo.destinationAddress}
            onChange={(e) =>
              setEndInfo({ ...endInfo, destinationAddress: e.target.value })
            }
          />
        </div>
        <div className="flex  flex-col items-start justify-start gap-1 w-full">
          <label
            className="text-[12px] font-rubikregular_400 text-lightBlack"
            htmlFor="arrivalDate"
          >
            Date and time (optional)
          </label>
          <input
            className="px-3 py-[10px] text-lightBlack text-[14px] w-full font-rubikregular_400 outline-none leading-[20px] border border-solid border-[#F2F2CD] rounded-[8px] "
            id="arrivalDate"
            type="datetime-local"
            placeholder="Select arrival date and time"
            value={endInfo.arrivalDate}
            onChange={(e) =>
              setEndInfo({ ...endInfo, arrivalDate: e.target.value })
            }
          />
        </div>
        <button className="px-10 py-[10px] text-[14px] font-rubikregular_400 text-normalTextColor leading-[20px] bg-[#E5DD64] rounded-[8px] ">
          Save
        </button>
      </div>
    </div>
  );
};
