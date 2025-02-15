import axios from "axios";
import { SearchIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

class LocationService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.geocodingUrl = "https://maps.googleapis.com/maps/api/geocode/json";
  }

  async getCoordinates(locationQuery) {
    try {
      const response = await axios.get(this.geocodingUrl, {
        params: {
          address: locationQuery,
          key: this.apiKey,
        },
      });

      if (response.data.results && response.data.results.length > 0) {
        const location = response.data.results[0].geometry.location;
        return {
          latitude: location.lat,
          longitude: location.lng,
          formattedAddress: response.data.results[0].formatted_address,
        };
      }
      throw new Error("Location not found");
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      throw new Error("Failed to get coordinates for the location");
    }
  }

  static extractLocations(searchQuery) {
    const patterns = [/(?:from\s+)?(.+?)\s+to\s+(.+)/i, /(.+?)\s*[-→]\s*(.+)/i];

    for (const pattern of patterns) {
      const match = searchQuery.match(pattern);
      if (match) {
        return {
          source: match[1].trim(),
          destination: match[2].trim(),
        };
      }
    }

    return {
      destination: searchQuery.trim(),
    };
  }
}

class YouTubeLocationSearch {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://www.googleapis.com/youtube/v3/search";
  }

  async searchVideosByLocation({
    latitude,
    longitude,
    searchQuery = "",
    radiusKm = 10,
    maxResults = 10,
    pageToken = "",
    publishedAfter = null,
  }) {
    try {
      const params = {
        part: "snippet",
        type: "video",
        location: `${latitude},${longitude}`,
        locationRadius: `${radiusKm}km`,
        maxResults: maxResults,
        key: this.apiKey,
        pageToken: pageToken,
        order: "date",
        q: searchQuery,
      };

      if (publishedAfter) {
        params.publishedAfter = publishedAfter.toISOString();
      }

      const response = await axios.get(this.baseUrl, { params });

      const videos = response.data.items.map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnails: item.snippet.thumbnails,
        publishedAt: item.snippet.publishedAt,
        embedUrl: `https://www.youtube.com/embed/${item.id.videoId}`,
      }));

      return {
        videos,
        nextPageToken: response.data.nextPageToken,
        totalResults: response.data.pageInfo.totalResults,
      };
    } catch (error) {
      console.error("Error fetching YouTube videos:", error);
      throw new Error(
        error.response?.data?.error?.message || "Failed to fetch YouTube videos"
      );
    }
  }

  static validateCoordinates(latitude, longitude) {
    return (
      latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180
    );
  }
}

const VideoSkeleton = () => (
  <div className="p-4 border rounded animate-pulse">
    <div className="aspect-video bg-gray-200 rounded"></div>
    <div className="mt-2 h-5 bg-gray-200 rounded w-3/4"></div>
    <div className="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
  </div>
);

const YouTubeLocationFeed = ({ radius = 10, searchQuery = "" }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextPageToken, setNextPageToken] = useState("");
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationService] = useState(
    () => new LocationService("AIzaSyCYJrqHjJ-F2CzVwPZmH_PF4qU1d0vi2_k")
  );

  const observerTarget = useRef(null);

  // Implement infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextPageToken && !loading) {
          fetchAllVideos(nextPageToken);
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [nextPageToken, loading]);

  const searchLocations = async (query) => {
    const locations = LocationService.extractLocations(query);
    const locationResults = [];

    if (locations.source) {
      const sourceLocation = await locationService.getCoordinates(
        locations.source
      );
      locationResults.push({
        ...sourceLocation,
        type: "source",
        searchTerm: locations.source,
      });
    }

    if (locations.destination) {
      const destLocation = await locationService.getCoordinates(
        locations.destination
      );
      locationResults.push({
        ...destLocation,
        type: "destination",
        searchTerm: locations.destination,
      });
    }

    return locationResults;
  };

  const fetchVideosForLocation = async (location, pageToken = "") => {
    const yt = new YouTubeLocationSearch(
      "AIzaSyCYJrqHjJ-F2CzVwPZmH_PF4qU1d0vi2_k"
    );
    const enhancedSearchQuery = `${location.searchTerm} trip vlogs`;
    return await yt.searchVideosByLocation({
      latitude: location.latitude,
      longitude: location.longitude,
      searchQuery: enhancedSearchQuery,
      radiusKm: radius,
      pageToken,
    });
  };

  const fetchAllVideos = async (pageToken = "") => {
    setLoading(true);
    try {
      const locations = await searchLocations(searchInput);
      if (locations.length === 0) {
        throw new Error("No valid locations found");
      }

      const allResults = await Promise.all(
        locations.map((loc) => fetchVideosForLocation(loc, pageToken))
      );

      const combinedVideos = allResults.flatMap((result) => result.videos);
      const uniqueVideos = Array.from(
        new Map(combinedVideos.map((v) => [v.id, v])).values()
      );

      setVideos((prevVideos) =>
        pageToken ? [...prevVideos, ...uniqueVideos] : uniqueVideos
      );
      setNextPageToken(allResults[0].nextPageToken);
      setCurrentLocation(locations);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchAllVideos();
  };

  useEffect(() => {
    if (searchQuery) {
      setSearchInput(searchQuery);
      fetchAllVideos();
    }
  }, []);

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search videos (e.g., Delhi to Dalhousie trip)"
          className=" w-[calc(100%-40px)] md:flex-1 px-4 py-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-[#E5DD64]  text-[#414141] rounded font-rubikregular_400 flex flex-row items-center justify-center "
          disabled={loading}
        >
        <SearchIcon className="md:hidden w-4 h-4"/>
          <span className="hidden md:block"> Search</span>
        </button>
      </form>

      {currentLocation && (
        <div className="text-sm text-gray-600">
          {currentLocation.map((loc, index) => (
            <div key={index} className="mb-2">
              {loc.type === "source" ? "From: " : "Location: "}
              {loc.formattedAddress}
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div key={video.id} className="p-4 border rounded">
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={video.embedUrl}
                allowFullScreen
              />
            </div>
            <h3 className="mt-4 font-rubiksemibold_600">{video.title}</h3>
            <p className="text-sm mt-1 text-gray-600">
              {new Date(video.publishedAt).toLocaleDateString()}
            </p>
          </div>
        ))}
        {loading && (
          <>
            {Array.from({ length: 6 }).map((_, index) => (
              <VideoSkeleton key={`skeleton-${index}`} />
            ))}
          </>
        )}
        {loading && <div>Loading...</div>}
        {nextPageToken && !loading && (
          <div ref={observerTarget} className="h-10 w-full" />
        )}

        {/* Error State */}
        {error && (
          <div className="text-center text-red-500 p-4">Error: {error}</div>
        )}

        {/* No Results State */}
        {!loading && videos.length === 0 && !error && (
          <div className="text-center text-gray-500 p-4">
            No videos found. Try adjusting your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default YouTubeLocationFeed;
