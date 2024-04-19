// PlaceSearch.js
async function placeSearch(latitude, longitude, category) {
  try {
    const searchParams = new URLSearchParams({
      query: category,
      ll: `${latitude},${longitude}`,
      open_now: 'true',
      sort: 'DISTANCE',
    });

    const results = await fetch(
      `https://api.foursquare.com/v3/places/search?${searchParams}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'fsq38XyJZ6AXlWejpMClNvTsDrdeIoosHP6icQ7QiiDsHuI=',
        }
      }
    );

    const data = await results.json();
    const places = data.results.map((place) => ({
      ...place,
      distance: place.distance || calculateDistance(place.geocodes.main, latitude, longitude),
    }));
    return places;
  } catch (err) {
    console.error(err);
  }
}

function calculateDistance(coordinates, targetLatitude, targetLongitude) {
  if (!coordinates || !coordinates.latitude || !coordinates.longitude) {
    return 0; // Return 0 if coordinates are invalid
  }

  const { latitude, longitude } = coordinates;

  const toRad = (value) => (value * Math.PI) / 180;

  const distance =
    Math.acos(
      Math.sin(toRad(targetLatitude)) * Math.sin(toRad(latitude)) +
        Math.cos(toRad(targetLatitude)) *
          Math.cos(toRad(latitude)) *
          Math.cos(toRad(targetLongitude) - toRad(longitude))
    ) * 6371000; // Distance in meters

  return distance;
}

export default placeSearch;