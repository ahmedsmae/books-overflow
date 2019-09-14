const express = require('express');
const router = express.Router();

const auth = require('../../utils/auth');
const Collection = require('../../database/models/collection');

/**
 * @method - GET
 * @url - 'api/collection/mycollections'
 * @data - token header
 * @action - get all user collections
 * @access - private
 */
router.get('/mycollections', auth, async (req, res) => {
  try {
    const collections = await Collection.find({ owner: req.user.id });

    res.json({ collections });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - GET
 * @url - 'api/collection/allcollections'
 * @data - No data
 * @action - get all collections and some owners info
 * @access - public
 */
router.get('/allcollections', async (req, res) => {
  try {
    const collections = await Collection.find().populate('owner', [
      'firstname',
      'lastname',
      'email',
      'avatarid',
      'defaultlatitude',
      'defaultlongitude',
      'bio'
    ]);

    res.json({ collections });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
