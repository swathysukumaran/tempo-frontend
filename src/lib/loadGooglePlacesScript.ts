export const loadGooglePlacesScript = () => {
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}&libraries=places`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
  return new Promise((resolve) => {
    script.onload = () => resolve(true);
  });
};