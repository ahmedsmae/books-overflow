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
    // get all messages that the user will be opponent in
    const userChats = await Chat.find({
      owner: req.user._id
    });

    // const userChats = await Chat.find({
    //   $or: [{ owner: req.user.id }, { opponent: req.user.id }]
    // });

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

        if (msg.ownerid !== req.user._id && !msg.seen) {
          // not my message > you can count it
          // get only one chat copy
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
    let chat = await Chat.findOne({
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
    }

    // find if there is an opponent chat or not
    let opponentChat = await Chat.findOne({
      owner: params.opponentid,
      opponent: user._id
    });

    if (!opponentChat) {
      // create another version for the opponent
      opponentChat = new Chat({
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

/**
 * @method - DELETE
 * @url - '/api/chats/:chatid'
 * @data - token header
 * @action - remove chat copy
 * @access - private
 */
router.delete('/:chatid', auth, async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatid);

    if (!chat) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'chat does not exists' }] });
    }

    await chat.remove();

    res.json({ msg: 'Chat copy successfully removed' });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - POST
 * @url - '/api/chats/updateseen/:opponentid'
 * @data - token header
 * @action - get user basic chats
 * @access - private
 */
router.post('/updateseen/:opponentid', auth, async (req, res) => {
  try {
    const userChat = await Chat.findOne({
      owner: req.user._id,
      opponent: req.params.opponentid
    });

    if (!userChat) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User chat copy does not exists' }] });
    }

    const userChatObject = userChat.toObject();
    const userMessages = userChatObject.messages.map(
      ({ ownerid, seen, ...otherProps }) =>
        ownerid !== req.user._id && { ownerid, seen: true, ...otherProps }
    );

    userChat.messages = userMessages;
    await userChat.save();

    const opponentChat = await Chat.findOne({
      owner: req.params.opponentid,
      opponent: req.user._id
    });

    if (!opponentChat) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Opponent chat copy does not exists' }] });
    }

    const opponentChatObject = opponentChat.toObject();
    const opponentMessages = opponentChatObject.messages.map(
      ({ ownerid, seen, ...otherProps }) =>
        ownerid !== req.user._id && { ownerid, seen: true, ...otherProps }
    );

    opponentChat.messages = opponentMessages;
    await opponentChat.save();

    res.json({ msg: 'Update User and Opponent chat copies done' });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
