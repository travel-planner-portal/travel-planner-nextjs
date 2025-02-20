const TrendyCardSkeleton = () => {
    return (
        <div className="flex flex-col items-start justify-start p-2 border border-solid border-[#333333]/20 rounded-[4px] gap-2 w-full">
            <div className="w-full h-[200px] sm:h-[220px] md:h-[240px] relative rounded-[2px] overflow-hidden bg-gray-200 animate-pulse" />

            <div className="p-2 pb-0 flex flex-col items-start justify-start gap-4 w-full">
                {/* Title skeleton */}
                <div className="w-3/4 h-[28px] bg-gray-200 rounded animate-pulse" />

                {/* Subtitle skeleton - multiple lines */}
                <div className="w-full space-y-2">
                    <div className="w-full h-[16px] bg-gray-200 rounded animate-pulse" />
                    <div className="w-5/6 h-[16px] bg-gray-200 rounded animate-pulse" />
                    <div className="w-4/6 h-[16px] bg-gray-200 rounded animate-pulse" />
                </div>

                {/* Footer skeleton */}
                <div className="w-full border-t border-solid border-[#333333]/20 flex flex-row items-center justify-between py-3 gap-2">
                    <div className="flex flex-row items-center justify-start gap-2 md:gap-4">
                        <div className="w-[100px] h-[14px] bg-gray-200 rounded animate-pulse" />
                        <div className="w-[80px] h-[14px] bg-gray-200 rounded animate-pulse" />
                    </div>
                    <div className="w-[24px] h-[24px] bg-gray-200 rounded animate-pulse" />
                </div>
            </div>
        </div>
    );
};

export default TrendyCardSkeleton; 