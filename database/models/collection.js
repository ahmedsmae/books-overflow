const mongoose = require('mongoose');

const CollectionImage = require('./collection-image');

const collectionSchema = new mongoose.Schema(
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
    numberofbooks: {
      type: Number,
      required: true,
      trim: true
    },
    imageids: {
      type: [String],
      trim: true
    },
    books: [
      {
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
        condition: {
          type: String,
          required: true,
          trim: true
        }
      }
    ],
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

// remove collection images before deleting themselves
collectionSchema.pre('remove', async function(next) {
  const collection = this;

  const collectionImageIds = collection.imageids;

  await CollectionImage.remove({ _id: { $in: collectionImageIds } });

  next();
});

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;
