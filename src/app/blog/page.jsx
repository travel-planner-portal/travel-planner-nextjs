"use client";

import { Button } from "@/components/ui/button";
import { Footer, Newsletter } from "@/components/common";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <MapPin className="h-6 w-6" />
            <span className="font-bold text-xl">FindTrip</span>
          </Link>
          <Button variant="ghost">MENU</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 grid md:grid-cols-2 gap-12 items-center">
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
          <Button>Read more</Button>
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
      <section className="container mx-auto px-4 py-12">
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
      <section className="container mx-auto px-4 py-12">
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

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Seasonal Makeup Trends: Fall Edition",
              date: "Oct 1, 2023",
              description:
                "Dive into the enchanting world of fall-inspired makeup trends. From warm hues to bold lip colors, discover the latest beauty trends that will elevate your autumn beauty routine.",
              author: "Jane Doe",
              readTime: "5min read",
              imageSrc:
                "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
            },
            {
              title: "Reviewing the Latest Beauty Products of 2023",
              date: "Sep 25, 2023",
              description:
                "An in-depth look at the newest beauty products, providing honest reviews to help you make informed decisions.",
              author: "Emily Roe",
              readTime: "7min read",
              imageSrc:
                "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
            },
            {
              title: "Reader Spotlight: Transformation Stories",
              date: "Sep 20, 2023",
              description:
                "Discover inspiring stories from our readers who have transformed their beauty routines and lives.",
              author: "John Smith",
              readTime: "6min read",
              imageSrc:
                "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
            },
            {
              title: "Inside IBI: Product Development Journey",
              date: "Sep 15, 2023",
              description:
                "Go behind the scenes to explore the creative journey of product development at IBI.",
              author: "Sarah Lee",
              readTime: "8min read",
              imageSrc:
                "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
            },
            {
              title: "Exclusive Interview with Jenna Smith, Founder & CEO",
              date: "Sep 10, 2023",
              description:
                "Gain insights from Jenna Smith, the visionary behind IBI, in an exclusive one-on-one interview.",
              author: "Chris Doe",
              readTime: "9min read",
              imageSrc:
                "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
            },
            {
              title: "Step-by-Step Guide: Achieving the Perfect Smokey Eye",
              date: "Sep 5, 2023",
              description:
                "Learn how to create a flawless smokey eye with this easy-to-follow guide, complete with tips and tricks.",
              author: "Anna Grace",
              readTime: "4min read",
              imageSrc:
                "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="group cursor-pointer overflow-hidden border rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-[200px]">
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">
                      {item.author} · {item.readTime}
                    </p>
                  </div>
                  <div className="text-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Newsletter />

      <Footer />
    </main>
  );
}
