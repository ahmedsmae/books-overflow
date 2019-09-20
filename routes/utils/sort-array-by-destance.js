/**
 * Function to get the destance in Km or Meters between 2 points
 * @param {number} lat1 - 1st latitude
 * @param {number} lon1 - 1st longitude
 * @param {number} lat2 - 2nd latitude
 * @param {number} lon2 - 2nd longitude
 * @source - https://snipplr.com/view/25479/calculate-distance-between-two-points-with-latitude-and-longitude-coordinates/
 */
const distance = (lat1, lon1, lat2, lon2) => {
  var R = 6371; // km (change this constant to get miles)
  var dLat = ((lat2 - lat1) * Math.PI) / 180;
  var dLon = ((lon2 - lon1) * Math.PI) / 180;
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return Math.round(d * 1000);
};

const sortArrayByDistance = (userLat, userLng, itemsArray) => {
  const finalArray = [];
  if (userLat && userLng) {
    // calculate the distance of the item from the user and add it as a distance prop into the item itself
    for (let i = 0; i < itemsArray.length; i++) {
      const itemDistance = distance(
        userLat,
        userLng,
        itemsArray[i].userLat,
        itemsArray[i].userLng
      );

      // convert mongoose model to js object
      const newItem = { ...itemsArray[i].toObject(), distance: itemDistance };
      finalArray.push(newItem);
    }

    // arrange the array from the closest to the farest
    return finalArray.sort((a, b) => (a.distance > b.distance ? 1 : -1));
  }
};

module.exports = { sortArrayByDistance };
