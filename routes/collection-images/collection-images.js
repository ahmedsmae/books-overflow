const express = require('express');
const router = express.Router();
const sharp = require('sharp');

const upload = require('../../utils/upload');
const auth = require('../../utils/auth');

const CollectionImage = require('../../database/models/collection-image');
const Collection = require('../../database/models/collection');

/**
 * @method - GET
 * @url - 'api/collectionimages/:imageid'
 * @data - No data
 * @action - serving collection image
 * @access - public
 */
router.get('/:imageid', async (req, res) => {
  try {
    const collectionImage = await CollectionImage.findById(req.params.imageid);

    if (!collectionImage) {
      throw new Error('No image available');
    }

    res.set('Content-Type', 'image/jpg');
    res.send(collectionImage.image);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - POST
 * @url - 'api/collectionimages/setimage/:collectionid'
 * @data - {file}
 * @action - add a new image
 * @access - private
 */
router.post(
  '/setimage/:collectionid',
  auth,
  upload.single('image'),
  async (req, res) => {
    try {
      const collection = await Collection.findById(req.params.collectionid);

      if (!collection) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Collection does not exists' }] });
      }

      const imageIds = collection.imageids;

      const buffer = await sharp(req.file.buffer)
        // .resize({ width: 500, height: 500 })
        .png()
        .toBuffer();

      const newImage = new CollectionImage({ image: buffer });
      await newImage.save();

      imageIds.push(newImage._id);

      await collection.save();

      res.json({ msg: 'Image saved successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  }
);

module.exports = router;
