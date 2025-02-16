import React from "react";
import TrendyCard from "./TrendyCard";

const StayTrendy = ({ data }) => {
  return (
    <section className="container max-w-[88rem] mx-auto flex flex-col items-start justify-start gap-[40px]  py-[80px]">
      <section className="flex flex-row items-end w-full justify-between gap-2  ">
        <div className=" flex flex-col items-start justify-start gap-2">
          <p className=" text-[#C0D122] text-[14px] leading-[100%] font-rubiksemibold_600">
            Trending Topics
          </p>
          <p className="text-[48px] leading-[110%] font-rubiksemibold_600 tracking-[-0.48px] max-w-[511px] text-balance">
            Stay Trendy with Our Latest Insights
          </p>
        </div>
        <button
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
        </button>
      </section>
      <section className="flex flex-row w-full flex-wrap items-start justify-between gap-x-4 gap-y-8">
        {data.map((item, index) => {
          return <TrendyCard data={item} key={index} />;
        })}
      </section>
    </section>
  );
};

export default StayTrendy;
