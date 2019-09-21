import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { PATHS } from '../../assets/list.types';

import {
  getChatStart,
  removeChatCopyStart
} from '../../redux/chats/chats.actions';

import UserImage from '../user-image/user-image.component';
import CustomButton from '../custom-button/custom-button.component';
import ConfirmDialog from '../confirm-dialog/confirm-dialog.component';

import './chat-card.styles.scss';

const ChatCard = ({ chat, getChatStart, removeChatCopyStart }) => {
  const [displayDialog, setDisplayDialog] = useState(false);

  const {
    opponent: { _id, firstname, lastname, avatarid, email },
    lastmessage,
    unseencount
  } = chat;

  const handleClick = () => {
    getChatStart(_id);
  };

  return (
    <div className='card'>
      <div className='card-body'>
        <div className='row'>
          <div className='col-4 text-center'>
            <UserImage source={`/api/avatars/${avatarid}`} medium />
            <CustomButton
              className='mt-4'
              outline
              dark
              small
              onClick={() => setDisplayDialog(true)}
            >
              Delete Chat
            </CustomButton>
            {displayDialog && (
              <ConfirmDialog
                title='Delete chat confirmation'
                message='This will delete your copy of chat only.
                Other user will still have his own copy.
                Are you sure?'
                confirmText='Delete'
                onChoose={response => {
                  response && removeChatCopyStart(chat._id);
                  setDisplayDialog(false);
                }}
              />
            )}
          </div>
          <Link
            to={PATHS.CURRENT_CHAT_PATH}
            className='col'
            onClick={handleClick}
          >
            <p className='lead d-block'>{`${firstname} ${lastname}`}</p>
            <p className='lead d-block'>{email}</p>
            <p className='lead d-block'>{lastmessage}</p>
            {unseencount > 0 && (
              <small className='text-danger'>
                unseen messages: {unseencount}
              </small>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  getChatStart: opponentid => dispatch(getChatStart(opponentid)),
  removeChatCopyStart: chatId => dispatch(removeChatCopyStart(chatId))
});

export default connect(
  null,
  mapDispatchToProps
)(ChatCard);
