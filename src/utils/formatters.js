export const formatStationsData = (routeData) => {
  const nearestStations = routeData?.nearestStations || {};
  return {
    description: "Nearest Stations",
    railway: nearestStations.railway || { name: "", distance: "" },
    airport: nearestStations.airport || { name: "", distance: "" },
    bus: nearestStations.bus || { name: "", distance: "" },
  };
};
