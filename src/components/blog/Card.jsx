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
      <div className=" w-full flex flex-row items-center justify-between px-4">
        <p>{data.title}</p>
        <Link href={`/blog/${data._id}`}>
          <HiArrowLongRight className="text-[24px]" />
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
