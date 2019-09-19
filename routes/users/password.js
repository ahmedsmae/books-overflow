const express = require('express');
const router = express.Router();
const auth = require('../../utils/auth');
const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const passwordGenerator = require('generate-password');

const User = require('../../database/models/user');

/**
 * @method - POST
 * @url - 'api/users/forgetpassword'
 * @data - {email}
 * @action - check for email existance, generate new password, set it to this user and mail it to his email and delete all user tokens
 * @access - public
 */
router.post(
  '/forgetpassword',
  [
    check('email', 'Email is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;
    console.log(email);

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'No user with this email' }] });
      }

      // generate new password
      const newPassword = passwordGenerator.generate({
        length: 10,
        numbers: true,
        uppercase: true
      });
      console.log(newPassword);

      //! mail the new password to the email
      //? Don't forget to "allow less secure apps" to send email from your yahoo or gmail from the mail settings
      let transporter = nodemailer.createTransport({
        host: process.env.MAILING_ADDRESS_HOST,
        port: 465,
        service: process.env.MAILING_ADDRESS_SERVICE,
        secure: false,
        auth: {
          user: process.env.MAILING_ADDRESS,
          pass: process.env.MAILING_ADDRESS_PASSWORD
        }
      });

      let info = await transporter.sendMail({
        from: `"${process.env.APP_NAME}" <${process.env.MAILING_ADDRESS}>`,
        to: email,
        subject: `Your new ${process.env.APP_NAME} password`,
        text: `Your new password for ${email} is ${newPassword}`
        // html: '<b>New Password</b>' // html body
      });

      // console.log(info);

      // set password to user
      user.password = newPassword;

      // clear the user tokens
      user.tokens = [];
      await user.save();

      res.json({ msg: `Password sent successfully to ${email}` });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  }
);

/**
 * @method - POST
 * @url - 'api/users/changepassword'
 * @data - {oldPassword, newPassword}
 * @action - get the user, change his password with the new one and delete all his tokens
 * @access - private
 */
router.post(
  '/changepassword',
  [
    auth,
    [
      check('oldPassword', 'Old password is required')
        .not()
        .isEmpty(),
      check('newPassword', 'New password is required')
        .not()
        .isEmpty(),
      check(
        'newPassword',
        'Please enter a new password with 7 or more characters'
      ).isLength({ min: 7 }),
      check('newPassword', 'New password cannot contains the word "password"')
        .isLowercase()
        .not()
        .contains('password')
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { oldPassword, newPassword } = req.body;

    try {
      const user = await User.findByCredentials(req.user.email, oldPassword);

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      // set password to user
      user.password = newPassword;

      // clear the user tokens
      user.tokens = [];
      await user.save();

      const token = await user.generateAuthToken();

      res.json({ user, token });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  }
);

module.exports = router;
