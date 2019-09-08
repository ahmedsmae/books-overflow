const mongoose = require('mongoose');

const collectionImageSchema = new mongoose.Schema(
  {
    image: {
      type: Buffer
    }
  },
  { timestamps: true }
);

const CollectionImage = mongoose.model(
  'CollectionImage',
  collectionImageSchema
);

module.exports = CollectionImage;
