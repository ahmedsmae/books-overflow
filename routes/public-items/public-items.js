const express = require('express');
const router = express.Router();

const Book = require('../../database/models/book');
const Collection = require('../../database/models/collection');

const { sortArrayByDistance } = require('../utils/sort-array-by-destance');

/**
 * @method - POST
 * @url - 'api/publicitems/all'
 * @data - { latitude, longitude }
 * @action - get all books and collections + public owner info
 * @access - public
 */
router.post('/all', async (req, res) => {
  const { latitude, longitude } = req.body;

  try {
    const books = await Book.find().populate('owner', [
      'firstname',
      'lastname',
      'email',
      'avatarid',
      'defaultlatitude',
      'defaultlongitude',
      'bio'
    ]);

    const collections = await Collection.find().populate('owner', [
      'firstname',
      'lastname',
      'email',
      'avatarid',
      'defaultlatitude',
      'defaultlongitude',
      'bio'
    ]);

    // merge books and collections
    const allItems = [...books, ...collections];

    const items = sortArrayByDistance(latitude, longitude, allItems);

    res.json({ items });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - POST
 * @url - 'api/publicitems/searchitems'
 * @data - {  titleQuery, authorQuery, advancedSearch, booksIncluded, collectionsIncluded, distanceMax,
      category, language, condition, priceMin, priceMax, searchLat, searchLng }
 * @action - get books and collections based on recieved search query
 * @access - public
 */
router.post('/searchitems', async (req, res) => {
  // console.log(req.body);
  let {
    titleQuery,
    authorQuery,
    category,
    language,
    condition,

    priceMin,
    priceMax,

    booksIncluded,
    collectionsIncluded,

    distanceMax,
    searchLat,
    searchLng
  } = req.body;

  try {
    let books;
    if (booksIncluded) {
      let booksSearchObject = {};
      if (titleQuery.length)
        booksSearchObject.title = { $regex: titleQuery, $options: 'i' };
      if (authorQuery.length)
        booksSearchObject.author = { $regex: authorQuery, $options: 'i' };
      if (category.length)
        booksSearchObject.category = { $regex: category, $options: 'i' };
      if (language.length)
        booksSearchObject.language = { $regex: language, $options: 'i' };
      if (condition.length)
        booksSearchObject.condition = { $regex: condition, $options: 'i' };

      if (priceMax) {
        booksSearchObject.price = { $gt: priceMin, $lt: priceMax };
      } else {
        booksSearchObject.price = { $gt: priceMin };
      }

      books = await Book.find(booksSearchObject).populate('owner', [
        'firstname',
        'lastname',
        'email',
        'avatarid',
        'defaultlatitude',
        'defaultlongitude',
        'bio'
      ]);
    }

    let collections;
    if (collectionsIncluded) {
      collections = await Collection.find({
        'books.title': { $regex: titleQuery, $options: 'i' },
        'books.author': { $regex: authorQuery, $options: 'i' },
        'books.condition': { $regex: condition, $options: 'i' },
        category: { $regex: category, $options: 'i' },
        language: { $regex: language, $options: 'i' },
        price: priceMax ? { $gt: priceMin, $lt: priceMax } : { $gt: priceMin }
      }).populate('owner', [
        'firstname',
        'lastname',
        'email',
        'avatarid',
        'defaultlatitude',
        'defaultlongitude',
        'bio'
      ]);
    }

    // merge books and collections
    let allItems = [];
    if (books) allItems = [...allItems, ...books];
    if (collections) allItems = [...allItems, ...collections];

    const items = sortArrayByDistance(searchLat, searchLng, allItems);

    res.json({ items });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
