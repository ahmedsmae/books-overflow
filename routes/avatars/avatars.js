const express = require('express');
const sharp = require('sharp');
const router = express.Router();

const auth = require('../../utils/auth');
const upload = require('../../utils/upload');

const User = require('../../database/models/user');
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

/**
 * @method - POST
 * @url - 'api/avatars/setavatar'
 * @data - {file}
 * @action - add a user profile info - make sure to save avatar binary in his own collection
 * @access - private
 */
router.post('/setavatar', auth, upload.single('avatar'), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User does not exists' }] });
    }

    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    let avatar;

    if (user.avatarid) {
      avatar = await Avatar.findById(user.avatarid);

      avatar.image = buffer;
    } else {
      avatar = new Avatar({ image: buffer });
      user.avatarid = avatar._id;
      await user.save();
    }

    await avatar.save();

    res.json({ msg: 'Avatar saved successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
