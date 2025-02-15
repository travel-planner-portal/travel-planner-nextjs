import React from "react";

const DestinationSkeleton = () => (
  <div className="p-6 rounded-2xl flex flex-col items-start justify-start gap-5 text-left relative w-full md:w-[350px] animate-pulse">
    <div className="w-full h-[147px] rounded-t-[16px] bg-gray-300"></div>
    <div className="w-full flex flex-row items-center justify-between">
      <div>
        <div className="h-6 bg-gray-300 rounded w-32 mb-2"></div>
        <div className="h-8 bg-gray-300 rounded w-48"></div>
      </div>
      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
    </div>
    <div className="flex gap-4">
      <div className="bg-gray-200 w-[123px] h-[60px] rounded-lg"></div>
      <div className="bg-gray-200 w-[123px] h-[60px] rounded-lg"></div>
    </div>
  </div>
);

const HeadingSkeleton = () => (
  <div className="h-6 bg-gray-300 rounded w-64 mb-4 animate-pulse"></div>
);

const BackButtonSkeleton = () => (
  <div className="mb-8 flex items-center justify-start self-start gap-2 md:gap-5 animate-pulse">
    <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
    <div className="h-4 bg-gray-300 rounded w-16"></div>
  </div>
);

export { DestinationSkeleton, HeadingSkeleton, BackButtonSkeleton };
