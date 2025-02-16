import Image from "next/image";
import React from "react";

const SingleSectionBlog = ({data}) => {
  return (
    <div className="prose prose-lg max-w-none">
      <h2 className="text-2xl font-rubikmedium_500 mt-12 mb-4">
       {data?.title}
      </h2>
      <p className="text-gray-600 mb-8">
        {data?.content}
      </p>

      {/* In-article Image */}
      {data?.image?.url && (
      <div className="my-12">
        <Image
          src={data?.image?.url}
          alt={data?.alt}
          width={1200}
          height={600}
            className="w-full rounded-lg"
          />
          </div>
      )}
    </div>
  );
};

export default SingleSectionBlog;
