const mongoose = require('mongoose');

const noticicationSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    jsx: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Notification = mongoose.model('Notification', noticicationSchema);

module.exports = Notification;
