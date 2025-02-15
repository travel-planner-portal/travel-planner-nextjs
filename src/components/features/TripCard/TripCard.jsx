import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { RightArrowIcon } from "../../../assets/images";

const TripCard = ({ trip, image, color }) => {
  console.log(trip);
  return (
    <Link
      to={`/saved-trips/${trip.destination}/${trip.duration}`}
      whileHover={{ scale: 1.02 }}
      className={`  ${color}  p-4 rounded-[16px] flex flex-col items-start justify-start gap-4 text-left relative w-full md:w-[350px]`}
    >
      <img
        className="w-full h-[147px] rounded-t-[16px] object-cover"
        src={image || "/images/placeholder.jpg"}
        alt={"trip"}
      />
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <div className="flex flex-col">
            <h3 className="text-[#2E2B36] text-[28px] font-rubikmedium_500 leading-[32px]">
              {" "}
              {trip.destination}
            </h3>
          </div>
        </div>
        <div className="w-auto aspect-square bg-darkBlack rounded-full flex flex-col items-center justify-center p-2 -rotate-45 duration-300 ease-in-out hover:-rotate-0">
          <RightArrowIcon />
        </div>
      </div>
      <div className="flex gap-4 w-[100%]">
        <div className="bg-white/50 w-[50%] px-3 py-1 rounded-lg">
          <p className="text-[#818181] font-rubikregular_400 text-[12px] ">
            Duration
          </p>
          <p className="text-[#2E2B36] text-[18px] font-rubikregular_400 ">
            {trip.duration} days
          </p>
        </div>
        <div className="bg-white/50 w-[50%] px-3 py-1 rounded-lg">
          <p className="text-[#818181] font-rubikregular_400 text-[12px] ">
            Budget
          </p>
          <p className="text-[#2E2B36] text-[18px] font-rubikregular_400 ">
            {trip.budget}
          </p>
        </div>
      </div>
    </Link>

    // <Link
    //   to={`/saved-trips/${trip.destination}/${trip.duration}`}
    //   className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    // >
    //   <div className="relative h-48 overflow-hidden">
    //     {image ? (
    //       <img
    //         src={image}
    //         alt={`${trip.destination} preview`}
    //         className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
    //       />
    //     ) : (
    //       <div className="w-full h-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
    //         <MapPin className="w-12 h-12 text-gray-400" />
    //       </div>
    //     )}
    //     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
    //     <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800 flex items-center gap-1">
    //       <Clock className="w-4 h-4" />
    //       {trip.duration} days
    //     </div>
    //   </div>

    //   <div className="p-5">
    //     <div className="flex justify-between items-start mb-3">
    //       <div>
    //         <h2 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-[#88B537] transition-colors">
    //           {trip.destination}
    //         </h2>
    //         <div className="flex items-center gap-2 text-sm text-gray-500">
    //           <Calendar className="w-4 h-4" />
    //           <span>
    //             Saved on{" "}
    //             {new Date(trip.createdAt || trip.savedAt).toLocaleDateString()}
    //           </span>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="space-y-2 mb-4">
    //       {trip.itineraryData?.days?.[0]?.activities
    //         ?.slice(0, 2)
    //         .map((activity, index) => (
    //           <div
    //             key={index}
    //             className="flex items-start gap-2 text-sm text-gray-600"
    //           >
    //             <div className="w-1 h-1 rounded-full bg-[#88B537] mt-2"></div>
    //             <p className="line-clamp-1">{activity.title}</p>
    //           </div>
    //         ))}
    //     </div>

    //     <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
    //       <span className="text-sm font-medium text-[#88B537] group-hover:text-[#6d8f2c] transition-colors">
    //         View Details
    //       </span>
    //       <ArrowRight className="w-5 h-5 text-[#88B537] transform group-hover:translate-x-1 transition-transform" />
    //     </div>
    //   </div>
    // </Link>
  );
};

export default TripCard;
