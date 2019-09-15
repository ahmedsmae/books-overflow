const express = require('express');
const router = express.Router();

const Book = require('../../database/models/book');
const Collection = require('../../database/models/collection');

/**
 * @method - GET
 * @url - 'api/public/all'
 * @data - no data
 * @action - get all books and collections + public owner info
 * @access - public
 */
router.get('/all', async (req, res) => {
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

    res.json({ books, collections });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
