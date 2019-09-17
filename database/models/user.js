const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Book = require('./book');
const Collection = require('./collection');

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true
    },
    lastname: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7
    },
    avatarid: {
      type: String
    },
    contactnumber: {
      type: String
    },
    defaultlatitude: {
      type: Number
    },
    defaultlongitude: {
      type: Number
    },
    defaultcurrency: {
      type: String
    },
    bio: {
      type: String,
      trim: true
    },
    blockedusers: [
      {
        userid: {
          type: String,
          required: true
        },
        reason: {
          type: String,
          required: true
        }
      }
    ],
    notifications: [
      {
        notificationid: {
          type: String,
          required: true
        },
        seen: {
          type: Boolean,
          default: false
        }
      }
    ],
    favourites: [
      {
        favouriteitemid: {
          type: String,
          required: true
        },
        kind: {
          type: String,
          required: true
        }
      }
    ],
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  { timestamps: true }
);

// this method to return only the data we need to send back to the frontend
userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

// this will get a public version of the userObject
userSchema.methods.getPublicVersion = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.contactnumber;
  delete userObject.defaultcurrency;
  delete userObject.blockedusers;
  delete userObject.notifications;
  delete userObject.favourites;
  delete userObject.tokens;
  delete userObject.updatedAt;

  return userObject;
};

// this method will live in the instances ONLY =  not the User model
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const payload = { _id: user._id.toString() };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7 days'
  });

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

// create our own methods for the User model
// this method lives in the User model itself = Not in it's instances
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  // user the same message fo all credentials errors - don't be too specific
  const msg = 'Invalid Credentials';

  if (!user) {
    throw new Error(msg);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error(msg);
  }

  return user;
};

// This to hash the password before save() user
userSchema.pre('save', async function(next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// remove user books and collections before deleting themselves
userSchema.pre('remove', async function(next) {
  const user = this;

  await Book.deleteMany({ owner: user._id });
  await Collection.deleteMany({ owner: user._id });

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
