import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { PATHS } from '../../assets/list.types';

import {
  selectUser,
  selectNotifications
} from '../../redux/current-user/current-user.selectors';
import { selectSelectedUser } from '../../redux/selected-user/selected-user.selectors';

import UserImage from '../user-image/user-image.component';
import CustomButton from '../custom-button/custom-button.component';

import './user-card.styles.scss';

const UserCard = ({ myProfile, selectedUser, currentUser, notications }) => {
  let _id,
    avatarid,
    firstname,
    lastname,
    email,
    defaultlatitude,
    defaultlongitude,
    createdAt,
    bio;

  if (myProfile) {
    _id = currentUser._id;
    firstname = currentUser.firstname;
    lastname = currentUser.lastname;
    avatarid = currentUser.avatarid;
    email = currentUser.email;
    defaultlatitude = currentUser.defaultlatitude;
    defaultlongitude = currentUser.defaultlongitude;
    createdAt = currentUser.createdAt;
    bio = currentUser.bio;
  } else {
    _id = selectedUser._id;
    firstname = selectedUser.firstname;
    lastname = selectedUser.lastname;
    avatarid = selectedUser.avatarid;
    email = selectedUser.email;
    defaultlatitude = selectedUser.defaultlatitude;
    defaultlongitude = selectedUser.defaultlongitude;
    createdAt = selectedUser.createdAt;
    bio = selectedUser.bio;
  }

  return (
    <div className='card mt-4 mx-auto'>
      <div className='card-body'>
        <div className='row'>
          <div className='col-md-6 text-center'>
            <UserImage large source={avatarid && `/api/avatars/${avatarid}`} />
          </div>

          <div className='col-md-6'>
            <h1>{`${firstname} ${lastname}`}</h1>

            <h3>{email}</h3>

            {defaultlatitude && defaultlongitude && (
              <h3>{`${defaultlatitude} ${defaultlongitude}`}</h3>
            )}

            <p>
              <small>{`Join Date: ${createdAt}`}</small>
            </p>

            <p className='lead mt-4'>{bio && bio}</p>
          </div>
          <div className='mx-auto mt-4'>
            <Link
              to={
                myProfile
                  ? PATHS.MY_LIBRARY_PATH
                  : PATHS.LIBRARY_PATH_NO_ID + _id
              }
              className='mx-3'
            >
              <CustomButton primary>
                <i className='fas fa-book' />
                {myProfile ? ' My ' : ` ${firstname}'s `}
                Library
              </CustomButton>
            </Link>

            {myProfile && (
              <Fragment>
                <Link to={PATHS.FAVOURITES_PATH} className='mx-3'>
                  <CustomButton primary>
                    <i className='fas fa-star text-warning' />
                    My Favourites
                  </CustomButton>
                </Link>

                <Link to={PATHS.NOTIFICATIONS_PATH} className='mx-3'>
                  <CustomButton warning>
                    <i className='fas fa-clipboard' /> Notifications{' '}
                    <span className='text-danger'>5</span>
                  </CustomButton>
                </Link>

                <Link to={PATHS.BLOCKED_USERS_PATH} className='mx-3'>
                  <CustomButton danger>
                    <i className='fas fa-user-lock' /> Blocked Users
                  </CustomButton>
                </Link>

                <Link to={PATHS.EDIT_PROFILE_PATH} className='mx-3'>
                  <CustomButton primary>
                    <i className='fas fa-edit' /> Edit Profile
                  </CustomButton>
                </Link>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectUser,
  selectedUser: selectSelectedUser,
  notications: selectNotifications
});

export default connect(mapStateToProps)(UserCard);
