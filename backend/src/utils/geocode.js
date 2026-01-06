export const geocodeLocation = async (place) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    place
  )}.json?access_token=${process.env.MAPBOX_TOKEN}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.features || data.features.length === 0) {
    throw new Error("Location not found");
  }

  return data.features[0].geometry.coordinates; // [lng, lat]
};
