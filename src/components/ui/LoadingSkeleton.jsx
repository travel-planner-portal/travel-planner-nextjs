import React from "react";
export const LoadingSkeleton = () => {
  return (
    <div className="container flex flex-col items-center max-w-[88rem] mx-auto mt-16 md:mt-[120px] px-4 md:px-6 pb-32 md:pb-48">
      <div className="mb-6 md:mb-8 flex items-center gap-2 md:gap-5 self-start">
        <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
        <div className="w-24 h-6 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="w-full max-w-4xl md:pl-[10vw] space-y-8 md:space-y-12">
        <div className="space-y-4 md:space-y-7">
          <div className="w-64 h-6 bg-gray-200 rounded animate-pulse" />
          <div className="flex flex-wrap gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"
              />
            ))}
          </div>
        </div>
        <div className="space-y-4 md:space-y-7">
          <div className="w-64 h-6 bg-gray-200 rounded animate-pulse" />
          <div className="flex flex-wrap gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-10 w-32 bg-gray-200 rounded-full animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="fixed bottom-8 md:bottom-[15vh] flex gap-6 md:gap-14">
        <div className="w-16 h-8 bg-gray-200 rounded animate-pulse" />
        <div className="w-28 h-8 bg-gray-200 rounded-full animate-pulse" />
      </div>
    </div>
  );
};

export const ImageGallerySkeleton = () => {
  return (
    <div className="w-full h-[35vh] md:h-[70vh] relative overflow-hidden">
      <div className="w-full h-full flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-[16px]">
          <div
            className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"
            style={{
              backgroundSize: "200% 100%",
              animation: "shimmer 2s infinite linear",
            }}
          />
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className={`
                ${index === 2 ? "w-5 h-5" : "w-3 h-3"}
                rounded-full bg-gray-300 animate-pulse
              `}
            />
          ))}

          <div className="ml-4 w-10 h-10 rounded-full bg-gray-300 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
