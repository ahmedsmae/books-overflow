const express = require('express');
const router = express.Router();
const sharp = require('sharp');
const auth = require('../../utils/auth');
const { check, validationResult } = require('express-validator');

const upload = require('../../utils/upload');

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
    upload.array('images'),
    [
      check('title', 'Book title is required')
        .not()
        .isEmpty(),
      check('author', 'Book author is required')
        .not()
        .isEmpty(),
      // don't check for imageids as it is not present with new books
      check('category', 'Book category is required')
        .not()
        .isEmpty(),
      check('language', 'Book language is required')
        .not()
        .isEmpty(),
      check('condition', 'Book condition is required')
        .not()
        .isEmpty(),
      check('price', 'Book price is required')
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
      const imageFiles = req.files;
      let book;

      if (bookid) {
        // book already exists
        book = await Book.findById(bookid);

        const originalImageIds = book.imageids;

        if (!originalImageIds.length) {
          // no images saved previously
          book.imageids = await saveNewImages(imageFiles);
        } else {
          // Book exists and also images in the array

          // find the missing ids
          const missingImageIds = [];

          for (const originalImageId of originalImageIds) {
            if (!imageids.includes(originalImageId)) {
              missingImageIds.push(originalImageId);
            }
          }

          // remove the missing images totaly from the BookImages collection
          if (missingImageIds.length) {
            for (const id of missingImageIds) {
              await BookImage.remove({ _id: id });
            }
          }

          book.imageids = [...imageids, ...(await saveNewImages(imageFiles))];
        }

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
        if (keywords)
          book.keywords = keywords.split(',').map(word => word.trim());
      } else {
        // new book
        const bookData = {};
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
        if (keywords)
          bookData.keywords = keywords.split(',').map(word => word.trim());

        bookData.imageids = [...(await saveNewImages(imageFiles))];

        bookData.owner = req.user.id;

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

// Helper function
const saveNewImages = async imageFilesArray => {
  const newImageIds = [];

  if (imageFilesArray && imageFilesArray.length) {
    for (const file of imageFilesArray) {
      const buffer = await sharp(file.buffer)
        .resize({ width: 500, height: 500 })
        .png()
        .toBuffer();

      if (buffer) {
        const bookImage = new BookImage({ image: buffer });
        newImageIds.push(bookImage._id);
        await bookImage.save();
      }
    }
  }

  return newImageIds;
};

module.exports = router;
