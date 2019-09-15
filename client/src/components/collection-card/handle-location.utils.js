import axios from 'axios';

const API_KEY = 'AIzaSyBSXyUtsrRB3k33sqSAGYy8wNR_DBjJasc';
// there is another API_KEY at index.html

export const fetchLatLng = async (lat, lng) => {
  if (!!lat && !!lng) {
    try {
      const response = await axios({
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/geocode/json?`,
        params: {
          latlng: `${lat},${lng}`,
          key: API_KEY
        }
      });

      return response.data.results[0].formatted_address;
    } catch (err) {
      return console.log(err);
    }
  }
};
