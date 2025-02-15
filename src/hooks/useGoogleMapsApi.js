import { useState, useEffect } from "react";

export const useGoogleMapsApi = ({ libraries = [], googleMapsApiKey }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);

  // Update the useEffect in your useGoogleMapsApi hook
  useEffect(() => {
    if (window.google?.maps) {
      setIsLoaded(true);
      return;
    }

    const scriptId = "google-maps-script";
    const existingScript = document.getElementById(scriptId);

    // If script already exists but hasn't loaded yet
    if (existingScript) {
      const handleLoad = () => setIsLoaded(true);
      const handleError = (err) => setLoadError(err);

      existingScript.addEventListener("load", handleLoad);
      existingScript.addEventListener("error", handleError);

      return () => {
        existingScript.removeEventListener("load", handleLoad);
        existingScript.removeEventListener("error", handleError);
      };
    }

    // Create new script if none exists
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=${libraries.join(
      ","
    )}`;
    script.async = true;
    script.defer = true;

    script.onload = () => setIsLoaded(true);
    script.onerror = () =>
      setLoadError(new Error("Failed to load Google Maps API"));

    document.body.appendChild(script);

    // Remove cleanup that deletes the script
    return () => {};
  }, [libraries, googleMapsApiKey]);

  return { isLoaded, loadError };
};
