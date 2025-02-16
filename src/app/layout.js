import { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

// Move structured data to a constant
const structuredLD = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "FindTrip",
  url: "https://findtrip.in",
  logo: "https://instagram.fdel1-5.fna.fbcdn.net/v/t51.2885-19/476488849_488266217410330_7706787151977455355_n.jpg?_nc_ht=instagram.fdel1-5.fna.fbcdn.net&_nc_cat=110&_nc_ohc=HfUXjABL_Y4Q7kNvgGbyQpJ&_nc_gid=435e6f9c340f4d5da67fe41066b835c4&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYDel2hio7JVJZB2y1_0Lg9jMKXjox7diUNpl651sbKk5A&oe=67B03B16&_nc_sid=7a9f4b",
  description:
    "AI-powered travel planner providing personalized trip itineraries",
  telephone: "+91-9140257102",
  address: {
    "@type": "PostalAddress",
    streetAddress: "147, near RB paper mill, sectior 23 Gurugram",
    addressLocality: "Gurugram",
    addressRegion: "Haryana",
    postalCode: "122017",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "28.5054° N",
    longitude: "77.0493° E",
  },
  sameAs: [
    "https://www.linkedin.com/company/findtripindia",
    "https://www.instagram.com/findtrip.in",
  ],
};

export const metadata = {
  title: "FindTrip - AI Powered Travel Planner | Personalized Trip Itineraries",
  description:
    "Plan your perfect trip with FindTrip, India's leading AI-powered travel planner. Get personalized itineraries tailored to your interests, budget, and travel style.",
  keywords:
    "AI trip planner, personalized travel itinerary, FindTrip, find trip,find,trip, travel planning, smart travel, vacation planner, India travel, custom itinerary, travel recommendations, budget travel planner, local experiences, travel app",
  openGraph: {
    title:
      "FindTrip - AI Powered Travel Planner | Personalized Trip Itineraries",
    description:
      "Plan your perfect trip with FindTrip, India's leading AI-powered travel planner. Get personalized itineraries tailored to your interests, budget, and travel style.",
    url: "https://findtrip.in/",
    siteName: "FindTrip",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://findtrip.in/og-image.jpg",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="canonical" href="https://findtrip.in/" />
        <meta name="author" content="FindTrip" />
        <meta name="copyright" content="FindTrip" />
        <meta httpEquiv="Cache-control" content="public, max-age=31536000" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredLD),
          }}
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
