const getLatLng = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        resolve({ latitude, longitude });
      },
      err => {
        reject(err);
        console.log(err);
      }
    );
  });
};

export default getLatLng;
