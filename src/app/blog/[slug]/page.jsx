"use client";
import { Footer, Newsletter } from "@/components/common";
import SingleBlog from "@/components/SingleBlog";
import axios from "axios";
import { useEffect, useState } from "react";

const Page = ({ params }) => {
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(
        `https://travelgo-blog-backend-141065095049.us-central1.run.app/api/v1/blog/${params.slug}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.data || !res.data.blog) {
        throw new Error("Blog not found");
      }

      setBlog(res.data.blog);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [params.slug]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-2xl text-red-500">{error}</p>
        <button
          onClick={fetchBlog}
          className="mt-4 px-6 py-2 border border-solid border-[#333333] rounded-[4px] hover:bg-gray-100"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-[100px]">
      <SingleBlog data={blog} isLoading={isLoading} />
      <Newsletter />
      <Footer />
    </main>
  );
};

export default Page;
