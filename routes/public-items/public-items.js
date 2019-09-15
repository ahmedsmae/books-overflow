const express = require('express');
const router = express.Router();

const Book = require('../../database/models/book');
const Collection = require('../../database/models/collection');

const { distance } = require('./public-items.utils');

/**
 * @method - GET
 * @url - 'api/publicitems/all'
 * @data - { latitude, longitude }
 * @action - get all books and collections + public owner info
 * @access - public
 */
router.get('/all', async (req, res) => {
  // console.log(req);

  const { latitude, longitude } = req.body;
  // console.log(latitude, longitude);

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

    if (latitude && longitude) {
      // calculate the distance of the item from the user and add it as a distance prop into the item itself
      for (let i = 0; i < allItems.length; i++) {
        const itemDistance = distance(
          latitude,
          longitude,
          allItems[i].latitude,
          allItems[i].longitude
        );
        allItems[i].distance = itemDistance;
      }

      // arrange the array from the closest to the farest
      allItems.sort((a, b) => (a.distance > b.distance ? 1 : -1));
    }

    res.json({ items: allItems });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - GET
 * @url - 'api/publicitems/searchitems'
 * @data - {  titleQuery, authorQuery, advancedSearch, booksIncluded, collectionsIncluded, distanceMax,
      category, language, condition, priceMin, priceMax, searchLat, searchLng }
 * @action - get books and collections based on recieved search query
 * @access - public
 */
router.get('/searchitems', async (req, res) => {
  console.log(req.body);

  const {
    titleQuery,
    authorQuery,
    advancedSearch,
    booksIncluded,
    collectionsIncluded,
    distanceMax,
    category,
    language,
    condition,
    priceMin,
    priceMax,
    searchLat,
    searchLng
  } = req.body;

  // try {
  //   const books = await Book.find().populate('owner', [
  //     'firstname',
  //     'lastname',
  //     'email',
  //     'avatarid',
  //     'defaultlatitude',
  //     'defaultlongitude',
  //     'bio'
  //   ]);

  //   const collections = await Collection.find().populate('owner', [
  //     'firstname',
  //     'lastname',
  //     'email',
  //     'avatarid',
  //     'defaultlatitude',
  //     'defaultlongitude',
  //     'bio'
  //   ]);

  //   // TODO: FILTER BOOKS AND COLLECTION BASED ON RECIEVED SEARCH QUERIES

  //   // merge books and collections
  //   const allItems = [...books, ...collections];

  //   if (latitude && longitude) {
  //     // calculate the distance of the item from the user and add it as a distance prop into the item itself
  //     for (let i = 0; i < allItems.length; i++) {
  //       const itemDistance = distance(
  //         latitude,
  //         longitude,
  //         allItems[i].latitude,
  //         allItems[i].longitude
  //       );
  //       allItems[i].distance = itemDistance;
  //     }

  //     // arrange the array from the closest to the farest
  //     allItems.sort((a, b) => (a.distance > b.distance ? 1 : -1));
  //   }

  //   res.json({ items: allItems });
  // } catch (err) {
  //   console.error(err.message);
  //   res.status(500).json({ errors: [{ msg: err.message }] });
  // }
});

module.exports = router;
