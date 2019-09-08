const express = require('express');
const router = express.Router();
const auth = require('../../utils/auth');

const Book = require('../../database/models/book');
const User = require('../../database/models/user');

/**
 * @method - GET
 * @url - 'api/books/mybooks'
 * @data - token header
 * @action - get all user books
 * @access - private
 */
router.get('/mybooks', auth, async (req, res) => {
  try {
    const books = await Book.find({ owner: req.user.id });

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

/**
 * @method - GET
 * @url - 'api/books/allbooks/:userid'
 * @data - No data
 * @action - get user and all his books by his id
 * @access - public
 */
router.get('/allbooks/:userid', async (req, res) => {
  try {
    const books = await Book.find({ owner: req.params.userid });
    const user = await User.findById(req.params.userid);

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User does not exists' }] });
    }

    res.json({ user: user.getPublicVersion(user), books });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - GET
 * @url - 'api/books/book/:bookid'
 * @data - No data
 * @action - get all book data by its id
 * @access - public
 */
router.get('/book/:bookid', async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookid).populate('owner', [
      'firstname',
      'lastname',
      'email',
      'avatarid',
      'defaultlatitude',
      'defaultlongitude',
      'bio'
    ]);

    if (!book) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Book does not exists' }] });
    }

    res.json({ book });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
