export function getPlaceAndState(destination) {
  const parts = destination?.split(",");
  const place = parts[0]?.trim();
  const state = parts[1] ? parts[1]?.trim() : place;
  return {
    place: place,
    state: state,
  };
}
