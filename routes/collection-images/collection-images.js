const express = require('express');
const router = express.Router();

const CollectionImage = require('../../database/models/collection-image');

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

module.exports = router;
