const express = require('express');
const router = express.Router();
const auth = require('../../utils/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../database/models/user');

/**
 * @method - POST
 * @url - 'api/users/signout'
 * @data - token header
 * @action - signout a user
 * @access - private
 */
router.post('/signout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.json({ msg: 'User logged out from current session' });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - DELETE
 * @url - 'api/users/deleteuser'
 * @data - {email, password}
 * @action - delete a user
 * @access - private
 */
router.delete(
  '/deleteuser',
  [
    auth,
    [
      check('email', 'Email is required')
        .not()
        .isEmpty(),
      check('password', 'Password is requires')
        .not()
        .isEmpty()
    ]
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
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // ! Retry this route again after finishing removing books and collections on remove in the user model

      await user.remove();
      res.json({ msg: 'User deleted' });
    } catch (err) {
      res.status(500).send({ msg: err.message });
    }
  }
);

module.exports = router;
