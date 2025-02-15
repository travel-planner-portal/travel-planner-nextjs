// src/app/tripdetailspage/[id]/page.js
"use client";

import { useParams } from "next/navigation";
import TripDetailsPage from "@/components/TripDetailsPage";

export default function TripDetails() {
  const params = useParams();

  const parseId = (id) => {
    if (!id) return { destination: "", duration: null };

    try {
      // First, properly decode the URL
      const decodedId = decodeURIComponent(id);

      // Clean up the URL format
      // Remove any instances of "days" at the end
      const cleanId = decodedId.replace(/days+$/, "");

      // Extract the number at the end
      const numberMatch = cleanId.match(/(\d+)$/);
      if (!numberMatch) return { destination: cleanId, duration: null };

      const duration = parseInt(numberMatch[1], 10);
      // Remove the number from the end to get the destination
      const destination = cleanId
        .slice(0, -numberMatch[0].length)
        .replace(/[-,\s]+$/, "") // Remove trailing separators
        .replace(/[-,\s]+/g, " ") // Replace separators with spaces
        .trim();

      return {
        destination: destination
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" "),
        duration,
      };
    } catch (error) {
      console.error("Error parsing URL:", error);
      return { destination: "", duration: null };
    }
  };

  const { destination, duration } = parseId(params.id);

  return (
    <TripDetailsPage
      initialDestination={destination}
      initialDuration={duration}
    />
  );
}
