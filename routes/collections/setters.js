const express = require('express');
const router = express.Router();
const auth = require('../../utils/auth');
const { check, validationResult } = require('express-validator');

const Collection = require('../../database/models/collection');
const CollectionImage = require('../../database/models/collection-image');

/**
 * @method - POST
 * @url - 'api/collections'
 * @data - {collectionid, status, title, numberofbooks, imageids, books, category, language, summary, price, currency, latitude, longitude, keywords(comma separated)}
 * ! Make sure to remove the imageid from the imageids array if the user remove the image from the client and send the rest imageids only
 * @action - add edit a collection
 * @access - private
 */
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Collection title is required')
        .not()
        .isEmpty(),
      check('numberofbooks', 'Number of books is required')
        .not()
        .isEmpty(),
      check('books', 'Books array is required')
        .not()
        .isEmpty(),
      check('category', 'Collection category is required')
        .not()
        .isEmpty(),
      check('language', 'Collection language is required')
        .not()
        .isEmpty(),
      check('price', 'Collection price is required')
        .not()
        .isEmpty(),
      check('currency', 'Collection price currency is required')
        .not()
        .isEmpty(),
      check('latitude', 'Collection latitude is required')
        .not()
        .isEmpty(),
      check('longitude', 'Collection longitude is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      collectionid,
      status,
      title,
      numberofbooks,
      imageids,
      books,
      category,
      language,
      summary,
      price,
      currency,
      latitude,
      longitude,
      keywords
    } = req.body;

    try {
      let collection;

      if (collectionid) {
        // book already exists
        colection = await Collection.findById(collectionid);

        if (!collection) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Collection does not exists' }] });
        }

        const oldImageIds = collection.imageids;

        // remove missing ids
        for (const oldId of oldImageIds) {
          if (!imageids.includes(oldId)) {
            await CollectionImage.remove({ _id: oldId });
          }
        }

        collection.imageids = imageids;
        if (status) collection.status = status;
        if (title) collection.title = title;
        if (numberofbooks) collection.numberofbooks = numberofbooks;
        if (books) collection.books = books;
        if (category) collection.category = category;
        if (language) collection.language = language;
        if (summary) collection.summary = summary;
        if (price) collection.price = price;
        if (currency) collection.currency = currency;
        if (latitude) collection.latitude = latitude;
        if (longitude) collection.longitude = longitude;
        if (keywords) collection.keywords = keywords;
      } else {
        // new book
        const collectionData = {};

        if (imageids) collectionData.imageids = imageids;
        if (status) collectionData.status = status;
        if (title) collectionData.title = title;
        if (numberofbooks) collectionData.numberofbooks = numberofbooks;
        if (books) collectionData.books = books;
        if (category) collectionData.category = category;
        if (language) collectionData.language = language;
        if (summary) collectionData.summary = summary;
        if (price) collectionData.price = price;
        if (currency) collectionData.currency = currency;
        if (latitude) collectionData.latitude = latitude;
        if (longitude) collectionData.longitude = longitude;
        if (keywords) collectionData.keywords = keywords;
        collectionData.owner = req.user.id;

        collection = new Collection(collectionData);
      }

      await collection.save();
      res.json({ collection });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  }
);

module.exports = router;
