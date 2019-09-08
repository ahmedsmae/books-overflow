const mongoose = require('mongoose');

const avatarSchema = new mongoose.Schema(
  {
    image: {
      type: Buffer
    }
  },
  { timestamps: true }
);

const Avatar = mongoose.model('Avatar', avatarSchema);

module.exports = Avatar;
