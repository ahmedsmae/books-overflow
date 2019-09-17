const mongoose = require('mongoose');

const BookImage = require('./book-image');

const bookSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    status: {
      type: String,
      default: 'Available',
      trim: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: String,
      required: true,
      trim: true
    },
    imageids: {
      type: [String],
      trim: true
    },
    publishdate: {
      type: Date
    },
    category: {
      type: String,
      trim: true
    },
    language: {
      type: String,
      trim: true
    },
    summary: {
      type: String,
      trim: true
    },
    condition: {
      type: String,
      trim: true
    },
    price: {
      type: Number
    },
    currency: {
      type: String
    },
    latitude: {
      type: Number
    },
    longitude: {
      type: Number
    },
    keywords: {
      type: String
    }
  },
  { timestamps: true }
);

// remove book images before deleting themselves
bookSchema.pre('remove', async function(next) {
  const book = this;

  const bookImageIds = book.imageids;

  await BookImage.remove({ _id: { $in: bookImageIds } });

  next();
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
