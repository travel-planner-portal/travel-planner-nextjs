import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiArrowLongRight } from "react-icons/hi2";

const TrendyCard = ({ data }) => {
  return (
    <div className="flex flex-col items-start justify-start p-2 border border-solid border-[#333333] rounded-[4px] border-opacity-50 gap-2 group cursor-default">
      <div className=" h-[240px] w-[389px] relative rounded-[2px] overflow-hidden  ">
        <Image
          src={data.featureImage.url}
          layout="fill"
          alt={data.alt}
          className="object-cover group-hover:scale-[1.15] transition-all duration-300 ease-in-out"
        />
      </div>
      <div className="p-2 pb-0 flex flex-col items-start justify-start gap-4 w-full ">
        <p className="max-w-[373px] text-[24px] leading-[110%] font-rubikregular_400 text-[#333]">
          {data.title}
        </p>
        <p className="max-w-[373px] text-[#333333]/80 text-base font-rubiklight_300 leading-[140%] tracking-tight ">
          {data.subtitle}
        </p>
        <div className="max-w-[373px] border-t border-solid border-[#333333]/50  w-full flex flex-row items-center justify-between py-3">
          <div className="flex flex-row items-center justify-start gap-4">
            <p className="text-[14px] text-[#333] font-rubikregular_400">
                          {data.authorName}
            </p>
            <p className="text-[14px] text-[#333] font-rubikregular_400">
                          {data.readTime} mins read
            </p>
          </div>
          <Link href={`/blog/${data._id}`}>
            <HiArrowLongRight className="text-[24px] hover:text-[#C0D122]  hover:translate-x-[5px] transition-all duration-300 ease-in-out" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrendyCard;
