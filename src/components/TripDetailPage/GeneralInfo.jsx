import React, { useState } from "react";
import { LeftAngleArrowIcon } from "../../assets/images";
import flight from "../../assets/TripPage/flight.svg";
import bus from "../../assets/TripPage/bus.svg";
import train from "../../assets/TripPage/train.svg";
import Image from "next/image";

const GeneralInfo = ({ stationsData, destination }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  if (!stationsData) {
    return null;
  }
  console.log("GeneralInfo", stationsData, destination);

  return (
    <div className="w-full mt-[36px] md:mt-[48px]">
      <div
        className="flex items-center gap-2 mb-4 cursor-pointer"
        onClick={toggleAccordion}
      >
        <div
          className={`${
            isOpen ? "rotate-90" : "rotate-180"
          }  scale-50 duration-300 ease-in-out`}
        >
          <LeftAngleArrowIcon />
        </div>
        <h2 className="text-[#818181] text-[20px] font-rubikregular_400 leading-[26px] tracking-[-0.8px]">
          General Information
        </h2>
      </div>
      {isOpen && (
        <div className="flex flex-col ">
          <div className=" w-full flex flex-col md:flex-row gap-4 items-start justify-start">
            <TransportInfo
              icon={train}
              location="Nearest railway station"
              name={stationsData.railway.name}
              distance={stationsData.railway.distance}
            />
            <TransportInfo
              icon={flight}
              location="Nearest airport"
              name={stationsData.airport.name}
              distance={stationsData.airport.distance}
            />
            <TransportInfo
              icon={bus}
              location="Nearest bus station"
              name={stationsData.bus.name}
              distance={stationsData.bus.distance}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const TransportInfo = ({ icon, location, name, distance }) => (
  <div
    className="flex w-full md:w-auto items-start gap-4 p-4 rounded-[16px] border border-solid border-[#EFEFEF]"
    style={{
      background: "rgba(249, 249, 249, 0.50)",
    }}
  >
    <div className="rounded-lg">
      <Image src={icon} alt="" className="w-[30px] h-[30px]" />
    </div>
    <div className="flex flex-col items-start justify-start gap-2">
      <h4 className="text-[#818181] text-[12px] md:text-[16px] font-rubikregular_400 leading-normal md:leading-[26px]">
        {location}
      </h4>
      <p className="text-[16px] md:text-[20px] text-[#818181] font-rubikmedium_500 leading-normal md:leading-[26px]">
        {name} ({distance})
      </p>
    </div>
  </div>
);

export default GeneralInfo;
