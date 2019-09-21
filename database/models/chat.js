const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    opponent: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    messages: [
      {
        ownerid: {
          type: String,
          required: true,
          trim: true
        },
        text: {
          type: String,
          required: true
        },
        seen: {
          type: Boolean,
          default: false
        },
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  { timestamps: true }
);

// this will get a basic version of the chat > without messages
chatSchema.methods.getBasicVersion = function() {
  const chat = this;
  const chatObject = chat.toObject();

  const messages = chatObject.messages;

  let unseencount = 0;
  let i;
  for (i = 0; i < messages.length; i++) {
    if (messages[i].ownerid !== chatObject.owner && !messages[i].seen) {
      unseencount += 1;
    }
  }
  chatObject.unseencount = unseencount;

  if (messages.length) {
    const lastMessage = messages[messages.length - 1].text;
    chatObject.lastmessage = lastMessage;
  } else {
    chatObject.lastMessage = '';
  }

  delete chatObject.messages;

  return chatObject;
};

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
