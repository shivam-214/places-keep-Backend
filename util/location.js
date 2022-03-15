const axios = require("axios");
const httpError = require("../models/http-error");

const ACCESS_TOKEN = process.env.MAPBOX_APIKEY;

async function getCoordsForAddress(address) {
  const response = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json?access_token=${ACCESS_TOKEN}`
  );

  const responseData = response.data; // Data Recieved from here geocoding api
  if (!response.status === 200 || !responseData) {
    const error = new httpError(
      "Could not find the request for the specified address.",
      422
    );
    throw error;
  }

  const lng = responseData.features[0].center[0];
  const lat = responseData.features[0].center[1];
  return { lat, lng };
}

module.exports = getCoordsForAddress;
