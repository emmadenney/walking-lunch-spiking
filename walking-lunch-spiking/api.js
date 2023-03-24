export const getPlaceDeatails = (place, apiKey) => {
  return fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&key=${apiKey}`
  ).then((response) => response.json());
};
