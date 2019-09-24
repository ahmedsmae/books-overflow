const express = require('express');
const router = express.Router();
const auth = require('../../utils/auth');
const { check, validationResult } = require('express-validator');

const Book = require('../../database/models/book');
const BookImage = require('../../database/models/book-image');

/**
 * @method - POST
 * @url - 'api/books'
 * @data - {bookid, status, title, author, imageids, publishdate, category, language, summary, condition, price, currency, latitude, longitude, keywords(comma separated)}
 * ! Make sure to remove the imageid from the imageids array if the user remove the image from the client and send the rest imageids only
 * @action - add edit a book
 * @access - private
 */
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Book title is required')
        .not()
        .isEmpty(),
      check('author', 'Book author is required')
        .not()
        .isEmpty(),
      check('category', 'Book category is required')
        .not()
        .isEmpty(),
      check('language', 'Book language is required')
        .not()
        .isEmpty(),
      check('condition', 'Book condition is required')
        .not()
        .isEmpty(),
      check('currency', 'Book price currency is required')
        .not()
        .isEmpty(),
      check('latitude', 'Book latitude is required')
        .not()
        .isEmpty(),
      check('longitude', 'Book longitude is required')
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
      bookid,
      status,
      title,
      author,
      imageids,
      publishdate,
      category,
      language,
      summary,
      condition,
      price,
      currency,
      latitude,
      longitude,
      keywords
    } = req.body;

    try {
      let book;

      if (bookid) {
        // book already exists
        book = await Book.findById(bookid);

        if (!book) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Book does not exists' }] });
        }

        const oldImageIds = book.imageids;

        // remove missing ids
        for (const oldId of oldImageIds) {
          if (!imageids.includes(oldId)) {
            await BookImage.remove({ _id: oldId });
          }
        }

        book.imageids = imageids;
        if (status) book.status = status;
        if (title) book.title = title;
        if (author) book.author = author;
        if (publishdate) book.publishdate = publishdate;
        if (category) book.category = category;
        if (language) book.language = language;
        if (summary) book.summary = summary;
        if (condition) book.condition = condition;
        if (price) book.price = price;
        if (currency) book.currency = currency;
        if (latitude) book.latitude = latitude;
        if (longitude) book.longitude = longitude;
        if (keywords) book.keywords = keywords;
      } else {
        // new book
        const bookData = {};

        if (imageids) bookData.imageids = imageids;
        if (status) bookData.status = status;
        if (title) bookData.title = title;
        if (author) bookData.author = author;
        if (publishdate) bookData.publishdate = publishdate;
        if (category) bookData.category = category;
        if (language) bookData.language = language;
        if (summary) bookData.summary = summary;
        if (condition) bookData.condition = condition;
        if (price) bookData.price = price;
        if (currency) bookData.currency = currency;
        if (latitude) bookData.latitude = latitude;
        if (longitude) bookData.longitude = longitude;
        if (keywords) bookData.keywords = keywords;
        bookData.owner = req.user._id;

        book = new Book(bookData);
      }

      await book.save();
      res.json({ book });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  }
);

module.exports = router;
