import React, { useState, useEffect } from "react";
import { LeftAngleArrowIcon, RightArrowIcon } from "../../assets/images";

const Calendar = ({ selectedStartDate, selectedEndDate, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);
  const [maxSelectableDate, setMaxSelectableDate] = useState(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (selectedStartDate) {
      const maxDate = new Date(selectedStartDate);
      maxDate.setDate(maxDate.getDate() + 7);
      setMaxSelectableDate(maxDate);
    } else {
      setMaxSelectableDate(null);
    }
  }, [selectedStartDate]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const CalendarMonth = ({ date }) => {
    const month = date.getMonth();
    const year = date.getFullYear();

    const CustomArrow = ({ direction }) => (
      <svg
        width="16"
        height="12"
        viewBox="0 0 16 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`cursor-pointer ${
          direction === "right" ? "rotate-180" : ""
        }`}
        onClick={() => {
          const newDate = new Date(
            currentDate.getFullYear(),
            direction === "left"
              ? currentDate.getMonth() - 1
              : currentDate.getMonth() + 1
          );
          setCurrentDate(newDate);
        }}
      >
        <path
          d="M1.33319 5.9998H14.6665M1.33319 5.9998C1.3332 7.0978 6.33302 11 6.33302 11M1.33319 5.9998C1.33318 4.90181 6.33306 1 6.33306 1"
          stroke="#2E2B36"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

    return (
      <div className="w-full bg-[#FDFDE5] py-[18px] px-[36px]  flex flex-col items-center justify-start rounded-[16px] ">
        <div className="flex items-center justify-center gap-12 mb-4">
          <CustomArrow direction="left" />
          <h3 className="text-[#2E2B36] text-[15px] font-rubikmedium_500 leading-[140%]  ">
            {months[month]} {year}
          </h3>
          <CustomArrow direction="right" />
        </div>

        <div className="w-full  grid grid-cols-7 gap-4">
          {days.map((day) => (
            <div
              key={day}
              className="text-[#6F7C8E] font-rubikregular_400 text-[15px] leading-[140%] flex flex-col items-center justify-center "
            >
              {day}
            </div>
          ))}

          {Array(35)
            .fill(null)
            .map((_, index) => {
              const firstDay = new Date(year, month, 1).getDay();
              const day = index - firstDay + 1;
              const currentDay = new Date(year, month, day);
              const isValid =
                day > 0 && day <= new Date(year, month + 1, 0).getDate();
              const today = new Date();
              today.setHours(0, 0, 0, 0);

              const isDisabled =
                isValid &&
                (currentDay < today ||
                  (selectedStartDate &&
                    !selectedEndDate &&
                    currentDay < selectedStartDate) ||
                  (maxSelectableDate && currentDay > maxSelectableDate));

              const isStart =
                selectedStartDate?.getTime() === currentDay.getTime();
              const isEnd = selectedEndDate?.getTime() === currentDay.getTime();
              const isInRange =
                isValid &&
                selectedStartDate &&
                selectedEndDate &&
                currentDay > selectedStartDate &&
                currentDay < selectedEndDate;

              return (
                <div
                  key={index}
                  onClick={() =>
                    isValid && !isDisabled && onDateSelect(currentDay)
                  }
                  className={`
                    text-darkBlack text-[15px] font-rubikregular_400 leading-[140%] flex flex-col items-center justify-center

                    
                    ${!isValid ? "pointer-events-none" : ""}
                    ${isDisabled ? "text-gray-300" : "text-gray-700"}
                    ${
                      !isDisabled && !isStart && !isEnd
                        ? "hover:bg-gray-100"
                        : ""
                    }
                    ${
                      isStart
                        ? "bg-[#F8E169] rounded-l-lg hover:bg-[#F8E169]"
                        : ""
                    }
                    ${
                      isEnd
                        ? "bg-[#F8E169] rounded-r-lg hover:bg-[#F8E169]"
                        : ""
                    }
                    ${isInRange ? "bg-white" : ""}
                  `}
                >
                  {isValid ? day : ""}
                </div>
              );
            })}
        </div>
      </div>
    );
  };

  const nextMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1
  );

  return (
    <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-2"} gap-0 `}>
      <CalendarMonth date={currentDate} />
      {!isMobile && <CalendarMonth date={nextMonth} />}
    </div>
  );
};

const DateSelection = ({ onBack, selectedDestination, onProceed }) => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleDateSelect = (date) => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    } else {
      if (date < selectedStartDate) {
        setSelectedStartDate(date);
        setSelectedEndDate(null);
      } else {
        setSelectedEndDate(date);
      }
    }
  };

  const handleProceed = () => {
    if (selectedStartDate && selectedEndDate && onProceed) {
      onProceed({ startDate: selectedStartDate, endDate: selectedEndDate });
    }
  };

  return (
    <div className=" container max-w-[88rem] mx-auto flex flex-col mt-[100px] ">
      <div className="flex items-center gap-3 mb-8 ml-4">
        <button onClick={onBack} className="flex items-center gap-2 md:gap-3">
          <div className="scale-50 md:scale-100">
            <LeftAngleArrowIcon />
          </div>
          <span className="text-darkBlack md:text-[28px] font-rubikregular_400 md:leading-[28px] md:tracking-[-1.12px] text-[14px] leading-normal tranking-[-0.56px]  ">
            {selectedDestination}
          </span>
        </button>
      </div>

      <main className="px-4 flex-1 flex flex-col items-center">
        <div className="w-full max-w-[640px]">
          <h1 className=" text-[20px] leading-[26px]  font-rubikregular_400 text-darkBlack mb-[28px] ">
            When are you planning to travel?
          </h1>

          <Calendar
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            onDateSelect={handleDateSelect}
          />

          <div className="flex justify-center items-center mt-[10vh] md:mt-[15vh] gap-6 md:gap-12">
            {/* <button className="text-[20px] font-rubikregular_400 text-darkBlack tracking-[-0.8px]">Skip</button> */}
            <button
              onClick={handleProceed}
              disabled={!selectedStartDate || !selectedEndDate}
              className={`
                px-[22.4px] md:px-7 md:py-2 py-[6.4px] rounded-full flex items-center gap-2 text-[16px] font-rubikmedium_500 text-[#FFF] bg-darkBlack disabled:cursor-not-allowed cursor-pointer
                ${
                  selectedStartDate && selectedEndDate
                    ? "bg-opacity-100"
                    : "bg-opacity-50 "
                }
              `}
            >
              Proceed
              <RightArrowIcon color={"#FFF"} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DateSelection;
