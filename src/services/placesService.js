const getPlacePhotos = async (location) => {
  try {
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    const request = {
      query: `tourist attractions in ${location}`,
      fields: ["name", "photos", "rating", "formatted_address"],
    };

    return new Promise((resolve, reject) => {
      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const placesWithPhotos = results.map((place) => ({
            id: place.place_id,
            name: place.name,
            address: place.formatted_address,
            rating: place.rating,
            photos: place.photos
              ? place.photos.map((photo) => ({
                  url: photo.getUrl({ maxWidth: 500, maxHeight: 300 }),
                  attribution: photo.html_attributions,
                }))
              : [],
          }));
          resolve(placesWithPhotos);
        } else {
          reject(new Error("Failed to fetch places"));
        }
      });
    });
  } catch (error) {
    console.error("Error fetching place photos:", error);
    throw error;
  }
};

const getNearbyPlaces = async (latitude, longitude) => {
  try {
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    const request = {
      location: { lat: latitude, lng: longitude },
      radius: "5000",
      type: ["tourist_attraction"],
    };

    return new Promise((resolve, reject) => {
      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const places = results.map((place) => ({
            id: place.place_id,
            name: place.name,
            location: place.geometry.location.toJSON(),
            rating: place.rating,
            photos: place.photos
              ? place.photos.map((photo) => ({
                  url: photo.getUrl({ maxWidth: 500, maxHeight: 300 }),
                  attribution: photo.html_attributions,
                }))
              : [],
            types: place.types,
            vicinity: place.vicinity,
          }));
          resolve(places);
        } else {
          reject(new Error("Failed to fetch nearby places"));
        }
      });
    });
  } catch (error) {
    console.error("Error fetching nearby places:", error);
    throw error;
  }
};

export { getPlacePhotos, getNearbyPlaces };
