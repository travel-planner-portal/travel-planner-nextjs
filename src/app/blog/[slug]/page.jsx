import { Button } from "@/components/ui/button";

import { Footer, Newsletter } from "@/components/common";
import axios from "axios";
import Image from "next/image";
import SingleSectionBlog from "@/components/SingleBlog/SingleSectionBlog";

const fetchBlogs = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/v1/blog/67b045b21983fb79139fa75a",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.blog;
};

const Page = async () => {
  const data = await fetchBlogs();
  console.log(data);
  return (
    <main className="min-h-screen bg-white">
      {/* Blog Post Content */}
      <article className="max-w-4xl mx-auto px-4">
        {/* Post Header */}
        <div className="text-center pt-16 pb-8">
          <span className="text-yellow-500 text-sm uppercase">
            {data?.category}
          </span>
          <h1 className="text-[48px] font-medium leading-tight mt-4 mb-6">
            {data?.title}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {data?.subtitle}
          </p>
        </div>

        {/* Main Image */}
        <div className="mb-12">
          <Image
            src={data?.featureImage?.url}
            alt={data?.alt}
            width={1200}
            height={600}
            className="w-full rounded-lg"
          />
        </div>
        {data?.sections.map((item, index) => {
          return <SingleSectionBlog key={index} data={item} />;
        })}
      </article>

      {/* Related Posts */}

      <Newsletter />

      <Footer />
    </main>
  );
};

export default Page;
