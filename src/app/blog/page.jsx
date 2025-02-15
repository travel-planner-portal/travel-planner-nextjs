"use client";

import { Button } from "@/components/ui/button";
import { Footer, Newsletter } from "@/components/common";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-background mt-[100px] ">
      {/* Header */}
    

      {/* Hero Section */}
      <section className="container max-w-[88rem] mx-auto px-4 py-12 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm font-medium text-yellow-500 mb-4">FEATURED</p>
          <h1 className="text-4xl font-bold mb-4">
            Popular travel blog, funs & posts & guides
          </h1>
          <p className="text-gray-600 mb-6">
            No trip to Peru would be complete without a visit to the 'lost city'
            of Machu Picchu, and there are quite a few wonderful hikes and other
            things to do in Machu Picchu if you have the time.
          </p>
          <Link href={"/blog/1"}>Read more</Link>
        </div>
        <div className="relative h-[400px]">
          <Image
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
            alt="Mountain landscape"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </section>

      {/* Best Locations */}
      <section className="container max-w-[88rem] mx-auto px-4 py-12">
        <div className="flex gap-12">
          {/* Left side - Title and navigation */}
          <div className="w-64 flex-shrink-0">
            <div className="flex items-center gap-4 mb-6">
              <button className="text-gray-400 hover:text-gray-600">←</button>
              <button className="text-yellow-500 hover:text-yellow-600">
                →
              </button>
            </div>
            <div>
              <p className="text-sm font-medium text-yellow-500 uppercase mb-4">
                Categories
              </p>
              <h2 className="text-[40px] leading-tight font-medium text-gray-900 mb-8">
                Best in Location
              </h2>
              <button className="px-8 py-2 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50">
                See More
              </button>
            </div>
          </div>

          {/* Right side - Location cards */}
          <div className="flex-1">
            <div className="grid grid-cols-3 gap-6">
              {["Manali", "Goa", "Sikkim"].map((location) => (
                <div key={location} className="group">
                  <div className="bg-white rounded-lg border border-gray-100">
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg">
                      <Image
                        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
                        alt={location}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="px-4 py-3 flex justify-between items-center">
                      <span className="text-lg text-gray-900">{location}</span>
                      <span className="text-gray-400">→</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Topics */}
      <section className="container max-w-[88rem] mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-sm font-medium text-yellow-500 mb-2">
              TRENDING TOPICS
            </p>
            <h2 className="text-5xl  font-Nunito Sans">
              Stay Trendy with Our Latest Insights
            </h2>
          </div>
          <Button variant="outline">See More</Button>
        </div>

      
      </section>
      <Newsletter />

      <Footer />
    </main>
  );
}
