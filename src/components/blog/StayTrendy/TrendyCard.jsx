import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiArrowLongRight } from "react-icons/hi2";

const TrendyCard = ({ data }) => {
  return (
    <Link
      href={`/blog/${data._id}`}
      className="flex flex-col items-start justify-start p-2 border group border-solid border-[#333333] rounded-[4px] border-opacity-50 gap-2 w-full hover:shadow-lg transition-all duration-300"
    >
      <div className="w-full h-[200px] sm:h-[220px] md:h-[240px] relative rounded-[2px] overflow-hidden">
        <Image
          src={data.featureImage.url}
          layout="fill"
          alt={data.alt}
          className="object-cover group-hover:scale-[1.15] transition-all duration-300 ease-in-out"
        />
      </div>

      <div className="p-2 pb-0 flex flex-col items-start justify-start gap-4 w-full">
        <p className="w-full text-[20px] sm:text-[22px] md:text-[24px] leading-[110%] font-rubikregular_400 text-[#333] line-clamp-2">
          {data.title}
        </p>

        <p className="w-full text-[#333333]/80 text-[14px] sm:text-[15px] md:text-base font-rubiklight_300 leading-[140%] tracking-tight line-clamp-4">
          {data.subtitle}
        </p>

        <div className="w-full border-t border-solid border-[#333333]/50 flex flex-row items-center justify-between py-3 gap-2">
          <div className="flex flex-row items-center justify-start gap-2 md:gap-4 flex-wrap">
            <p className="text-[12px] md:text-[14px] text-[#333] font-rubikregular_400">
              {data.authorName}
            </p>
            <p className="text-[12px] md:text-[14px] text-[#333] font-rubikregular_400">
              {data.readTime} mins read
            </p>
          </div>

          <HiArrowLongRight className="text-[20px] md:text-[24px] group-hover:text-[#C0D122] group-hover:translate-x-[5px] transition-all duration-300 ease-in-out" />
        </div>
      </div>
    </Link>
  );
};

export default TrendyCard;
