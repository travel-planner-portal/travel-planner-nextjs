import React from "react";
import TrendyCard from "./TrendyCard";
import TrendyCardSkeleton from "./TrendyCardSkeleton";

const StayTrendy = ({ data, isLoading }) => {
  return (
    <section className="container max-w-[88rem] mx-auto flex flex-col items-start justify-start gap-[40px] py-[40px] md:py-[60px] lg:py-[80px] px-4 md:px-6 lg:px-8">
      <section className="flex flex-col md:flex-row items-start md:items-end w-full justify-between gap-4 md:gap-2">
        <div className="flex flex-col items-start justify-start gap-2">
          <p className="text-[#C0D122] text-[14px] leading-[100%] font-rubiksemibold_600">
            Trending Topics
          </p>
          <p className="text-[32px] md:text-[40px] lg:text-[48px] leading-[110%] font-rubiksemibold_600 tracking-[-0.48px] max-w-[510px] text-balance">
            Stay Trendy with Our Latest Insights
          </p>
        </div>
        {/* <button
          className="capitalize 
        py-2
        px-6
        border
        border-solid
        border-[#333333]
        flex flex-col
        items-center
        justify-center
        font-rubikregular_400
        leading-[110%] 
        rounded-[4px]
        text-[16px]
        "
        >
          see more
        </button> */}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full items-start justify-start gap-4 md:gap-6 lg:gap-8">
        {isLoading ? (
          // Show 6 skeleton cards while loading
          [...Array(6)].map((_, index) => (
            <TrendyCardSkeleton key={index} />
          ))
        ) : (
          data.map((item, index) => (
            <TrendyCard data={item} key={index} />
          ))
        )}
      </section>
    </section>
  );
};

export default StayTrendy;
