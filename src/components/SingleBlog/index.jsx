"use client";
import Image from "next/image";
import React from "react";
import SingleSectionBlog from "./SingleSectionBlog";
import SingleBlogSkeleton from "./SingleBlogSkeleton";

const SingleBlog = ({ data, isLoading }) => {
  if (isLoading) {
    return <SingleBlogSkeleton />;
  }

  return (
    <article className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
      {/* Post Header */}
      <div className="text-center pt-8 md:pt-12 lg:pt-16 pb-6 md:pb-8">
        <span className="text-yellow-500 text-sm md:text-base uppercase">
          {data?.category}
        </span>
        <h1 className="text-[32px] md:text-[40px] lg:text-[48px] font-rubikmedium_500 leading-tight mt-4 mb-6">
          {data?.title}
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          {data?.subtitle}
        </p>
      </div>

      {/* Main Image */}
      {data?.featureImage?.url && (
        <div className="mb-8 md:mb-12">
          <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
            <Image
              src={data?.featureImage?.url}
              alt={data?.alt || "Blog image"}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Blog Sections */}
      <div className="space-y-8 md:space-y-12">
        {data?.sections?.map((item, index) => (
          <SingleSectionBlog key={index} data={item} />
        ))}
      </div>
    </article>
  );
};

export default SingleBlog; 
