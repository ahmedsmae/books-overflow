const express = require('express');
const router = express.Router();

const auth = require('../../utils/auth');
const Book = require('../../database/models/book');

/**
 * @method - GET
 * @url - 'api/books/mybooks'
 * @data - token header
 * @action - get all user books
 * @access - private
 */
router.get('/mybooks', auth, async (req, res) => {
  try {
    const books = await Book.find({ owner: req.user._id });

    res.json({ books });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - GET
 * @url - 'api/books/allbooks'
 * @data - No data
 * @action - get all books and some users info
 * @access - public
 */
router.get('/allbooks', async (req, res) => {
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

    res.json({ books });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
