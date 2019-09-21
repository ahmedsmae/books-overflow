const express = require('express');
const router = express.Router();

const auth = require('../../utils/auth');
const Collection = require('../../database/models/collection');

/**
 * @method - DELETE
 * @url - 'api/collections/:collectionid'
 * @data - token header
 * @action - delete a collection
 * @access - private
 */
router.delete('/:collectionid', auth, async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.collectionid);

    if (!collection) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Collection does not exist' }] });
    }

    if (collection.owner != req.user._id) {
      return res.status(400).json({
        errors: [{ msg: "You can not delete someone else's collection" }]
      });
    }

    await collection.remove();

    res.json({ msg: 'Collection deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
