const book = {
  _id: 'hagyjdeywu3y782u3iwejsukdhjesaujdhwuiyieu8iw',
  ownerid: 'anhsjhdhyhweysjhd3y7hweuhdjheyuhwiu38i',
  status: 'available, sold', // dropdown list - sold books will be disappeared after specific time from the last updated date
  title: 'Jurney to the center of the earth',
  author: 'Author Name',
  imageids: [ids_of_the_photos],
  // thumbnail: 'binary',
  publishdate: 'March 2017',
  category: 'Fantacy', // dropdown list
  language: 'English', // dropdown list
  summary: 'Summary about the book',
  condition: 'Brand New, Lightly Used, OK, Heavely Used, Teared Apart', // dropdown list
  price: 125,
  currency: 'EP', // dropdown list as a start will be the default of the owner
  latitude: 102.04,
  longitude: 54.66, // filter list + add button to check current location and set it here
  keywords: ['action', 'comedy', 'horror'], // auto filter
  timestamp: 'createdAt, lastUpdated'
};
