const express = require('express');
const router = express.Router();
const auth = require('../../utils/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../database/models/user');
const Book = require('../../database/models/book');
const Collection = require('../../database/models/collection');

/**
 * @method - POST
 * @url - 'api/users/signup'
 * @data - {firstname, lastname, email, password}
 * @action - signup a new user and add welcome notification id to his notifications list with seen: false
 * @access - public
 */
router.post(
  '/signup',
  [
    check('firstname', 'First Name is required')
      .not()
      .isEmpty(),
    check('lastname', 'Last Name is required')
      .not()
      .isEmpty(),
    check('email', 'Email is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required')
      .not()
      .isEmpty(),
    check(
      'password',
      'Please enter a password with 7 or more characters'
    ).isLength({ min: 7 }),
    check('password', 'password cannot contains the word "password"')
      .isLowercase()
      .not()
      .contains('password')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Email already exists' }] });
      }

      user = new User({ firstname, lastname, email, password });

      // hashing the password will be done automatically in the User model before save()
      await user.save();

      const token = await user.generateAuthToken();

      res.json({ user, token });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  }
);

/**
 * @method - POST
 * @url - 'api/users/signin'
 * @data - {email, password}
 * @action - signin an existing user
 * @access - public
 */
router.post(
  '/signin',
  [
    check('email', 'Email is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is requires')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findByCredentials(email, password);

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User does not exists' }] });
      }

      const token = await user.generateAuthToken();

      res.json({ user, token });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  }
);

/**
 * @method - GET
 * @url - 'api/users/auth'
 * @data - token header
 * @action - get current user data
 * @access - private
 */
router.get('/auth', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User does not exists' }] });
    }

    res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - GET
 * @url - 'api/users/getuser/:userid'
 * @data - NO DATA
 * @action - get any user data by his id
 * @access - public
 */
router.get('/getuser/:userid', async (req, res) => {
  try {
    let user = await User.findById(req.params.userid);

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User does not exists' }] });
    }

    // this will remove the private data of the user
    user = user.getPublicVersion();

    const books = await Book.find({ owner: req.params.userid }).populate(
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
      owner: req.params.userid
    }).populate('owner', [
      'firstname',
      'lastname',
      'email',
      'avatarid',
      'defaultlatitude',
      'defaultlongitude',
      'bio'
    ]);

    const itemsArray = [];
    for (let i = 0; i < books.length; i++) {
      const bookObject = books[i].toObject();
      itemsArray.push(bookObject);
    }
    for (let i = 0; i < collections.length; i++) {
      const collectionObject = collections[i].toObject();
      itemsArray.push(collectionObject);
    }

    // sort array by date
    itemsArray.sort(function(a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    res.json({ user, items: itemsArray });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
