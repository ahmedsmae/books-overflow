const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../utils/auth');
const { sortArrayByDistance } = require('../utils/sort-array-by-destance');

const User = require('../../database/models/user');
const Book = require('../../database/models/book');
const Collection = require('../../database/models/collection');

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
    // upload.single('avatar'),
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
      const user = await User.findById(req.user._id);

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User does not exists' }] });
      }

      if (firstname) user.firstname = firstname;
      if (lastname) user.lastname = lastname;
      if (contactnumber) user.contactnumber = contactnumber;
      if (defaultlatitude) user.defaultlatitude = defaultlatitude;
      if (defaultlongitude) user.defaultlongitude = defaultlongitude;
      if (defaultcurrency) user.defaultcurrency = defaultcurrency;
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
      const user = await User.findById(req.user._id);

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
 * @url - 'api/users/profile/blockedusers/:blockeduserid'
 * @data - token header
 * @action - remove a user from blockedusers list
 * @access - private
 */
router.delete(
  '/profile/blockedusers/:blockeduserid',
  auth,
  async (req, res) => {
    try {
      const user = await User.findById(req.user._id);

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User does not exists' }] });
      }

      user.blockedusers = user.blockedusers.filter(
        blockedUser => blockedUser.userid != req.params.blockeduserid
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
 * @method - GET
 * @url - 'api/users/profile/blockedusers'
 * @data - token header
 * @action - get all blocked users
 * @access - private
 */
router.get('/profile/blockedusers', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User does not exists' }] });
    }

    const blockedUsers = [];
    let i;
    for (i = 0; i < user.blockedusers.length; i++) {
      let bUser = await User.findById(user.blockedusers[i].userid);

      if (bUser) {
        bUser = bUser.getPublicVersion();

        bUser.reason = user.blockedusers[i].reason;

        blockedUsers.push(bUser);
      }
    }

    res.json({ blockedUsers });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

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
      const user = await User.findById(req.user._id);

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
 * @url - 'api/users/profile/favourites/:favouriteitemid'
 * @data - token header
 * @action - remove a favourite book or collection from favourites list
 * @access - private
 */
router.delete(
  '/profile/favourites/:favouriteitemid',
  auth,
  async (req, res) => {
    try {
      const user = await User.findById(req.user._id);

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User does not exists' }] });
      }

      user.favourites = user.favourites.filter(
        fav => fav.favouriteitemid != req.params.favouriteitemid
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
 * @url - 'api/users/profile/getfavourites'
 * @data - { latitude, longitude }
 * @action - set notification to be seen: true
 * @access - private
 */
router.post('/profile/getfavourites', auth, async (req, res) => {
  const { latitude, longitude } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User does not exists' }] });
    }

    const userFavouriteIds = user.favourites.map(fav => fav.favouriteitemid);

    const books = await Book.find({ _id: { $in: userFavouriteIds } }).populate(
      'owner',
      [
        'firstname',
        'lastname',
        'email',
        'avatarid',
        'defaultlatitude',
        'defaultlongitude',
        'bio'
      ]
    );

    const collections = await Collection.find({
      _id: { $in: userFavouriteIds }
    }).populate('owner', [
      'firstname',
      'lastname',
      'email',
      'avatarid',
      'defaultlatitude',
      'defaultlongitude',
      'bio'
    ]);

    const allItems = [...books, ...collections];

    const favourites = sortArrayByDistance(latitude, longitude, allItems);

    res.json({ favourites });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - POST
 * @url - 'api/users/profile/updatenotificationseen/:notificationid'
 * @data - token header
 * @action - set notification to be seen: true
 * @access - private
 */
router.post(
  '/profile/updatenotificationseen/:notificationid',
  auth,
  async (req, res) => {
    try {
      const user = await User.findById(req.user._id);

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User does not exists' }] });
      }

      user.notifications = user.notifications.map(note => {
        if (note.notificationid === req.params.notificationid) {
          note.seen = true;
        }
        return note;
      });

      await user.save();

      res.json({ user });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ errors: [{ msg: err.message }] });
    }
  }
);

module.exports = router;
