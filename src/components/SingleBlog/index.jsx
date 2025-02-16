"use client";
import Image from "next/image";
import React from "react";
import SingleSectionBlog from "./SingleSectionBlog";

const SingleBlog = ({ data }) => {
  return (
    <article className="max-w-4xl mx-auto px-4">
      {/* Post Header */}
      <div className="text-center pt-16 pb-8">
        <span className="text-yellow-500 text-sm uppercase">
          {data?.category}
        </span>
        <h1 className="text-[48px] font-rubikmedium_500 leading-tight mt-4 mb-6">
          {data?.title}
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          {data?.subtitle}
        </p>
      </div>

      {/* Main Image */}
      <div className="mb-12">
        <Image
          src={data?.featureImage?.url || "/default-image.jpg"}
          alt={data?.alt || "Blog image"}
          width={1200}
          height={600}
          className="w-full rounded-lg"
        />
      </div>

      {/* Blog Sections */}
      {data?.sections?.map((item, index) => (
        <SingleSectionBlog key={index} data={item} />
      ))}
    </article>
  );
};

export default SingleBlog;
