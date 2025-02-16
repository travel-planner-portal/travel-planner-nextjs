import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiArrowLongRight } from "react-icons/hi2";

const BlogCard = ({ data }) => {
  return (
    <div className="w-full flex flex-col items-start justify-start p-2 border-solid border border-[#333333] rounded-[4px] gap-4 pb-4">
      <div className="w-full h-[416px] relative rounded-[4px] overflow-hidden ">
        <Image src={data.featureImage.url} layout="fill" alt={data.alt} />
      </div>
      <div className=" w-full flex flex-row items-center justify-between px-4   ">
        <p className="w-full line-clamp-1">{data.title}</p>
        <Link href={`/blog/${data._id}`} className="group">
          <HiArrowLongRight className="text-[24px] group-hover:text-[#C0D122] hover:translate-x-[5px] transition-all duration-300 ease-in-out" />
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
