const express = require('express');
const router = express.Router();
const sharp = require('sharp');

const auth = require('../../utils/auth');
const upload = require('../../utils/upload');
const BookImage = require('../../database/models/book-image');
const Book = require('../../database/models/book');

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

/**
 * @method - POST
 * @url - 'api/bookimages/setimage/:bookid'
 * @data - {file}
 * @action - add a new image
 * @access - private
 */
router.post(
  '/setimage/:bookid',
  auth,
  upload.single('image'),
  async (req, res) => {
    try {
      const book = await Book.findById(req.params.bookid);

      if (!book) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Book does not exists' }] });
      }

      const imageIds = book.imageids;

      const buffer = await sharp(req.file.buffer)
        // .resize({ width: 500, height: 500 })
        .png()
        .toBuffer();

      const newImage = new BookImage({ image: buffer });

      imageIds.push(newImage._id);
      book.imageids = imageIds;
      await book.save();

      // you don't have to wait until saving finished
      newImage.save();

      res.json({ msg: 'Image saved successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  }
);

module.exports = router;
