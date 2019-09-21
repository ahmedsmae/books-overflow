const express = require('express');
const router = express.Router();
const auth = require('../../utils/auth');

const User = require('../../database/models/user');
const Notification = require('../../database/models/notification');

/**
 * @method - GET
 * @url - 'api/notifications/mynotifications'
 * @data - token header
 * @action - get all user notifications
 * @access - private
 */
router.get('/mynotifications', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'User does not exist' }] });
    }

    const userNotifications = user.notifications.map(
      ({ notificationid, seen }) => ({ notificationid, seen })
    );

    let i;
    for (i = 0; i < userNotifications.length; i++) {
      const note = await Notification.findById(
        userNotifications[i].notificationid
      );

      // ! LOOPING IS NOT PROPER
      if (note) {
        userNotifications[i].note = note;
      } else {
        userNotifications.splice(i, 1);
      }
    }
    // console.log(userNotifications);

    res.json({ notifications: userNotifications });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
