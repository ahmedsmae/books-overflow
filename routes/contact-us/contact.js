const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { check, validationResult } = require('express-validator');

/**
 * @method - POST
 * @url - 'api/contact/contactus'
 * @data - {email, subject, message}
 * @action - send a contact email
 * @access - public
 */
router.post(
  '/contactus',
  [
    check('email', 'Email is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('subject', 'Subject is required')
      .not()
      .isEmpty(),
    check('message', 'Message is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, subject, message } = req.body;

    try {
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
        from: `"${email}" <${process.env.MAILING_ADDRESS}>`,
        to: `"${process.env.ADMIN_NAME}" <${process.env.ADMIN_EMAIL}>`,
        subject: `${process.env.APP_NAME} contact mail - ${subject}`,
        text: message
      });

      res.json({ msg: `Mail successfully sent. Thank You...` });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  }
);

module.exports = router;
