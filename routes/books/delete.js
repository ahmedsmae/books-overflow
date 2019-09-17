const express = require('express');
const router = express.Router();

const auth = require('../../utils/auth');
const Book = require('../../database/models/book');

/**
 * @method - DELETE
 * @url - 'api/books/:bookid'
 * @data - token header
 * @action - delete a book
 * @access - private
 */
router.delete('/:bookid', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookid);

    if (!book) {
      return res.status(400).json({ errors: [{ msg: 'Book does not exist' }] });
    }

    if (book.owner != req.user.id) {
      return res
        .status(400)
        .json({ errors: [{ msg: "You can not delete someone else's book" }] });
    }

    await book.remove();

    res.json({ msg: 'Book deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
