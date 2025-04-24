import defaultActivityImage from "@/assets/default_activity.jpg";

// Return string instead of string | null to simplify usage
export const googlePlacePhotos = async (placeName: string): Promise<string> => {
  // Check if the Google Maps JavaScript API is available
  if (
    !window.google ||
    !window.google.maps ||
    !window.google.maps.places
  ) {
    console.error("Google Maps JavaScript API not loaded");
    return defaultActivityImage;
  }

  // Create a temporary map container
  const mapDiv = document.createElement("div");
  const service = new window.google.maps.places.PlacesService(
    new window.google.maps.Map(mapDiv)
  );

  const request: google.maps.places.TextSearchRequest = {
    query: placeName,
  };

  return new Promise((resolve) => {
    service.textSearch(request, (results, status) => {
      if (
        status === window.google.maps.places.PlacesServiceStatus.OK &&
        results &&
        results[0]?.photos?.length
      ) {
        const photoUrl = results[0].photos[0].getUrl();
        resolve(photoUrl);
      } else {
        console.warn("No photo found for:", placeName, "Status:", status);
        resolve(defaultActivityImage);
      }
    });
  });
};