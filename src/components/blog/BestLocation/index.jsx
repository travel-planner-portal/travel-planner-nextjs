import React from "react";
import Crosoual from "./Crosoual";

const BestLocation = ({data}) => {
  return (
    <section
      className="container 
      max-w-[88rem]
     gap-4
      mx-auto px-4
       flex
      flex-row
      items-end
      relative mt-[64px]
     
      justify-start"
      
    >
      <div
        className="
        md:min-w-[350px]
      w-[350px] 
      flex 
      flex-col 
      items-start
      justify-start
      "
      >
        <p className="text-[#C0D122] text-[14px] capitalize">categories </p>
        <p className="text-[48px] text-black font-rubiksemibold_600 leading-normal">Best in
          Location</p>
          <button className="px-6 py-2  border border-solid border-[#333333] rounded-[4px] capitalize mt-6"> read more</button>

      </div>
      <div className="flex-1  overflow-x-hidden flex flex-row items-center justify-start ">
        <Crosoual data={data} />
      </div>
    </section>
  );
};

export default BestLocation;
