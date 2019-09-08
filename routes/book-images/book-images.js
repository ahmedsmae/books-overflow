const express = require('express');
const router = express.Router();

const BookImage = require('../../database/models/book-image');

/**
 * @method - GET
 * @url - 'api/bookimages/:imageid'
 * @data - No data
 * @action - serving book image
 * @access - public
 */
router.get('/:imageid', async (req, res) => {
  try {
    const bookImage = await BookImage.findById(req.params.imageid);

    if (!bookImage) {
      throw new Error('No image available');
    }

    res.set('Content-Type', 'image/jpg');
    res.send(bookImage.image);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
