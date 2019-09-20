import React from 'react';
import { connect } from 'react-redux';

import {
  removeBlockedUserStart,
  getBlockedUsersStart
} from '../../redux/current-user/current-user.actions';

import UserImage from '../user-image/user-image.component';
import CustomButton from '../custom-button/custom-button.component';

import './blocked-user-card.styles.scss';

const BlockedUserCard = ({
  user: { _id, avatarid, firstname, lastname, email, reason },
  removeBlockedUserStart,
  getBlockedUsersStart
}) => {
  return (
    <div className='card'>
      <div className='card-body'>
        <div className='row'>
          <div className='col-4 text-center'>
            <UserImage source={`/api/avatars/${avatarid}`} medium />
            <p className='lead'>{`${firstname} ${lastname}`}</p>
            <CustomButton
              small
              dark
              outline
              onClick={() => {
                removeBlockedUserStart(_id);
                getBlockedUsersStart();
              }}
            >
              Unblock User
            </CustomButton>
          </div>

          <div className='col'>
            <p className='lead'>{email}</p>
            <p className='lead'>{reason}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  removeBlockedUserStart: userid => dispatch(removeBlockedUserStart(userid)),
  getBlockedUsersStart: () => dispatch(getBlockedUsersStart())
});

export default connect(
  null,
  mapDispatchToProps
)(BlockedUserCard);
