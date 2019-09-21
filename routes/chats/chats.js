const express = require('express');
const router = express.Router();

const auth = require('../../utils/auth');
const Chat = require('../../database/models/chat');

/**
 * @method - GET
 * @url - '/api/chats/unseenmessages'
 * @data - token header
 * @action - get user unseen messages count
 * @access - private
 */
router.get('/unseenmessages', auth, async (req, res) => {
  try {
    const userChats = await Chat.find({ owner: req.user.id });

    if (!userChats.length) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'No chats for this user' }] });
    }

    let count = 0;

    let i;
    for (i = 0; i < userChats.length; i++) {
      const chatMsgs = userChats[i].messages;

      let j;
      for (j = 0; j < chatMsgs.length; j++) {
        const msg = chatMsgs[j];

        if (msg.owner != req.user.id && !msg.seen) {
          // not my message > you can count it
          count += 1;
        }
      }
    }

    res.json({ count });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - GET
 * @url - '/api/chats/basicchats'
 * @data - token header
 * @action - get user basic chats
 * @access - private
 */
router.get('/basicchats', auth, async (req, res) => {
  try {
    const userChats = await Chat.find({ owner: req.user._id }).populate(
      'opponent',
      [
        'firstname',
        'lastname',
        'email',
        'avatarid',
        'defaultlatitude',
        'defaultlongitude',
        'bio'
      ]
    );

    if (!userChats.length) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'No chats for this user' }] });
    }

    const chats = userChats.map(chat => chat.getBasicVersion());

    res.json({ chats });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - GET
 * @url - '/api/chats/:opponentid'
 * @data - token header
 * @action - get specific chat
 * @access - private
 */
router.get('/getchat/:opponentid', auth, async (req, res) => {
  const user = req.user;
  const params = req.params;

  try {
    let chat;

    chat = await Chat.findOne({
      owner: user._id,
      opponent: params.opponentid
    }).populate('opponent', [
      'firstname',
      'lastname',
      'email',
      'avatarid',
      'defaultlatitude',
      'defaultlongitude',
      'bio'
    ]);

    if (!chat) {
      chat = new Chat({
        owner: user._id,
        opponent: params.opponentid,
        messages: []
      });
      await chat.save();

      // to get the chat with opponent info
      chat = await Chat.findOne({
        owner: user._id,
        opponent: params.opponentid
      }).populate('opponent', [
        'firstname',
        'lastname',
        'email',
        'avatarid',
        'defaultlatitude',
        'defaultlongitude',
        'bio'
      ]);

      // create another version for the opponent
      const opponentChat = new Chat({
        owner: params.opponentid,
        opponent: user._id,
        messages: []
      });
      await opponentChat.save();
    }

    res.json({ chat });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
