const mongoose = require('mongoose');

const bookImageSchema = new mongoose.Schema(
  {
    image: {
      type: Buffer
    }
  },
  { timestamps: true }
);

const BookImage = mongoose.model('BookImage', bookImageSchema);

module.exports = BookImage;
