const collection = {
  _id: 'ewhdhwuku4hy37wyjkhjdsh7ekjfdejeri',
  ownerid: 'jashdjeuswhudhweukh74uyi3eji84983jui',
  status: 'available, sold', // dropdown list - sold collection will be disappeared after specific time from the last updated date
  title: 'Collection 1',
  numberofbooks: 10,
  photoids: [ids_of_the_full_size_photos],
  books: [
    {
      title: 'Title of book',
      author: 'Author Name',
      condition: 'Brand New, Lightly Used, OK, Heavely Used, Teared Apart'
    }
  ],
  category: 'Mixed', // dropdown list
  language: 'English', // dropdown list
  summary: 'Summary about the collection',
  price: 500,
  currency: 'EP', // dropdown list as a start will be the default of the owner
  location: { altitude: 102.34, longitude: 54.66 }, // filter list as a start will be the default of the owner
  keywords: ['action', 'comedy', 'horror'], // auto filter
  timestamp: 'createdAt, lastUpdated'
};
