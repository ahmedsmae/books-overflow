const express = require('express');
const router = express.Router();

const Avatar = require('../../database/models/avatar');

/**
 * @method - GET
 * @url - 'api/avatars/:avatarid'
 * @data - No data
 * @action - serving user avatar
 * @access - public
 */
router.get('/:avatarid', async (req, res) => {
  try {
    const avatar = await Avatar.findById(req.params.avatarid);

    if (!avatar) {
      throw new Error('No avatar available');
    }

    res.set('Content-Type', 'image/jpg');
    res.send(avatar.image);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
