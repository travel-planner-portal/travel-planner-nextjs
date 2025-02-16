"use client"

import { Button } from "@/components/ui/button";
import { Footer, Newsletter } from "@/components/common";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import BestLocation from "@/components/blog/BestLocation";

export default function page() {


  const [blogs, setBlogs] = useState([]);


  const fetchBlogs = async () => {
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
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);


  return (
    <main className="min-h-screen bg-background mt-[100px] ">
      {/* Header */}
    

      {/* Hero Section */}
      <section className="container max-w-[88rem] mx-auto px-4 py-12 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm font-medium text-yellow-500 mb-4">{blogs[0]?.category}</p>
          <h1 className="text-4xl font-bold mb-4">
           {blogs[0]?.title}
          </h1>
          <p className="text-gray-600 mb-6">
            {blogs[0]?.subtitle}
          </p>
          <Link href={"/blog/1"} className="border border-solid border-[#333333] rounded-[4px] mt-[24px] px-6 py-4">Read more</Link>
        </div>
        <div className="relative h-[400px]">
          <Image
            src={blogs[0]?.featureImage?.url}
            alt="Mountain landscape"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </section>

      {/* Best Locations */}
      <BestLocation data={blogs}/>

      {/* Featured Topics */}
    
      <Newsletter />

      <Footer />
    </main>
  );
}
