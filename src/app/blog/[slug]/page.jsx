"use client";

import { Button } from "@/components/ui/button";

import { Footer, Newsletter } from "@/components/common";
import Link from "next/link";
import Image from "next/image";

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-medium text-xl">toGo</span>
          </Link>
          <span className="text-sm">MENU</span>
        </div>
      </header>

      {/* Blog Post Content */}
      <article className="max-w-4xl mx-auto px-4">
        {/* Post Header */}
        <div className="text-center pt-16 pb-8">
          <span className="text-yellow-500 text-sm uppercase">featured</span>
          <h1 className="text-[48px] font-medium leading-tight mt-4 mb-6">
            10 Best Things To Do At Machu Picchu In Peru
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            After trapping some photos at the iconic overlook, it's time to tour
            the ancient ruins, meet the friendly llamas, and hike some of the
            spectacular mountain trails surrounding the Machu Picchu citadel.
          </p>
        </div>

        {/* Main Image */}
        <div className="mb-12">
          <Image
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
            alt="Machu Picchu landscape"
            width={1200}
            height={600}
            className="w-full rounded-lg"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            As we step into a new era, the beauty industry continues to evolve
            with groundbreaking innovations that redefine skincare, makeup, and
            self-care practices. In this review, we'll explore the cutting-edge
            beauty products and technologies that are set to make waves in 2023,
            promising to elevate our beauty routines to new heights.
          </p>

          <h2 className="text-2xl font-medium mt-12 mb-4">
            Sustainable Beauty Practices and Devices
          </h2>
          <p className="text-gray-600 mb-8">
            In 2023, sustainability takes center stage in the beauty industry.
            From eco-friendly packaging to responsibly sourced ingredients,
            beauty brands are reimagining their entire approach to
            sustainability. Look out for products that not only enhance your
            beauty but also contribute to a healthier planet.
          </p>

          <h2 className="text-2xl font-medium mt-12 mb-4">Biometric Beauty</h2>
          <p className="text-gray-600 mb-8">
            Biometric technology is making its mark in the beauty world.
            Customized skincare formulations based on individual biometric data,
            such as DNA and skin microbiome analysis, are becoming more
            prevalent. These personalized approaches ensure that beauty products
            are tailored to meet the specific needs of each user.
          </p>

          {/* In-article Image */}
          <div className="my-12">
            <Image
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
              alt="Beauty Products"
              width={1200}
              height={600}
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-medium">
            Stay Trendy with Our Latest Insights
          </h2>
          <div className="flex justify-between items-center">
            <div className="flex-1" />
            <Button variant="link" className="text-gray-600">
              See More
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Seasonal Makeup Trends: Fall Edition",
              description:
                "Dive into the enchanting world of fall-inspired makeup trends. From warm hues to bold lip colors, discover the latest beauty trends that will elevate your autumn beauty routine.",
              author: "Jane Doe",
              readTime: "5min read",
            },
            {
              title: "Reviewing the Latest Beauty Innovations in 2023",
              description:
                "Stay on the cutting edge of beauty with a comprehensive round-up of the latest trends in the industry. From skincare breakthroughs to high-tech beauty gadgets, explore what's new in 2023.",
              author: "Jane Doe",
              readTime: "5min read",
            },
            {
              title: "Reader Spotlight: Transformation Stories",
              description:
                "Witness the incredible transformations of our valued customers. Read real stories of beauty journeys, complete with before-and-after photos, and be inspired by the power of self-care.",
              author: "Jane Doe",
              readTime: "5min read",
            },
          ].map((post, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="bg-white rounded-xl border border-gray-100">
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-t-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {post.description}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{post.author}</span>
                    <div className="flex items-center gap-6">
                      <span>{post.readTime}</span>
                      <span>→</span>
                    </div>
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
