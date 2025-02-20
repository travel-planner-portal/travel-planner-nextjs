"use client";

import BestLocation from "@/components/blog/BestLocation";
import StayTrendy from "@/components/blog/StayTrendy";
import { Footer, Newsletter } from "@/components/common";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link"; 

export default function Page() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://travelgo-blog-backend-141065095049.us-central1.run.app/api/v1/blog",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.data); // Use `response.data` instead of logging the full response object
      setBlogs(response.data.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (isError) return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-2xl text-red-500">Error fetching blogs</p>
      <button
        onClick={fetchBlogs}
        className="mt-4 px-6 py-2 border border-solid border-[#333333] rounded-[4px] hover:bg-gray-100"
      >
        Try Again
      </button>
    </div>
  );

  if (!blogs.length && !isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full text-[24px]">
      No blogs found We are Updating Soon 😊
    </div>
  );

  return (
    <main className="min-h-screen bg-background mt-[100px] ">
      {/* Header */}

      {/* Hero Section */}
      {/* <section className="container max-w-[88rem] mx-auto px-4 py-12 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm font-medium text-yellow-500 mb-4">
            {blogs[0]?.category}
          </p>
          <h1 className="text-4xl font-bold mb-4 line-clamp-2">{blogs[0]?.title}</h1>
          <p className="text-gray-600 mb-6 line-clamp-3">{blogs[0]?.subtitle}</p>
          <Link href={`/blog/${blogs[0]?._id}`} className="px-6 py-2  border border-solid border-[#333333] rounded-[4px] capitalize mt-6">
            {" "}
            read now
          </Link>
        </div>
        <div className="relative h-[400px]">
          {blogs[0]?.featureImage?.url && (
            <Image
              src={blogs[0]?.featureImage?.url}
              alt="Mountain landscape"
              fill
              className="object-cover rounded-lg"
            />
          )}
        </div>
      </section> */}

      {/* Best Locations */}
      {/* <BestLocation data={blogs} /> */}
      <StayTrendy data={blogs} isLoading={isLoading} />

      {/* Featured Topics */}

      <Newsletter />

      <Footer />
    </main>
  );
}
