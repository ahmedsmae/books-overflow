import React from 'react';
import { Link } from 'react-router-dom';
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
            <UserImage
              small
              className='mt-2'
              source={`/api/avatars/${avatarid}`}
            />
          </div>

          <div className='col'>
            <div className='row'>
              <div className='col'>
                <p className='lead mb-0'>{`${firstname} ${lastname}`}</p>
              </div>
              <div className='col-2'>
                <Link className='col text-dark' to='#'>
                  <CustomButton
                    small
                    dark
                    outline
                    onClick={() => {
                      removeBlockedUserStart(_id);
                      getBlockedUsersStart();
                    }}
                  >
                    <i className='fas fa-lock-open' />
                  </CustomButton>
                </Link>
              </div>
            </div>
            <p className='lead mb-0'>{email}</p>
            <p className='lead mb-0'>{reason}</p>
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
