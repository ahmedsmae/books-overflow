import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { PATHS } from '../../assets/list.types';

import { getChatStart } from '../../redux/chats/chats.actions';

import UserImage from '../user-image/user-image.component';

import './chat-card.styles.scss';

const ChatCard = ({
  chat: {
    opponent: { _id, firstname, lastname, avatarid, email },
    lastmessage,
    unseencount
  },
  getChatStart
}) => {
  const handleClick = () => {
    getChatStart(_id);
  };

  return (
    <Link to={PATHS.CURRENT_CHAT_PATH} className='card' onClick={handleClick}>
      <div className='card-body'>
        <div className='row'>
          <div className='col-4 text-center'>
            <UserImage source={`/api/avatars/${avatarid}`} medium />
          </div>
          <div className='col'>
            <p className='lead d-block'>{`${firstname} ${lastname}`}</p>
            <p className='lead d-block'>{email}</p>
            <p className='lead d-block'>{lastmessage}</p>
            {unseencount > 0 && (
              <small className='text-danger'>
                unseen messages: {unseencount}
              </small>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

const mapDispatchToProps = dispatch => ({
  getChatStart: opponentid => dispatch(getChatStart(opponentid))
});

export default connect(
  null,
  mapDispatchToProps
)(ChatCard);
