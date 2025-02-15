import React from "react";
const RouteInfoSkeleton = () => (
  <div className="w-full flex flex-col items-start justify-start gap-8 mt-8 animate-pulse">
    <div className="w-full flex flex-row items-center justify-between gap-4">
      <div className="flex flex-row items-center justify-start gap-2">
        {[1, 2, 3].map((index) => (
          <div key={index} className="h-9 w-24 bg-gray-200 rounded-full" />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 bg-gray-200 rounded-full" />
        <div className="h-6 w-48 bg-gray-200 rounded-full" />
      </div>
    </div>
    <div className="grid grid-cols-12 w-full gap-[5vw]">
      <div className="col-span-12 md:col-span-6 w-full flex flex-col items-start justify-start gap-2">
        {[1, 2].map((item) => (
          <React.Fragment key={item}>
            <div className="w-full p-4 bg-gray-100 rounded-[16px] flex justify-between items-start">
              <div className="flex flex-col gap-3 w-2/3">
                <div className="h-6 w-full bg-gray-200 rounded-md" />
                <div className="h-4 w-1/2 bg-gray-200 rounded-md" />
              </div>
              <div className="h-8 w-24 bg-gray-200 rounded-full" />
            </div>
            {item === 1 && (
              <div className="px-[21px] flex items-center gap-2">
                <div className="h-[54px] w-0.5 bg-gray-200" />
                <div className="h-4 w-16 bg-gray-200 rounded-md" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="col-span-12 md:col-span-6 w-full">
        <div className="border border-gray-100 rounded-[16px] p-6 space-y-6 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="h-6 w-6 bg-gray-200 rounded-md" />
              <div className="h-6 w-48 bg-gray-200 rounded-md" />
            </div>
            <div className="h-8 w-8 bg-gray-200 rounded-md" />
          </div>
          <div className="space-y-3">
            <div className="h-4 w-32 bg-gray-200 rounded-md" />
            <div className="flex flex-wrap gap-2">
              {[1, 2].map((item) => (
                <div key={item} className="h-8 w-40 bg-gray-200 rounded-full" />
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-4 w-24 bg-gray-200 rounded-md" />
            <div className="h-6 w-32 bg-gray-200 rounded-md" />
          </div>
          <div className="space-y-3">
            <div className="h-4 w-64 bg-gray-200 rounded-md" />
            <div className="h-6 w-20 bg-gray-200 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default RouteInfoSkeleton;
