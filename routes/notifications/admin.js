const express = require('express');
const router = express.Router();
const auth = require('../../utils/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../database/models/user');
const Notification = require('../../database/models/notification');

/**
 * @method - POST
 * @url - 'api/notifications'
 * @data - {title, jsx}
 * @action - insert new notification
 * @access - private / admin only
 */
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Notification title is required')
        .not()
        .isEmpty(),
      check('jsx', 'JSX message is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, jsx } = req.body;

    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User does not exist' }] });
      }

      if (user.email !== process.env.ADMIN_EMAIL) {
        return res.status(400).json({
          errors: [{ msg: 'This request could be done throw admin only' }]
        });
      }

      const notification = new Notification({ owner: req.user.id, title, jsx });

      await notification.save();

      const allUsers = await User.find({});

      for (const user of allUsers) {
        const newNotificationsArray = [
          ...user.notifications,
          {
            notificationid: notification._id,
            seen: false
          }
        ];
        user.notifications = newNotificationsArray;
        // you don't have to wait until saving finished
        user.save();
      }

      res.json({ notification });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  }
);

/**
 * @method - GET
 * @url - 'api/notifications'
 * @data - token header
 * @action - get all notifications
 * @access - private / admin only
 */
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'User does not exist' }] });
    }

    if (user.email !== process.env.ADMIN_EMAIL) {
      return res.status(400).json({
        errors: [{ msg: 'This request could be done throw admin only' }]
      });
    }

    const notifications = await Notification.find({});

    res.json({ notifications });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - PATCH
 * @url - 'api/notifications/:notificationid'
 * @data - {title, jsx}
 * @action - update existing notification
 * @access - private / admin only
 */
router.patch(
  '/:notificationid',
  [
    auth,
    [
      check('title', 'Notification title is required')
        .not()
        .isEmpty(),
      check('jsx', 'JSX message is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, jsx } = req.body;

    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User does not exist' }] });
      }

      if (user.email !== process.env.ADMIN_EMAIL) {
        return res.status(400).json({
          errors: [{ msg: 'This request could be done throw admin only' }]
        });
      }

      const notification = await Notification.findById(
        req.params.notificationid
      );

      notification.title = title;
      notification.jsx = jsx;

      await notification.save();

      res.json({ notification });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  }
);

/**
 * @method - DELETE
 * @url - 'api/notifications/:notificationid'
 * @data - token header
 * @action - delete notification
 * @access - private / admin only
 */
router.delete('/:notificationid', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'User does not exist' }] });
    }

    if (user.email !== process.env.ADMIN_EMAIL) {
      return res.status(400).json({
        errors: [{ msg: 'This request could be done throw admin only' }]
      });
    }

    const notification = await Notification.findById(req.params.notificationid);
    await notification.remove();

    const allUsers = await User.find({});

    for (const user of allUsers) {
      user.notifications = user.notifications.filter(
        not => not.notificationid !== req.params.notificationid
      );
      // you don't have to wait until saving finished
      user.save();
    }

    res.json({ msg: 'Notification removed...' });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
