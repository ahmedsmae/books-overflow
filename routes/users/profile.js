const express = require('express');
const router = express.Router();
const sharp = require('sharp');
const { check, validationResult } = require('express-validator');

const auth = require('../../utils/auth');
const upload = require('../../utils/upload');

const User = require('../../database/models/user');
const Avatar = require('../../database/models/avatar');

/**
 * @method - POST
 * @url - 'api/users/profile'
 * @data - {firstname, lastname, avatar, contactnumber, defaultlatitude, defaultlongitude, defaultcurrency, bio}
 * @action - add a user profile info - make sure to save avatar binary in his own collection
 * @access - private
 */
router.post(
  '/profile',
  [
    auth,
    upload.single('avatar'),
    [
      (check('firstname', 'First Name is required')
        .not()
        .isEmpty(),
      check('lastname', 'Last Name is required')
        .not()
        .isEmpty())
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      firstname,
      lastname,
      contactnumber,
      defaultlatitude,
      defaultlongitude,
      defaultcurrency,
      bio
    } = req.body;

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

      if (buffer) {
        let avatar;

        if (user.avatarid) {
          avatar = await Avatar.findById(user.avatarid);
          avatar.image = buffer;
        } else {
          avatar = new Avatar({ image: buffer });
          user.avatarid = avatar._id;
        }

        await avatar.save();
      }

      if (firstname) user.firstname = firstname;
      if (lastname) user.lastname = lastname;
      if (contactnumber) user.contactnumber = contactnumber;
      if (defaultlatitude) user.defaultlatitude = defaultlatitude;
      if (defaultlatitude) user.defaultlatitude = defaultlatitude;
      if (defaultlongitude) user.defaultlongitude = defaultlongitude;
      if (bio) user.bio = bio;

      await user.save();

      res.json({ user });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  }
);

/**
 * @method - POST
 * @url - 'api/users/profile/blockedusers'
 * @data - {userid, reason}
 * @action - add a user to blockedusers list
 * @access - private
 */
router.post(
  '/profile/blockedusers',
  [
    auth,
    [
      check('userid', 'User id is required')
        .not()
        .isEmpty(),
      check('reason', 'Reason for blocking is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userid, reason } = req.body;

    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User does not exists' }] });
      }

      user.blockedusers.push({ userid, reason });

      await user.save();

      res.json({ user });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ errors: [{ msg: err.message }] });
    }
  }
);

/**
 * @method - DELETE
 * @url - 'api/users/profile/blockedusers'
 * @data - {userid}
 * @action - remove a user from blockedusers list
 * @access - private
 */
router.delete(
  '/profile/blockedusers',
  [
    auth,
    [
      check('userid', 'User id is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userid } = req.body;
    console.log(userid);

    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User does not exists' }] });
      }

      user.blockedusers = user.blockedusers.filter(
        blockedUser => blockedUser.userid != userid
      );

      await user.save();

      res.json({ user });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ errors: [{ msg: err.message }] });
    }
  }
);

/**
 * @method - POST
 * @url - 'api/users/profile/favourites'
 * @data - {kind, favouriteitemid}
 * @action - add a favourite book or collection to favourites list
 * @access - private
 */
router.post(
  '/profile/favourites',
  [
    auth,
    [
      check('favouriteitemid', 'Favourite item id is required')
        .not()
        .isEmpty(),
      check('kind', 'Book or Collection kind is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { favouriteitemid, kind } = req.body;

    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User does not exists' }] });
      }

      user.favourites.push({ favouriteitemid, kind });

      await user.save();

      res.json({ user });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ errors: [{ msg: err.message }] });
    }
  }
);

/**
 * @method - DELETE
 * @url - 'api/users/profile/favourites'
 * @data - {favouriteitemid}
 * @action - remove a favourite book or collection from favourites list
 * @access - private
 */
router.delete(
  '/profile/favourites',
  [
    auth,
    [
      check('favouriteitemid', 'Favourite item id is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { favouriteitemid } = req.body;

    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User does not exists' }] });
      }

      user.favourites = user.favourites.filter(
        fav => fav.favouriteitemid !== favouriteitemid
      );

      await user.save();

      res.json({ user });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ errors: [{ msg: err.message }] });
    }
  }
);

module.exports = router;
